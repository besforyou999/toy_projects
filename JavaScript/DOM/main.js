// document.getElementById()

// HTML id 속성 값으로 검색한 요소 반환
// 여러 요소가 검색되면, 가장 먼저 찾은 요소만 반환
// 검색 결과가 없으면, 'null'을 반환
const el = document.getElementById('child123');
console.log(el);



// document.querySelectorAll()

// 'CSS 선택자'로 검색한 모든 요소를 `NodeList`로 반환
// `NodeList` 객체는 `.forEach()`를 사용할 수 있습니다.

const nodeList = document.querySelectorAll('.child');
console.log(nodeList);
nodeList.forEach(el => console.log(el.textContent));
