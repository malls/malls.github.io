// horse — the flipbook thumb.
//
// Navigation, URLs and captions are pure CSS (:target); this file adds exactly one
// behavior: dragging the photograph scrubs the frames, and a flick lets the gallop
// coast to a stop. When playback settles, the landing frame is committed by clicking
// that frame's existing anchor — no location handling anywhere.
//
// Contract: listeners attach only to elements inside `root` (never document/window) —
// every site's script runs in the combined page even while its site is hidden. `root`
// is the document standalone and the site wrapper in the build, so it is never used
// as the target of style writes.
(window.SITES = window.SITES || {})['horse'] = function (root) {
	var stage = root.querySelector('.stage');
	if (!stage) return;
	var playback = stage.querySelector('.playback');
	var playPhoto = playback ? playback.querySelector('.photo') : null;
	var frames = stage.querySelectorAll('.frame');
	var n = frames.length;
	if (!playback || !playPhoto || n < 2) return;

	var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

	var PX_PER_FRAME = 26;   // finger travel per frame step
	var TAP_SLOP = 10;       // movement below this is a tap; beyond it, a scrub
	var MIN_FLICK = 0.004;   // frames per ms; slower releases settle immediately
	var FRICTION = 260;      // ms time-constant of the momentum deceleration
	var STALE_MS = 90;       // a finger resting this long before release has no velocity

	var down = false;        // a pointer is down on the stage
	var scrubbing = false;   // the gesture crossed TAP_SLOP and owns the playback layer
	var moved = false;       // suppresses the click that would end a scrub
	var pointerId = null;
	var startX = 0;
	var startPos = 1;        // frame position (1-based float) at gesture start
	var pos = 1;             // current frame position (float)
	var lastX = 0;
	var lastT = 0;
	var velocity = 0;        // frames per ms; positive runs the horse forward
	var coastId = 0;         // requestAnimationFrame handle while coasting

	function pad(i) { return (i < 10 ? '0' : '') + i; }

	function wrap(p) { return ((Math.round(p) - 1) % n + n) % n + 1; }

	function currentIndex() {
		var t = stage.querySelector('.frame:target');
		for (var k = 0; k < n; k++) {
			if (frames[k] === t) return k + 1;
		}
		return 1;
	}

	function show(i) {
		playPhoto.style.backgroundPositionX = ((i - 1) / (n - 1) * 100) + '%';
	}

	function commit(i) {
		// this click is ours — clear the scrub flag so the tap suppressor lets it through
		moved = false;
		var a = root.querySelector('a[href="#horse-f' + pad(i) + '"]');
		if (a) a.click();
		playback.style.visibility = 'hidden';
		scrubbing = false;
	}

	stage.addEventListener('pointerdown', function (e) {
		if (down) return;
		down = true;
		pointerId = e.pointerId;
		startX = lastX = e.clientX;
		lastT = e.timeStamp;
		velocity = 0;
		moved = false;
		if (coastId) {
			// the hand catches a coasting gallop mid-flight and resumes the scrub
			cancelAnimationFrame(coastId);
			coastId = 0;
			startPos = pos;
			scrubbing = true;
			moved = true;
		} else {
			startPos = pos = currentIndex();
		}
	});

	stage.addEventListener('pointermove', function (e) {
		if (!down || e.pointerId !== pointerId) return;
		var dx = e.clientX - startX;
		if (!scrubbing) {
			if (Math.abs(dx) <= TAP_SLOP) return;
			scrubbing = true;
			moved = true;
			if (stage.setPointerCapture) {
				try { stage.setPointerCapture(pointerId); } catch (err) {}
			}
			show(wrap(startPos));
			playback.style.visibility = 'visible';
		}
		// swipe left runs the horse forward, right runs it backward
		pos = startPos - dx / PX_PER_FRAME;
		var dt = e.timeStamp - lastT;
		if (dt > 0) {
			velocity = (lastX - e.clientX) / PX_PER_FRAME / dt;
			lastX = e.clientX;
			lastT = e.timeStamp;
		}
		show(wrap(pos));
	});

	function release(e) {
		if (!down || e.pointerId !== pointerId) return;
		down = false;
		pointerId = null;
		if (!scrubbing) return; // a tap: the anchor's own click navigates
		if (e.timeStamp - lastT > STALE_MS) velocity = 0;
		if (reduced || e.type === 'pointercancel' || Math.abs(velocity) < MIN_FLICK) {
			commit(wrap(pos));
			return;
		}
		var prev = 0;
		coastId = requestAnimationFrame(function step(t) {
			if (!prev) prev = t;
			var dt = t - prev;
			prev = t;
			pos += velocity * dt;
			velocity *= Math.exp(-dt / FRICTION);
			show(wrap(pos));
			if (Math.abs(velocity) < 0.0008) {
				coastId = 0;
				commit(wrap(pos));
				return;
			}
			coastId = requestAnimationFrame(step);
		});
	}

	stage.addEventListener('pointerup', release);
	stage.addEventListener('pointercancel', release);

	// a scrub must not fall through as a tap on the anchor underneath
	stage.addEventListener('click', function (e) {
		if (!moved) return;
		e.preventDefault();
		e.stopPropagation();
		moved = false;
	});
};
