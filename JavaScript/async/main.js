// Resolve, Reject 그리고 에러 핸들링

const delayAdd = index => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (index > 10) {
        reject(`${index}는 10보다 클 수 없습니다.`)
        return
      }
      console.log(index);
      resolve(index + 1);
    }, 1000)
  })
}

delayAdd(2)
  .then(res => console.log(res))
  .catch(err => console.log(err))
  .finally(() => console.log('Done'))

const wrap = async() => {
  try {
    const res = await delayAdd(2);
    console.log(res);
  } catch (err) {
    console.log(err)
  } finally {
    console.log('Done!');
  }
}

wrap();