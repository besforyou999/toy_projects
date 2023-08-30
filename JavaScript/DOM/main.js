// 이벤트 위임 (Deligation)

// 단일 조상 요소에서 제어하는 이벤트 위임 패턴
// 이 방식을 통해 다수의 요소에 이벤트 핸들러를 등록할 필요없이
// 하나의 조상 요소에만 이벤트 핸들러를 등록하여 사용 가능
// -> 이벤트 핸들러가 조상 요소 하나에만 등록되어 관리가 편해짐

const parentEl = document.querySelector('.parent')
const childEls = document.querySelectorAll('.child')

// 모든 대상 요소에 이벤트 등록하는 방식
childEls.forEach(el => {
  el.addEventListener('click', event => {
    console.log(event.target.textContent);
  })
})

// 조상 요소에 이벤트 위임
parentEl.addEventListener('click', event => {
  const childEl = event.target.closest('.child')
  if (childEl) {
    console.log(childEl.textContent);
  }
})