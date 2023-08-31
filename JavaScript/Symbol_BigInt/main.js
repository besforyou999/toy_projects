// 심볼 (Symbol)

// 변경이 불가한 데이터로, 유일한 식별자를 만들어 데이터를 보호하는 용도로 사용할 수 있습니다.

// Symbol ('설명')
// '설명'은 단순 디버깅을 위한 용도일 뿐, 심볼 값과는 관계가 없습니다. 

import heropy from './heropy.js'
import { birthKey, emailKey } from './keys.js';

console.log(heropy);
console.log(Object.keys(heropy));
for (const key in heropy) {
  console.log(heropy[key]);
}

console.log(heropy[birthKey]);
console.log(heropy[emailKey]);