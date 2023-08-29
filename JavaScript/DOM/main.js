// Node vs Element

// 노드 (Node): HTML 요소, 텍스트, 주석 등 모든 것을 의미
// 요소 (Element) : HTML 요소를 의미

const parent = document.querySelector('.parent');

// 부모 요소의 모든 자식 노드 확인
console.log(parent.childNodes);
// 텍스트를 포함한 div 요소들 모두 출력된다.

// 부모 요소의 모든 자식 요소 확인
console.log(parent.children);
// div 요소만 출력된다.


class N {}
class E extends N {}

console.dir(E)      // E
console.dir(N)      // N
console.dir(E.__proto__) // N

console.dir(Element)  // Element()
console.dir(Node)     // Node()
console.dir(Element.__proto__)  // Node()

// Node가 Element의 상위 개념
