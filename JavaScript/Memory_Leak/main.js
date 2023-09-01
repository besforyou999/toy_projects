// 메모리 누수 (Memory Leak)

// 더 이상 필요하지 않은 데이터가 해제되지 못하고 메모리를 계속 차지하는 현상

// 1. 불필요한 전역 변수 사용
// window 객체는 계속 사용되기 때문에 아래 데이터는 해제되지 않음

window.hello = 'Hello world!'
window.heropy = {name: 'Heropy', age: 85}

// 2. 분리된 노드 참조
// parent 요소는 제거했으나 메모리상에 데이터는 남아있어 
// 버튼을 클릭하면 parent가 콘솔에 출력되는 걸 볼 수 있다.

const btn = document.querySelector('button');
const parent = document.querySelector('.parent')

btn.addEventListener('click', () => {
  console.log(parent);
  parent.remove();
})

// 3. 해제하지 않은 타이머

let a = 0
setInterval(() => {
  a += 1
}, 100)

setTimeout(() => {
  console.log(a)
}, 1000)

// 해결책
const intervalId = setInterval(()=> {
  a += 1
}, 100)

setTimeout(() => {
  console.log(a)
  clearInterval(intervalId)
}, 1000)

// 4. 잘못된 클로저 사용
// 아래 코드에서 변수 a는 필요없으나 클로저 사용으로
// 계속 메모리를 차지하고 있음

const getFn = () => {
  let a = 0
  return name => {
    a += 1
    console.log(a)
    return `Hello ${name}~`
  }
}

const fn = getFn()
console.log(fn('Heropy'))
console.log(fn('Neo'))
console.log(fn('Lewis'))