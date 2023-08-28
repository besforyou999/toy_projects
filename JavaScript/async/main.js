// Promise

const getMovies = movieName => {
  return new Promise(resolve => {
    fetch(`https://www.helloworld/s=${movieName}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        resolve()
      })
  })
}

// getMovies('frozen')
//   .then(() => {
//     console.log('겨울왕국!')
//     return getMovies('avengers')
//   })
//   .then(() => {
//     console.log('어벤져스!')
//     return getMovies('avatar')
//   })
//   .then(() => {
//     console.log('아바타!');
//   })

const wrap = async() => {
  await getMovies('frozen')
  console.log('겨울왕국')
  await getMovies('avengers')
  console.log('어벤져스!')
  await getMovies('avatar')
  console.log('아바타!')
}

wrap();