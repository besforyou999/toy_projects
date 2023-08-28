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

getMovies('frozen')
  .then(() => {
    console.log('겨울왕국!')
    return getMovies('avengers')
  })
  .then(() => {
    console.log('어벤져스!')
    return getMovies('avatar')
  })
  .then(() => {
    console.log('아바타!');
  })