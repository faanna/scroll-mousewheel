// 한번씩 스크롤을 내릴때마다 조금씩 내려가는게 아닌 한 섹션단위로 스크롤이 되게하는방법

const sections = document.querySelectorAll('section');
const section_arr = Array.from(sections);

const lis = document.querySelectorAll('ul li');
// 유사배열 : 사용하는 매서드가 한정적임
const lis_arr = Array.from(lis);
// 진짜배열 : array.from 으로 완전한 배열로 변경가능
let postionArray = null;

//postionArray에 각 섹션의 offsetTop의 값을 넣을것입니다
function setPosition() {
	postionArray = [];
	// 브라우저의 크기들이 달라도 원래 배열값으로 동일하게
	// 스크롤 반응이 될수있게 함수가 호출될때마다 원래배열값을
	// 가지려고 추가된 배열값을 삭제하기 위해 초기화 작업을 해야함
	for (let el of sections) {
		postionArray.push(el.offsetTop);
	}
}
setPosition();
console.log(postionArray); // [0, 1000, 2200, 3100]

window.addEventListener('scroll', () => {
	let scroll = window.scrollY || window.pageYOffset;

	sections.forEach((el, index) => {
		if (scroll >= postionArray[index]) {
			for (let el of sections) {
				el.classList.remove('on');
			}
			sections[index].classList.add('on');

			for (let el of lis) {
				el.classList.remove('on');
			}
			lis[index].classList.add('on');
		}
	});
});

window.addEventListener(
	'mousewheel',
	(e) => {
		e.preventDefault();

		let ul = document.querySelector('ul');
		let activeLi = ul.querySelector('li.on');
		let activeLi_index = lis_arr.indexOf(activeLi);

		let activeSection = document.querySelector('section.on');
		let activeSection_index = section_arr.indexOf(activeSection);

		if (e.deltaY < 0) {
			console.log('마우스 휠을 올렸습니다');
			if (activeLi_index == 0) return;
			window.scrollTo({
				top: postionArray[activeLi_index - 1],
				behavior: 'smooth',
			});
		} else {
			console.log('마우스 휠을 내렸습니다');
			if (activeLi_index == 3) return;
			window.scrollTo({
				top: postionArray[activeLi_index + 1],
				behavior: 'smooth',
			});
		}
	},
	{ passive: false }
);
lis.addEventListener('click', () => {});

lis.forEach((el, index) => {
	el.addEventListener('click', () => {
		window.scrollTo({ top: postionArray[index], behavior: 'smooth' });
	});
});
