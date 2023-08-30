// Keyboard Events

const inputEl = document.querySelector('input');

inputEl.addEventListener('keydown', event => {
  if (event.key == 'Enter') {
    console.log(event.target.value);
  }
})

// 한글을 입력할 경우 브라우저 처리 과정이 필요하여 콘솔에 입력한 한글이 두 번 출력된다.
// 이를 방지하기 위해서 isComposing 속성 사용 가능

inputEl.addEventListener('keydown', event => {
  if (event.key == 'Enter' && !event.isComposing) {
    console.log(event.target.value);
  }
})