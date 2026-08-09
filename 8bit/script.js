(window.SITES = window.SITES || {})['8bit'] = function (root) {
	var cabinet = root.querySelector('.cabinet');
	var stage = root.querySelector('.stage');
	if (!cabinet || !stage) return;

	var hero = root.querySelector('.hero');
	var critter = root.querySelector('.critter');
	var prompt = root.querySelector('.prompt');
	var coinEl = root.querySelector('.coins');

	// Collision map, 16x11 — keep in sync with the room markup in index.html.
	var MAP = [
		'################',
		'##G####T####E###',
		'#..............#',
		'#.%%..r....%%..#',
		'#..............#',
		'#~~~~~~B~~~~~~~#',
		'#~~~~~~B~~~~~~~#',
		'#......=....r..#',
		'#..%...=...%%..#',
		'#...%..=.......#',
		'################'
	];
	var WALK = '.=B';
	var DOORS = { G: 'GITHUB', T: 'TWITTER', E: 'EMAIL' };
	var DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
	var KEY = {
		ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
		w: 'up', s: 'down', a: 'left', d: 'right'
	};

	var doors = {};
	var doorEls = root.querySelectorAll('.door');
	for (var i = 0; i < doorEls.length; i++) doors[doorEls[i].getAttribute('data-door')] = doorEls[i];

	var reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

	var px = 8, py = 9, parity = 0, moving = false, entering = false, focused = false;
	var held = [], timer = null;
	var coins = 0, coinTimer = null;

	function setPos(el, x, y) {
		el.style.left = 'calc(var(--px) * ' + x + ')';
		el.style.top = 'calc(var(--px) * ' + y + ')';
	}

	function setPrompt(text, blink) {
		prompt.textContent = text;
		prompt.classList.toggle('blink', blink);
	}

	function threshold() {
		var t = py > 0 ? MAP[py - 1].charAt(px) : '';
		var letter = DOORS[t] ? t : null;
		for (var k in doors) doors[k].classList.toggle('lit', k === letter);
		if (letter) setPrompt('^ ENTER ' + DOORS[letter], true);
		else if (focused) setPrompt('ARROWS MOVE - UP ENTERS', false);
		else setPrompt('PRESS START - CLICK OR TAB', true);
	}

	function move(dir) {
		if (entering || moving) return;
		hero.setAttribute('data-face', dir);
		var d = DIRS[dir], tx = px + d[0], ty = py + d[1];
		var t = MAP[ty] ? MAP[ty].charAt(tx) : '';
		if (DOORS[t] && dir === 'up') { enter(t); return; }
		if (WALK.indexOf(t) < 0) return; // tap to turn
		moving = true;
		parity = parity ? 0 : 1;
		hero.setAttribute('data-frame', parity);
		px = tx; py = ty;
		setPos(hero, px * 16 - d[0] * 8, py * 16 - d[1] * 8);
		setTimeout(function () {
			setPos(hero, px * 16, py * 16);
			moving = false;
			threshold();
		}, reduced ? 0 : 64);
	}

	function enter(letter) {
		entering = true;
		held.length = 0;
		hero.setAttribute('data-face', 'up');
		hero.setAttribute('data-frame', 1);
		setPos(hero, px * 16, py * 16 - 8);
		setTimeout(function () { doors[letter].click(); }, reduced ? 0 : 200);
		setTimeout(function () {
			setPos(hero, px * 16, py * 16);
			hero.setAttribute('data-frame', 0);
			entering = false;
		}, 700);
	}

	function tick() {
		if (!held.length || entering) { timer = null; return; }
		move(held[held.length - 1]);
		timer = setTimeout(tick, 150);
	}

	function press(dir) {
		if (held.indexOf(dir) < 0) held.push(dir);
		if (!timer) tick();
	}

	function release(dir) {
		var at = held.indexOf(dir);
		if (at >= 0) held.splice(at, 1);
	}

	stage.addEventListener('keydown', function (e) {
		var dir = KEY[e.key] || KEY[String(e.key).toLowerCase()];
		if (!dir) return;
		e.preventDefault();
		press(dir);
	});

	stage.addEventListener('keyup', function (e) {
		var dir = KEY[e.key] || KEY[String(e.key).toLowerCase()];
		if (dir) release(dir);
	});

	stage.addEventListener('focus', function () {
		focused = true;
		threshold();
		if (!coinTimer) coinTimer = setInterval(function () {
			coins = (coins + 1) % 10000;
			coinEl.textContent = String('000' + coins).slice(-4);
		}, 1000);
	});

	stage.addEventListener('blur', function () {
		focused = false;
		held.length = 0;
		threshold();
		if (coinTimer) { clearInterval(coinTimer); coinTimer = null; }
	});

	// d-pad: same step function, pointer-held repeat
	var pads = root.querySelectorAll('.dpad button');
	for (var p = 0; p < pads.length; p++) {
		(function (btn) {
			var dir = btn.getAttribute('data-dir');
			btn.addEventListener('pointerdown', function (e) {
				e.preventDefault();
				stage.focus({ preventScroll: true });
				press(dir);
			});
			btn.addEventListener('pointerup', function () { release(dir); });
			btn.addEventListener('pointercancel', function () { release(dir); });
			btn.addEventListener('pointerleave', function () { release(dir); });
		})(pads[p]);
	}

	// the critter wanders a short fixed loop; decorative, never blocks, never harms
	var cx = 11, cy = 9, cdir = 1, cframe = 0;
	if (critter && !reduced) {
		setInterval(function () {
			var nx = cx + cdir;
			if (nx < 9 || nx > 13 || WALK.indexOf(MAP[cy].charAt(nx)) < 0 || (nx === px && cy === py)) cdir = -cdir;
			else cx = nx;
			cframe = cframe ? 0 : 1;
			critter.setAttribute('data-frame', cframe);
			setPos(critter, cx * 16, cy * 16);
		}, 480);
	}

	// integer scale: --px = floor(min(w/256, h/224)), never below 1
	if (typeof ResizeObserver !== 'undefined') {
		new ResizeObserver(function (entries) {
			var r = entries[0].contentRect;
			var s = Math.max(1, Math.floor(Math.min(r.width / 256, r.height / 224)));
			cabinet.style.setProperty('--px', s + 'px');
		}).observe(cabinet);
	}
};
