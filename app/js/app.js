// import $ from 'jquery'; window.jQuery = $; window.$ = $ // import jQuery module (npm i -D jquery)

// require('~/app/libs/mmenu/js/jquery.mmenu.all.min.js') // import vendor jQuery plugin example (not module)

document.addEventListener('DOMContentLoaded', () => {

	//Slider

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

	// Tabs

	const content = [...document.querySelectorAll('.pick__block')]; //контент
	const tabItems = [...document.querySelectorAll('.pick__tabs-tab')]; // навигация табов
	const navigation = document.querySelector('.pick__tabs');

	function toogleTab(index) {
		content.forEach((tab) => {
			tab.classList.add('hide')
			tab.classList.remove('active-tab')
		}) //скрываем все элементы
		content[index].classList.remove('hide') //убираем класс каторый скрывает блок у элемента под номером index
		content[index].classList.add('active-tab')

		tabItems.forEach((item) => {
			item.classList.remove('active-tab-item')
		})

		tabItems[index].classList.add('active-tab-item')
	}
	toogleTab(0)

	navigation.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('pick__tabs-tab')) {
			toogleTab(Number(e.target.dataset.index))
		}
	})

	document.getElementById("trigger").onclick = function () {
		open()
	};

	function open() {
		document.getElementById("menu").classList.toggle("showMenu");
	}

	//Timer

	const deadline = '2021-11-30 19:00';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor((t / (1000 * 60 * 60 * 24))),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60) % 24));

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {

		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds');


		const updateClock = () => {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
		const timeInterval = setInterval(updateClock, 1000);
		updateClock();
	}
	setClock('.timer', deadline);
})