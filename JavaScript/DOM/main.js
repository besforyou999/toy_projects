// console
// .log(), .warn(), .error(), .dir()

// 콘솔에 메시지나 객체를 출력합니다.

// - log : 일반 메시지
// - warn : 경고 메시지
// - error : 에러 메시지
// - dir : 속성을 불 수 있는 객체를 출력

console.log(document.body);
console.warn(document.body);
console.error(document.body);
console.dir(document.body);

// .count(), .countReset()
console.count('a')  // a: 1
console.count('a')  // a: 2
console.count('b')  // b: 1
console.count('a')  // a: 3
console.log('Reset a!') // Reset a!
console.countReset('a')
console.count('a')  // a: 1
console.count('b')  // b: 2


// .time(), .timeEnd()
// 콘솔에 타이머가 시작해서 종료되기까지의 시간(ms)을 출력합니다.

// console.time('이름')
// console.timeEnd('이름')

console.time('반복문')

for (let i = 0 ; i < 10000 ; i += 1) {
  console.log(i);
}

console.timeEnd('반복문');


// .trace()

// 메소드 호출 스택(Call Stack)을 추적해 출력합니다.

function a() {
  function b() {
    function c() {
      console.log('Log');
      console.trace('Trace!')
    }
    c();
  }
  b();
}
a();


// .clear()

// 콘솔에 기록된 메시지를 모두 삭제
console.log(1)
console.log(2)
console.log(3)
console.clear();


// 서식 문자 치환

// %s - 문자로 적용
// %o - 객체로 적용
// %c - CSS로 적용

const a = 'The brown fox';
const b = 3
const c = {
  f: 'fox',
  d: 'dog'
}

console.log('%s jumps over the lazy dog %s times.', a, b)
console.log('%o is object!', c)
console.log(
  '%cThe brown fox %cjumped over %cthe lazy dog.',
  'color: brown, font-family: serif; font-size: 20px;',
  '',
  'font-size: 18px; color: #FFF; background-color: green; border-radius: 4px;'
)