// shibuya — the breaker flips and the street lights strike on in staggered order.
//
// The page is complete without JS: every sign is lit by default, and `.lit` only
// replays the strike-on (an animation with `backwards` fill and a per-sign delay).
//
// Contract: queries via `root` only; no listeners outside `root`; no style writes to
// `root` itself — standalone it is the document, and Document has no `.style`.
(window.SITES = window.SITES || {})['shibuya'] = function (root) {
	var signs = root.querySelectorAll('.pow');
	if (!signs.length) return;

	// Reduced motion: the street is already steady-lit — leave it that way.
	if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	signs.forEach(function (s, i) {
		// Unequal stagger — neighbouring breakers tripping, not a chase sequence.
		s.style.animationDelay = (i * 137 % 1100) + 'ms';
		s.classList.add('lit');
	});
};
