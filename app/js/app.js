// import $ from 'jquery'; window.jQuery = $; window.$ = $ // import jQuery module (npm i -D jquery)

// require('~/app/libs/mmenu/js/jquery.mmenu.all.min.js') // import vendor jQuery plugin example (not module)

document.addEventListener('DOMContentLoaded', () => {

	const images = [...document.querySelectorAll('.pick__block-left-img')];
	const left = document.querySelector('#left');
	const right = document.querySelector('#right');
	const number = document.querySelector('#number');

	let el = 0;
	function firstRender(params) {
		images.forEach((el, i) => {
			if (i === 0) {
				el.classList.add('active')
			}
		})
		number.textContent = el + 1
	}
	firstRender();

	function changeSlide() {
		
		images.forEach((el) => {
			el.classList.remove('active')
		})
		images[el].classList.add('active')
		number.textContent = el + 1
	}

	left.addEventListener('click', (event) => {
		if (!event.isTrusted) return; //for webpack
		console.log('left', el);
		if (el === 0) {
			el = images.length - 1
		} else {
			el = el - 1
		}
		changeSlide()
	})

	right.addEventListener('click', (event) => {
		if (!event.isTrusted) return; //for webpack
		console.log('right', el);
		if (el === images.length - 1) el = 0
		else el = el + 1
		changeSlide()
	})

	const btnalert = document.querySelector('.banner__slider-btn');
	console.log('btnalert', btnalert);

	btnalert.onclick = function() {
		if (!event.isTrusted) return;
		alert('You have no money');
	  };



})
