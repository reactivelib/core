/*
 * Copyright (c) 2018. Christoph Rodak  (https://reactivechart.com)
 */

import * as hashMod from './src/hash';
import * as funcMod from './src/func';
import * as extendMod from './src/extend';
import * as objectMod from './src/object';

export {IIterable, IIterator} from './src/iterator';
export {cancelAnimation, requestAnimation} from './src/timer';
export {IOptional, optional} from './src/optional';
export {dummy} from './src/func';
export {Constructor, copyClass} from './src/mixin';



export {default as list, IListNode, IList } from './src/list';

export const func = funcMod;

/**
 *
 * @param args
 * @returns {any}
 */
export function extend(...args: any[]){
    return extendMod.default.apply(null, args);
}

export function hash(val){
    return hashMod.default(val);
}

export namespace hash{
    export const setHash = hashMod.set;
    export const map = hashMod.map;
    export type IHashMap<K, V> = hashMod.IHashMap<K, V>;
}

export namespace extend{
    export const deep = extendMod.deep;
    export const missing = extendMod.missing;
    export const props = extendMod.properties;
}

export const object = objectMod;