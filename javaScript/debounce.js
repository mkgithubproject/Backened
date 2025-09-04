// debouncing
function debounc(fn , delay){
    let timerId;
    return function(...args){
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
            fn(...args);
        },delay)
    }
}
 function searchApi(query){
    // search api
    console.log("search api called",query);
}

const searchWithDebounce = debounc(searchApi,1000);
searchWithDebounce("hi");
searchWithDebounce("hi2");
searchWithDebounce("hi3");


```
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    const context = this; // capture the correct "this" at call time
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(context, args); // use the captured "this"
    }, delay);
  };
}

// Example usage:
const obj = {
  value: 42,
  log: function () {
    console.log("Value is:", this.value);
  }
};

// Debounced method attached to object
obj.debouncedLog = debounce(obj.log, 1000);

// Call via object
obj.debouncedLog(); // ✅ "Value is: 42"
obj.debouncedLog(); // Only the last call after 1s will print

```
============================================= debounce end ===============================================

let obj ={
   a:1,
    b:function(){
        console.log(this.a) // 1
        function c(){
            console.log(this.a) // undefined
        }
        c();
    }
}
obj.b();





let obj ={
   a:1,
    b:function(){
        console.log(this.a) // 1
        let thisArgs = this
        function c(){
            console.log(thisArgs.a) // 1
        }
        c();
    }
}
obj.b();



let obj ={
   a:1,
    b:function(){
        console.log(this.a) // 1
        function c(){
            console.log(this.a) // 1
        }
        c.apply(this)
    }
}
obj.b();



let obj ={
   a:1,
    b:()=>{
        console.log(this.a) // undefined // will acuire from its lexical env
        // where it is written written in window object
        function c(){
            console.log(this.a) // undefined
        }
        c.apply(this)
    }
}
obj.b();


### time watch

function watch(){
    let time = 0;
   let id =  setInterval(()=>{
        console.log(time++)
       if(time == 11){
           clearInterval(id);
       }
    },1000)
}
watch();



