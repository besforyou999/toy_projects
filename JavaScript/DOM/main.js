// Storage (스토리지)

// 도메인 단위로 저장
// 5MB 제한
// 세션 혹은 영구 저장 가능

// sessionStorage: 브라우저 세션이 유지되는 동안에만 데이터 저장. 브라우저 닫으면 삭제됨
// localStorage: 따로 제거하지 않으면 영구적으로 데이터 저장

// .getItem(): 데이터 조회
// .setItem(): 데이터 추가
// .removeItem() : 데이터 제거
// .clear(): 스토리지 초기화

localStorage.setItem('a', 'Hello world!')
localStorage.setItem('b', JSON.stringify({x: 1, y: 2}))
localStorage.setItem('c', 123)

console.log(localStorage.getItem('a'))
console.log(JSON.parse(localStorage.getItem('b')))
console.log(localStorage.getItem('c'))

localStorage.removeItem('a')  // a 제거
localStorage.clear()          // 전부 제거