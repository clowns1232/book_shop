async function f() {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      res("완료");
    }, 1000);
  });
  const results = await promise;
  console.log(results);
}

f();
