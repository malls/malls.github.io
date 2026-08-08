// build.js — compiles the root index.html from site folders + sites.config.json + template.html.
// Zero dependencies (Node stdlib only). Deterministic: same inputs -> byte-identical output.
// Usage: node build.js   (cwd-independent; paths resolve against this file's directory)

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function fail(msg) {
	console.error('build.js: ' + msg);
	process.exit(1);
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function loadConfig() {
	const configPath = path.join(ROOT, 'sites.config.json');
	if (!fs.existsSync(configPath)) fail('sites.config.json not found');
	let config;
	try {
		config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
	} catch (e) {
		fail('sites.config.json is not valid JSON: ' + e.message);
	}
	if (typeof config.default !== 'string' || !config.default) fail('config: "default" (site name) is required');
	if (!config.buckets || typeof config.buckets !== 'object') fail('config: "buckets" object is required');
	if (!config.mobile || typeof config.mobile !== 'object') fail('config: "mobile" object is required');
	if (typeof config.mobile.portrait !== 'string' || !config.mobile.portrait) fail('config: "mobile.portrait" (site name) is required');
	if (typeof config.mobile.landscape !== 'string' || !config.mobile.landscape) fail('config: "mobile.landscape" (site name) is required');
	if (config.bucketSize === undefined) config.bucketSize = 100;
	if (!Number.isInteger(config.bucketSize) || config.bucketSize <= 0) fail('config: "bucketSize" must be a positive integer');
	for (const key of Object.keys(config.buckets)) {
		if (!/^(0|[1-9][0-9]*)$/.test(key)) fail('config: bucket key "' + key + '" is not a non-negative integer');
		if (Number(key) % config.bucketSize !== 0) fail('config: bucket key "' + key + '" is not a multiple of bucketSize (' + config.bucketSize + ')');
		if (typeof config.buckets[key] !== 'string' || !config.buckets[key]) fail('config: bucket "' + key + '" must map to a site name');
	}
	return config;
}

function siteList(config) {
	const names = new Set();
	names.add(config.default);
	names.add(config.mobile.portrait);
	names.add(config.mobile.landscape);
	for (const key of Object.keys(config.buckets)) names.add(config.buckets[key]);
	return Array.from(names).sort();
}

// ---------------------------------------------------------------------------
// CSS scoping transform
// ---------------------------------------------------------------------------

// Split CSS text into top-level statements: at-statements ending in ';' and
// blocks ending at the '}' that returns brace depth to zero.
function splitStatements(css) {
	const stmts = [];
	let depth = 0;
	let start = 0;
	for (let i = 0; i < css.length; i++) {
		const ch = css[i];
		if (ch === '{') {
			depth++;
		} else if (ch === '}') {
			depth--;
			if (depth < 0) fail('CSS parse error: unbalanced "}"');
			if (depth === 0) {
				stmts.push(css.slice(start, i + 1));
				start = i + 1;
			}
		} else if (ch === ';' && depth === 0) {
			stmts.push(css.slice(start, i + 1));
			start = i + 1;
		}
	}
	if (depth !== 0) fail('CSS parse error: unbalanced "{"');
	const rest = css.slice(start).trim();
	if (rest) stmts.push(rest);
	return stmts.map(s => s.trim()).filter(s => s.length > 0);
}

// Split a selector list on top-level commas (paren-depth aware).
function splitSelectors(list) {
	const parts = [];
	let depth = 0;
	let start = 0;
	for (let i = 0; i < list.length; i++) {
		const ch = list[i];
		if (ch === '(' || ch === '[') depth++;
		else if (ch === ')' || ch === ']') depth--;
		else if (ch === ',' && depth === 0) {
			parts.push(list.slice(start, i));
			start = i + 1;
		}
	}
	parts.push(list.slice(start));
	return parts.map(s => s.trim()).filter(s => s.length > 0);
}

function scopeSelector(sel, site) {
	const id = '#site-' + site;
	const m = sel.match(/^(html|body|:root)(?![\w-])/i);
	if (m) {
		const rest = sel.slice(m[0].length);
		if (rest === '') return id;
		if (/^[\s>+~]/.test(rest)) return id + rest;
	}
	return id + ' ' + sel;
}

function transformStatements(stmts, site, imports) {
	const out = [];
	for (const st of stmts) {
		if (/^@import\b/i.test(st)) {
			imports.push(st); // hoisted to the top of the site's <style> block
			continue;
		}
		if (/^@(media|supports)\b/i.test(st)) {
			const open = st.indexOf('{');
			if (open === -1) fail('CSS parse error in ' + site + '/style.css: at-rule without block: ' + st.slice(0, 60));
			const prelude = st.slice(0, open).trim();
			const inner = st.slice(open + 1, st.lastIndexOf('}'));
			const innerOut = transformStatements(splitStatements(inner), site, imports);
			out.push(prelude + ' {\n' + innerOut.join('\n') + '\n}');
			continue;
		}
		if (/^@(keyframes|font-face)\b/i.test(st)) {
			out.push(st); // convention: names are prefixed with the site name by the author
			continue;
		}
		if (st[0] === '@') {
			fail(site + '/style.css: unsupported at-rule (only @import/@media/@supports/@keyframes/@font-face allowed): ' + st.slice(0, 60));
		}
		const open = st.indexOf('{');
		if (open === -1) fail('CSS parse error in ' + site + '/style.css: statement without block: ' + st.slice(0, 60));
		const selectors = st.slice(0, open);
		const body = st.slice(open + 1, st.lastIndexOf('}'));
		const scoped = [];
		for (const sel of splitSelectors(selectors)) {
			const s = scopeSelector(sel, site);
			if (!scoped.includes(s)) scoped.push(s); // dedupe (html, body -> single #site-x)
		}
		out.push(scoped.join(', ') + ' {' + body + '}');
	}
	return out;
}

function transformCss(css, site) {
	if (css.includes('</style>')) fail(site + '/style.css contains a literal "</style>" — cannot inline');
	const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
	const imports = [];
	const rules = transformStatements(splitStatements(stripped), site, imports);
	return imports.concat(rules).join('\n');
}

// ---------------------------------------------------------------------------
// Visibility CSS (last <style> in head — exactly one site visible)
// ---------------------------------------------------------------------------

function generateVisibilityCss(config, sites) {
	const parts = [];

	// base: hide every compiled site, then show the default
	parts.push('/* generated visibility rules — exactly one site visible at any viewport */');
	parts.push(sites.map(s => '#site-' + s).join(', ') + ' { display: none; }');
	parts.push('#site-' + config.default + ' { display: block; }');

	// desktop buckets, ascending — only when the bucket site differs from default
	const keys = Object.keys(config.buckets).map(Number).sort((a, b) => a - b);
	for (const lower of keys) {
		const site = config.buckets[String(lower)];
		if (site === config.default) continue;
		const upper = lower + config.bucketSize;
		parts.push(
			'@media (' + lower + 'px <= width < ' + upper + 'px) {\n' +
			'\t#site-' + config.default + ' { display: none; }\n' +
			'\t#site-' + site + ' { display: block; }\n' +
			'}'
		);
	}

	// mobile — always emitted, last, so it beats any bucket at phone widths
	for (const orientation of ['portrait', 'landscape']) {
		const site = config.mobile[orientation];
		const hidden = sites.filter(s => s !== site).map(s => '#site-' + s);
		let block = '@media (hover: none) and (pointer: coarse) and (orientation: ' + orientation + ') {\n';
		if (hidden.length > 0) block += '\t' + hidden.join(', ') + ' { display: none; }\n';
		block += '\t#site-' + site + ' { display: block; }\n}';
		parts.push(block);
	}

	return parts.join('\n');
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function build() {
	const config = loadConfig();
	const sites = siteList(config);

	const siteDivs = [];
	const siteStyles = [];
	const siteScripts = [];
	const bootLines = [];

	for (const name of sites) {
		const dir = path.join(ROOT, name);
		const htmlPath = path.join(dir, 'index.html');
		const cssPath = path.join(dir, 'style.css');
		const jsPath = path.join(dir, 'script.js');

		if (!fs.existsSync(htmlPath)) fail('site "' + name + '": missing ' + name + '/index.html');
		if (!fs.existsSync(cssPath)) fail('site "' + name + '": missing ' + name + '/style.css');

		// HTML: inner body, scripts stripped (standalone boot scripts live there)
		const html = fs.readFileSync(htmlPath, 'utf8');
		const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
		if (!bodyMatch) fail('site "' + name + '": no <body>…</body> found in ' + name + '/index.html');
		const body = bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, '').trim();
		siteDivs.push('<div id="site-' + name + '" data-site="' + name + '">\n' + body + '\n</div>');

		// CSS: scoped
		const css = fs.readFileSync(cssPath, 'utf8');
		siteStyles.push('<style data-site="' + name + '">\n' + transformCss(css, name) + '\n</style>');

		// JS: verbatim, one tag per site
		if (fs.existsSync(jsPath)) {
			const js = fs.readFileSync(jsPath, 'utf8');
			if (js.includes('</script>')) fail(name + '/script.js contains a literal "</script>" — cannot inline');
			siteScripts.push('<script data-site="' + name + '">\n' + js.trim() + '\n</script>');
			bootLines.push("try { SITES['" + name + "'](document.getElementById('site-" + name + "')); } catch (e) { console.error('" + name + " init failed', e); }");
		}
	}

	const shellStyle =
		'<style>\n' +
		'html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; overscroll-behavior: none; }\n' +
		'body > [data-site] { display: none; height: 100%; position: relative; }\n' +
		'</style>';

	const visibilityStyle = '<style>\n' + generateVisibilityCss(config, sites) + '\n</style>';

	const scripts = siteScripts.slice();
	if (bootLines.length > 0) scripts.push('<script>\n' + bootLines.join('\n') + '\n</script>');

	const templatePath = path.join(ROOT, 'template.html');
	if (!fs.existsSync(templatePath)) fail('template.html not found');
	let out = fs.readFileSync(templatePath, 'utf8');
	for (const marker of ['<!-- BUILD:STYLES -->', '<!-- BUILD:SITES -->', '<!-- BUILD:SCRIPTS -->']) {
		if (!out.includes(marker)) fail('template.html: missing marker ' + marker);
	}
	// function replacements: site content may contain "$&"/"$'" etc., which are
	// special patterns when the replacement is a plain string
	const stylesOut = [shellStyle].concat(siteStyles, [visibilityStyle]).join('\n');
	out = out.replace('<!-- BUILD:STYLES -->', () => stylesOut);
	out = out.replace('<!-- BUILD:SITES -->', () => siteDivs.join('\n'));
	out = out.replace('<!-- BUILD:SCRIPTS -->', () => scripts.join('\n'));
	out = out.replace(
		/^<!DOCTYPE html>\r?\n/i,
		'<!DOCTYPE html>\n<!-- GENERATED by build.js — DO NOT EDIT. Edit site folders / sites.config.json / template.html, then run: node build.js -->\n'
	);

	fs.writeFileSync(path.join(ROOT, 'index.html'), out);
	console.log('build.js: wrote index.html (' + sites.length + ' site' + (sites.length === 1 ? '' : 's') + ': ' + sites.join(', ') + ')');
}

build();
