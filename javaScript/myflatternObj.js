// flatern object
let obj = {
    a:1,
    b:{
        c:2,
        d:3,
        e:{
            f:4
        }
    },
    g:5
}

function flatternObj(obj){
    let result = {}
    for( let [key , val] of Object.entries(obj)){ 
        // note [key, val] destructring value from an array
       if(typeof val === 'object'){
           // say to recursion
           let rObj = flatternObj(obj[key]);
           result = {... result,...rObj};
       }else{
           result[key] = val;
       }
    }
    return result;
}
console.log(flatternObj(obj))





let obj = {a:{b:{c:12, j:false},k:null}};

function getPath(obj, keysPath){
    if(keysPath.length == 1){
        return obj[keysPath]
    }
    if(keysPath.length ==0){
        return 'undefined'
    }
    let splittedKeyPath = keysPath.split('.')
    let myResult = obj[splittedKeyPath[0]];

    let recursiveResult = getPath(myResult , keysPath.slice(2))
    return recursiveResult;
}

console.log(getPath(obj,'a.b.c'))


