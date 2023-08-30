const child1 = document.querySelector('.child:nth-child(1)')
const child2 = document.querySelector('.child:nth-child(2)')

// 커스텀 이벤트 
child1.addEventListener('hello-world', event => {
  console.log('커스텀 이벤트 발생!');
  console.log(event.detail);
})

child2.addEventListener('click', () => {
  child1.dispatchEvent(new CustomEvent('hello-world', {
    detail: 123
  }))
})