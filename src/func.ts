/*
 * Copyright (c) 2018. Christoph Rodak  (https://reactivechart.com)
 */

export function compose<E>(...fns: ((a: E) => E)[]): (a: E) => E {
    return function (this: any, result) {
        for (var i = fns.length - 1; i > -1; i--) {
            result = fns[i].call(this, result);
        }

        return result;
    };
};

export function compose2<E>(a: (a: E) => E, b: (b: E) => E): (a: E) => E{
    if (!a){
        return b;
    }
    return function(arg: E){
        return a(b(arg));
    }
}


export function combine(f1: Function, f2: Function): any{
    if (!f2){
        return f1;
    }
    if (!f1){
        return f2;
    }
    if(f1.length === 0){
        return function(){
            f1();
            f2();
        }
    }
    if (f1.length === 1){
        return function (p1: any) {
            f1(p1);
            f2(p1);
        }
    }
    if (f1.length === 2){
        return function (p1: any, p2: any) {
            f1(p1, p2);
            f2(p1, p2);
        }
    }
    if (f1.length === 3){
        return function (p1: any, p2: any, p3: any) {
            f1(p1, p2, p3);
            f2(p1, p2, p3);
        }
    }
    if (f1.length === 4){
        return function (p1: any, p2: any, p3: any, p4: any) {
            f1(p1, p2, p3, p4);
            f2(p1, p2, p3, p4);
        }
    }
    if (f1.length === 5){
        return function (p1: any, p2: any, p3: any, p4: any, p5: any) {
            f1(p1, p2, p3, p4, p5);
            f2(p1, p2, p3, p4, p5);
        }
    }
    throw new Error("Too many arguments");
}

export function combineAllInObject(o1: any, o2: any): any{
    var res: any = {};
    for (var p in o1){
        res[p] = combine(o1[p], o2[p]);
    }
    return res;
}

export function combineAllInObjects(o: any[]){
    var res: any = o[0];
    for (var i=1; i < o.length; i++){
        res = combineAllInObject(res, o[i]);
    }
    return res;
}

export function dummy(){
    
}