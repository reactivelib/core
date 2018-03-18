/*
 * Copyright (c) 2018. Christoph Rodak  (https://reactivechart.com)
 */

var hashIds = 0;

export function hash(value: any): any
{
    if (value != null && typeof value == 'object')
    {
        if ("getHash" in value){
            return value.getHash();
        }
        else if ("_hashId" in value)
        {
            return value._hashId;
        }
        else
        {
            hashIds++;
            set(value, hashIds);
            return hashIds+"";
        }
    }
    else
    {
        return value+"";
    }
}

export default hash;

/**
 *
 * @param object
 * @param value
 */
export function set(object: any, value: any){
    object._hashId = value;
}

const s = set;
export interface IKeyValue<K, V>{
    key: K;
    value: V;
}

export interface IHashMap<K, V>{

    objects: {[s: string]: IKeyValue<K, V>};
    put(k: K, v: V);
    get(k: K): V;
    remove(k: K);
}

class HashMap<K, V> implements IHashMap<K, V>{

    public objects: {[s: string]: IKeyValue<K, V>} = {};

    constructor(){

    }

    public put(k: K, v: V){
        this.objects[hash(k)] = {key: k, value: v};
    }

    public get(k: K) {
        var v = this.objects[hash(k)];
        if (!v){
            return null;
        }
        return v.value;
    }

    public remove(k: K){
        delete this.objects[hash(k)];
    }

}

export function map<K, V>(): IHashMap<K ,V>{
    return new HashMap();
}
