
function memoization(fn){
    let memo = {}
    return function(...args){
        const key = args.join("_");
        console.log("key",key, typeof key)
        if(memo[key]){
            // memo.key will not work
            //If you want to access the stored value, 
            //you must use bracket notation with the actual key string:
            return memo[key];
        }
        
         let result = fn(...args)
        memo[key] = result;
        console.log("memi",memo)
        return result;
    }
}

function add(...args){
    console.log("add function called...")
    return args.reduce((acc,curr,index,args)=>{
        return acc+curr
    },0)
}

let memoziedSum = memoization(add);
console.log(memoziedSum(2,3,5))
console.log(memoziedSum(2,3,5))



