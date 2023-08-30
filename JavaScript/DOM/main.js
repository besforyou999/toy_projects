// 핸들러 한 번만 실행

const parentEl = document.querySelector('.parent')

parentEl.addEventListener('click', event => {
  console.log('Parent!')
}, {
  once: true
})

// 기본 동작과 핸들러 실행 분리

// 핸들러의 실행이 많은 PC 자원을 소모해 기본 동작이 버벅일 수 있음
// passive: true 옵션을 통해 기본 동작과 핸들러 실행을 분리해 위 문제를 해결 가능
parentEl.addEventListener('wheel', event => {
  for (let i = 0 ; i < 10000; i += 1) {
    console.log(i)
  }
}, {
  passive: true
})