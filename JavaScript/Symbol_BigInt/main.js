// BigInt

// BigInt는 길이 제한이 없는 정수(integer)입니다.
// 숫자(number) 데이터가 안정적으로 표시할 수 있는,
// 최대치(2^53 - 1)보다 큰 정수를 표현할 수 있습니다.
// 정수 뒤에 `n`을 붙이거나 `BigInt()`를 호출해 생성합니다.

const a = 11n
const b = 22

// 숫자 => BigInt
console.log(a + BigInt(b))
console.log(typeof (a + BigInt(b)))

// BigInt => 숫자
console.log(Number(a) + b)
console.log(typeof (Number(a) + b))