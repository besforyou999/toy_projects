// 예시 1
setTimeout(()=> {
  import('./module.js').then(abc => {
    console.log(abc);
  })
}, 1000);


// 예시 2
setTimeout(async ()=> {
  const abc = await import('./module.js');
  console.log(abc);
}, 2000);