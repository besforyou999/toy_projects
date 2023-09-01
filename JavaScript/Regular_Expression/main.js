// 정규표현식 (RegExp, Regular Expression)

// - 문자 검색 (Search)
// - 문자 대체 (Replace)
// - 문자 추출 (Extract)

// 생성자
// new RegExp('표현', '옵션')
// new RegExp('[a-z]', 'gi')

// 리터럴
// /표현/옵션
// /[a-z]/gi

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

const regexp= new RegExp('the', 'gi');  // ['the', 'The', 'the']
console.log(str.match(regexp))

const regexpLiteral = /the/gi
console.log(str.match(regexpLiteral));

console.log(str.match(/the/gi))
