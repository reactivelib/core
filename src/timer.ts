/*
 * Copyright (c) 2018. Christoph Rodak  (https://reactivechart.com)
 */

if (typeof window === "undefined" || !window.requestAnimationFrame){
    var lastTime = 0;
    requestAnimationVar = function(callback: any): any {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}
else {
    var requestAnimationVar = function(anim: any): any{
        return window.requestAnimationFrame(anim);
    }
}
var cancelAnimationVar;
if (typeof window === "undefined" || !window.cancelAnimationFrame){
    cancelAnimationVar = function(id: any) {
        clearTimeout(id);
    };
}
else {
    cancelAnimationVar = function(id: any){
        window.cancelAnimationFrame(id);
    }
}

export const requestAnimation = requestAnimationVar;
export const cancelAnimation = cancelAnimationVar;