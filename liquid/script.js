// liquid — the pointer bloom.
//
// The field carries a radial highlight positioned at --mx / --my. Both default to a
// composed position in CSS, so the page is complete without a pointer at all.
//
// Contract: listeners attach only to elements inside `root` (never document/window) —
// every site's script runs in the combined page even while its site is hidden. `root` is
// the document standalone and the site wrapper in the build, so it is never used as the
// target of style writes.
(window.SITES = window.SITES || {})['liquid'] = function (root) {
	var field = root.querySelector('.field');
	var scroll = root.querySelector('.scroll');
	if (!field || !scroll) return;

	// Coarse pointers get the default position — a highlight that snaps to wherever the
	// last tap landed reads as a bug, not as light.
	if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;

	var pending = false;
	var x = 0;
	var y = 0;

	function paint() {
		pending = false;
		var box = field.getBoundingClientRect();
		if (!box.width || !box.height) return;
		field.style.setProperty('--mx', ((x - box.left) / box.width * 100).toFixed(2) + '%');
		field.style.setProperty('--my', ((y - box.top) / box.height * 100).toFixed(2) + '%');
	}

	// Repainting a viewport-sized gradient stack is not free — coalesce to one per frame.
	scroll.addEventListener('pointermove', function (e) {
		x = e.clientX;
		y = e.clientY;
		if (pending) return;
		pending = true;
		requestAnimationFrame(paint);
	});
};
