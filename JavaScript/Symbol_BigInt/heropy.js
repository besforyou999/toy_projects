import {birthKey, emailKey} from './keys.js';

export default {
  firstName: 'YoungWoong',
  lastName: 'Park',
  age: 38,
  [birthKey]: new Date(1985, 11, 16, 17, 30),
  [emailKey]: ['thesecond@gmail.com', 'abc@naver.com']
}