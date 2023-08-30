// Cookie (쿠키)

// 도메인 단위로 저장
// 표준안 기준, 사이트당 최대 20개 및 4KB 제한
// 영구 저장 불가능

// domain : 유효 도메인 설정
// path: 유효 경로 설정
// expires: 만료 날짜 (UTC Date) 설정
// max-age: 만료 타이머(s) 설정

document.cookie = `a=1; max-age=${60 * 60 * 24 * 3}`
document.cookie = `b=2; expires=${new Date(2022, 11, 16).toUTCString()}`

console.log(document.cookie); 

