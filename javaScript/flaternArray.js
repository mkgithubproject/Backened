let arr =  [2,3,[4,[5,6],7],7,8];

function flatternArray(ar){
    let result = [];
    ar.forEach((item)=>{
        if(Array.isArray(item)){
            // say to recursion hey recursion give me flattern array for taht given array
            let recursiveResult = flatternArray(item);
            result = result.concat(recursiveResult);
        }else{
            result.push(item);
        }
    })
    return result;
}

console.log(flatternArray(arr));
