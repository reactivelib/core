/*
 * Copyright (c) 2018. Christoph Rodak  (https://reactivechart.com)
 */

export function copyClass<E extends Constructor<{}>>(clazz: E): E{
    class B extends clazz{
        
    }
    
    return B;
}

export type Constructor<T> = new (...args: any[]) => T;

export interface IMixinFactory{
    
    mixin<E>(e: E): void;
    after(mixin: any): IMixinFactory;
    before(mixin: any): IMixinFactory;
    extend(method: string, e: (m: any) => any): any;
    init(f: () => void): any;
    construct<E extends Constructor<any>>(constructor: Function): E;
    
}