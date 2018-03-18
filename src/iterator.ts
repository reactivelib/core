/*
 * Copyright (c) 2018. Christoph Rodak  (https://reactivechart.com)
 */

export interface IIterator<E>{
    hasNext(): boolean;
    next(): E
}

export interface IIterable<E>{
    iterator(): IIterator<E>;
}