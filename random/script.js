(window.SITES = window.SITES || {}).random = function (root) {

	function randomNumberToMax(max = 256) {
		return Math.floor(Math.random() * max);
	}

	function randomColor() {
		return `rgb(${[randomNumberToMax(), randomNumberToMax(), randomNumberToMax()].join(',')})`;
	}

	function filterValue() {
		return `drop-shadow(.11em .1em 0px ${randomColor()})`;
	}

	function template(str) {

		let tpl = str
					.split('')
					.map(letter => `<div class="animated-letter random-color" style="filter:${filterValue()};">${letter}</div>`)
					.join('')
					.replace(/\\n/g, '');

		return tpl;
	}

	function switchColors() {
		Array.from(root.querySelectorAll('.random-color')).forEach(element => {
			element.style.color = randomColor();
		});

		Array.from(root.querySelectorAll('.random-background')).forEach(element => {
			element.style.backgroundColor = randomColor();
		});
	}

	root
		.querySelectorAll('section')[3]
		.addEventListener('click', () => window.open(`mailto:_@forrestalmasi.com`, `_self`));

	function init() {
<<<<<<< HEAD:script.js
		document.querySelectorAll('section')[0].innerHTML = template('FORREST ') + '<br class="mobile-only">'  + template('ALMASI');
		document.querySelectorAll('section')[1].innerHTML = template('I\'M A ') + '<br class="mobile-only">'  + template('DEVELOPER'); 
		document.querySelectorAll('section')[2].innerHTML = template('WHAT\'S UP?');
		document.querySelectorAll('section')[3].innerHTML = template('EMAIL ME');
=======
		root.querySelectorAll('section')[0].innerHTML = template('Forrest ') + '<br class="mobile-only">'  + template('Almasi');
		root.querySelectorAll('section')[1].innerHTML = template('i\'m a ') + '<br class="mobile-only">'  + template('developer');
		root.querySelectorAll('section')[2].innerHTML = template('what\'s up?');
		root.querySelectorAll('section')[3].innerHTML = template('email me');
>>>>>>> liquid:random/script.js

		switchColors();

		const letters = Array.from(root.querySelectorAll('.animated-letter'));

		letters.forEach(letter => {
				letter.addEventListener('mouseover', event => {
					event.target.style.color = randomColor();
					event.target.style.filter = filterValue();
				});
				letter.addEventListener('touchstart', event => {
					event.target.style.color = randomColor();
					event.target.style.filter = filterValue();
				});
		});

		const backgrounds = Array.from(root.querySelectorAll('.random-background'));
		backgrounds.forEach(box => {
			box.addEventListener('mouseleave', event => {
				if (event.target.className.includes('random-background')) {
					event.target.style.backgroundColor = randomColor();
				}
			});
			box.addEventListener('touchend', event => {
				if (event.target.className.includes('random-background')) {
					event.target.style.backgroundColor = randomColor();
				}
			});

		});
	}

	init();

};
