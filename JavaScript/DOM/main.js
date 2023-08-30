// addEventListener()


const parentEl = document.querySelector('.parent');
const childEl = document.querySelector('.child');

parentEl.addEventListener('click', () => {
  console.log('Parent!');
})

childEl.addEventListener('click', () => {
  console.log('Child!');
})

// childEl를 클릭하면 'Child!', 'Parent!' 둘 다 출력된다.
// parentEl를 클릭하면 'Parent!'만 출력된다.


