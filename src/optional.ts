/*
 * Copyright (c) 2018. Christoph Rodak  (https://reactivechart.com)
 */

export interface IOptional<E>{
    present: boolean;
    value: E;
}

class EmptyOptional<E> implements IOptional<E>{

    public present: boolean;

    get value(): E{
        throw new Error("Optional is empty");
    }

}

EmptyOptional.prototype.present = false;

class Optional<E> implements IOptional<E>{
    public present: boolean;

    constructor(public value: E){

    }
}

Optional.prototype.present = true;



function empty<E>(){
    return new EmptyOptional<E>();
}

export function optional<E>(val?: E): IOptional<E>{
    if (val === void 0){
        return empty<E>();
    }
    return new Optional<E>(val);
}