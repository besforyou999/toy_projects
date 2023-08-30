const formEl = document.querySelector('form');
const inputEls = document.querySelectorAll('input');

inputEls.forEach(el => {
  el.addEventListener('focus', () => {  // input을 클릭하면 focus가 되어 active 클래스가 붙음
    formEl.classList.add('active')
  })
  el.addEventListener('blur', () => {   // input focus가 사라지는 걸 blur라고 표현
    formEl.classList.remove('active')
  })
  el.addEventListener('input', () => {
    console.log(event.target.value)
  })
})

formEl.addEventListener('submit', event => {
  event.preventDefault(); // form 요소에서 submit 이벤트가 발생하면 디폴트로 페이지가 새로고침됨. 이를 명시적으로 막을 수 있다.
  const data = {
    id: event.target[0].value,
    pw: event.target[1].value
  }
  console.log('제출!', data);
})

formEl.addEventListener('reset', event => {
  console.log('리셋!')
})