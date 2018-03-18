/*
 * Copyright (c) 2018. Christoph Rodak  (https://reactivechart.com)
 */

export default function(func: () => void, delay: number){
    var handler = setTimeout(function(){
        func();
    }, delay);
    return {
        cancel: function(){
             clearTimeout(handler);
        }
    }
}

export class Delayer{
    
    public handle: any;
    public time: number = 200;
    
    delay(f: () => void){
        if (this.handle){
            clearTimeout(this.handle);
        }
        this.handle = setTimeout(() => {
            this.handle = null;
            f();
        }, this.time);
    }
}