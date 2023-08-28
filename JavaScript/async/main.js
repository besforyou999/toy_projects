// 콜백 지옥 예시
// 1, 2, 3 순서대로 출력하기 위해 콜백을 중첩시키면 가독성이 굉장히 떨어진다.
  setTimeout(() => {
    console.log(1);
    callback()
  }, 1000)
}

const b = (callback) => {
  setTimeout(() => {
    console.log(2);
    callback();
  }, 1000)
}

const c = (callback) => {
  setTimeout(() => {
    console.log(3)
    callback();
  }, 1000)
}

const d = () => console.log(4);

a(() => {
  b(() => {
    c(() => {
      d()
    })
  })
})