
window.onload = function() {

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

		return `<div class="vertical-center">${tpl}</div>`;
	}

	function switchColors() {
		Array.from(document.querySelectorAll('.random-color')).forEach(element => {
			element.style.color = randomColor();
		});

		Array.from(document.querySelectorAll('.random-background')).forEach(element => {
			element.style.backgroundColor = randomColor();
		});
	}

	window.onclick = init;
	window.ontouchend = init;
	document
		.querySelectorAll('section')[3]
		.addEventListener('click', () => window.open(`mailto:_@forrestalmasi.com`, `_self`));

	function init() {
		document.querySelectorAll('section')[0].innerHTML = template('Forrest Almasi');
		document.querySelectorAll('section')[1].innerHTML = template('i\'m a developer'); 
		document.querySelectorAll('section')[2].innerHTML = template('what\'s up?');
		document.querySelectorAll('section')[3].innerHTML = template('email me');

		switchColors();

		Array
			.from(document.querySelectorAll('.animated-letter'))
			.forEach(letter => letter.addEventListener('mouseover', event => {
				event.target.style.color = randomColor();
				event.target.style.filter = filterValue();
			}));
		Array
			.from(document.querySelectorAll('.random-background'))
			.forEach(letter => letter.addEventListener('mouseleave', event => {
				if (event.target.className.includes('random-background')) {
					event.target.style.backgroundColor = randomColor();
				}
			}));
	}

	init();

};