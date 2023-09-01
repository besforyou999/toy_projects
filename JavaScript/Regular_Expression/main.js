// 정규표현식 (RegExp, Regular Expression)

// g - 모든 문자 일치 (Global)
// i - 영어 대소문자를 구분 않고 일치 (Ignore case)
// m - 여러 줄 일치 (Multi line), 각각의 줄을 시작과 끝으로 인식!

const str = `
010-3127-7629
thesecond@gmail.com
Hello world!
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazy dog.
hello@naver.com
http://localhost:1234
동해물과 백두산이 마르고 닳도록
abbcccddddeeeee
`

console.log(str.match(/the/))
console.log(str.match(/the/g))
console.log(str.match(/the/gi))
console.log(str.match(/\.$/gi))
console.log(str.match(/\.$/gim))
