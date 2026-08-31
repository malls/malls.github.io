(window.SITES = window.SITES || {})['8bit'] = function (root) {
	var cabinet = root.querySelector('.cabinet');
	var stage = root.querySelector('.stage');
	if (!cabinet || !stage) return;

	var hero = root.querySelector('.hero');
	var critter = root.querySelector('.critter');
	var prompt = root.querySelector('.prompt');
	var coinEl = root.querySelector('.coins');

	// Collision maps, 16x11 each — keep in sync with the room markup in index.html.
	var MAPS = {
		1: [
			'################',
			'##G####T####E###',
			'#..............#',
			'#.%%..r....%%..#',
			'#..............X',
			'#~~~~~~B~~~~~~~#',
			'#~~~~~~B~~~~~~~#',
			'#......=....r..#',
			'#..%...=...%%..#',
			'#...%..=.......#',
			'################'
		],
		2: [
			'################',
			'##L####R####S###',
			'#..............#',
			'#.%%.....rrrrr.#',
			'X........rrCrr.#',
			'#..%.......=...#',
			'#....~~~~......#',
			'#....~~~~..%%..#',
			'#..r.......%...#',
			'#..............#',
			'################'
		],
		3: [
			'################',
			'################',
			'#..............#',
			'#...f..O..f....#',
			'#..............#',
			'#..nnnnnnnnnn..#',
			'#..nnnnnnnnnn..#',
			'#..nnnnnnnnnn..#',
			'#..nnnnnnnnnn..#',
			'#..............#',
			'########D#######'
		]
	};
	var level = 1, MAP = MAPS[level];
	var EXITS = {
		'1:15,4': { level: 2, x: 1, y: 4, face: 'right', label: '> GO EAST' },
		'2:0,4': { level: 1, x: 14, y: 4, face: 'left', label: '< GO WEST' },
		'3:8,10': { level: 2, x: 11, y: 5, face: 'down', label: 'v LEAVE CAVE' }
	};
	var CAVE_DEST = { level: 3, x: 8, y: 9, face: 'up' };
	var WALK = '.=B';
	var DOORS = { G: 'GITHUB', T: 'TWITTER', E: 'EMAIL', L: 'LINKEDIN', R: 'RANDOM', S: 'SOFTWARE' };
	var DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
	var KEY = {
		ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
		w: 'up', s: 'down', a: 'left', d: 'right'
	};

	var doors = {};
	var doorEls = root.querySelectorAll('.door');
	for (var i = 0; i < doorEls.length; i++) doors[doorEls[i].getAttribute('data-door')] = doorEls[i];
	var cave = root.querySelector('.cave');

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
		if (cave) cave.classList.toggle('lit', t === 'C');
		if (letter) { setPrompt('^ ENTER ' + DOORS[letter], true); return; }
		if (t === 'C') { setPrompt('^ ENTER CAVE', true); return; }
		var near = [[px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]];
		for (var n = 0; n < near.length; n++) {
			var ex = EXITS[level + ':' + near[n][0] + ',' + near[n][1]];
			if (ex) { setPrompt(ex.label, true); return; }
		}
		if (focused) setPrompt('ARROWS MOVE - UP ENTERS', false);
		else setPrompt('PRESS START - CLICK OR TAB', true);
	}

	function warp(dest) {
		level = dest.level;
		MAP = MAPS[level];
		stage.setAttribute('data-level', String(level));
		px = dest.x; py = dest.y;
		hero.setAttribute('data-face', dest.face);
		hero.setAttribute('data-frame', 0);
		setPos(hero, px * 16, py * 16);
		moving = false;
		entering = false;
		threshold();
	}

	function move(dir) {
		if (entering || moving) return;
		hero.setAttribute('data-face', dir);
		var d = DIRS[dir], tx = px + d[0], ty = py + d[1];
		var t = MAP[ty] ? MAP[ty].charAt(tx) : '';
		if (DOORS[t] && dir === 'up') { enter(t); return; }
		if (t === 'C' && dir === 'up') { caveEnter(); return; }
		var exit = EXITS[level + ':' + tx + ',' + ty];
		if (exit) {
			// step onto the gap tile, then swap rooms; held keys keep walking
			moving = true;
			parity = parity ? 0 : 1;
			hero.setAttribute('data-frame', parity);
			px = tx; py = ty;
			setPos(hero, px * 16 - d[0] * 8, py * 16 - d[1] * 8);
			setTimeout(function () { warp(exit); }, reduced ? 0 : 64);
			return;
		}
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

	function caveEnter() {
		entering = true;
		held.length = 0;
		hero.setAttribute('data-face', 'up');
		hero.setAttribute('data-frame', 1);
		setPos(hero, px * 16, py * 16 - 8);
		setTimeout(function () { warp(CAVE_DEST); }, reduced ? 0 : 200);
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

	// the critter wanders a short fixed loop on level 1; decorative, never blocks, never harms
	var cx = 11, cy = 9, cdir = 1, cframe = 0;
	if (critter && !reduced) {
		setInterval(function () {
			if (level !== 1) return;
			var nx = cx + cdir;
			if (nx < 9 || nx > 13 || WALK.indexOf(MAPS[1][cy].charAt(nx)) < 0 || (nx === px && cy === py)) cdir = -cdir;
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
