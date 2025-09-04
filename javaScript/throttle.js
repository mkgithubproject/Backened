function sendChatMessage(message){
    console.log(message);
}

function throttle(fn, delay){
   let lastCall = 0
    return function(...args){
        const now = Date.now();
        if(now - lastCall < delay){
            return;
        }
        lastCall = now;
        return fn(...args);
    }
}
const sendMessageWithThrottle = throttle(sendChatMessage , 1000)
sendMessageWithThrottle("hi")
sendMessageWithThrottle("hello ji")
sendMessageWithThrottle("kaise ho")

