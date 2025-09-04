// fetch api data with promise and retry

 function fetchData(){
    let data = {
        a:1,
        b:2,
        c:{
           d:4
        }
    }
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const statusCode = data ? 200 :500
            if(statusCode == 200){
                resolve(data);
            }else{
                reject("something went wrong to fetching the data.")
            }
        },1000)
    })
}

// fetchData().then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err)
// })

function retry(fn ,retryCount, delay){
    return function(){
        console.log(retryCount, delay)
        if(retryCount <=0){
            return "retry passed."
        }
        setTimeout(()=>{
            fn().then((data)=>{
                console.log(data)
                return data;
            }).catch((err)=>{
                retry(fn,retryCount-1,delay)
            })
        },delay)
        // return "done" 
    }
}
let fetchDataWithRetry = retry(fetchData , 3, 1000)
let data = fetchDataWithRetry();
console.log(data); // now getting undefined , if i return done then i get done , why undefined , that cb dont know return to where
its retuirning to window object that is tha caller obj




=============================== step 2====================================\

  // fetch api data with promise and retry

 function fetchData(){
    let data = {
        a:1,
        b:2,
        c:{
           d:4
        }
    }
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const statusCode = data ? 500 :500
            if(statusCode == 200){
                resolve(data);
            }else{
                reject("something went wrong to fetching the data.")
            }
        },1000)
    })
}


function retry(fn, retryCount, delay) {
  return function () {
    return new Promise((resolve, reject) => {
      fn()
        .then(resolve) // .then((data)=>{resolve(data)})
        .catch((err) => {
          if (retryCount < 1) {
            reject(err); // all retries failed
          } else {
              console.log("retry",retryCount)
            setTimeout(() => {
              retry(fn, retryCount - 1, delay)().then(resolve).catch(reject);
            }, delay);
          }
        });
    });
  };
}
let fetchDataWithRetry = retry(fetchData , 3, 1000)

fetchDataWithRetry().then((data)=>{
    console.log(data)
}).catch(err =>{
    console.log(err)
})
