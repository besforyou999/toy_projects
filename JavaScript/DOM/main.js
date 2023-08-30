// 이벤트 캡쳐링

const parentEl = document.querySelector('.parent');
const childEl = document.querySelector('.child');
const anchorEl = document.querySelector('a');

window.addEventListener('click', event => {
  console.log('Window!');
})
document.addEventListener('click', event => {
  console.log('Body!');
}, { capture: true })
parentEl.addEventListener('click', event => {
  console.log('Parent!');
}, { capture: true })
childEl.addEventListener('click', event => {
  console.log('Child!');
})
anchorEl.addEventListener('click', event => {
  console.log('Anchor!');
})

// 링크 클릭해보면 Body! > Parent! > Child! > Window! 순으로 출력된다.
// 이벤트가 루트에서 a 태그까지 내려가면서 document, parent 요소 순으로 캡쳐링되고
// 이벤트가 a 태그에 다다르면 다시 루트 요소 방향으로 전파되면서 이벤트 핸들러가 실행되게 되는데
// document, parent 요소에서는 이미 이벤트 캡쳐링 되었으므로 핸들러 실행없이 이벤트만 위로 전파됨.