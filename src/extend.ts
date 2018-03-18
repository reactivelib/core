/*
 * Copyright (c) 2018. Christoph Rodak  (https://reactivechart.com)
 */

export class Extender {
    public deep = false;
    public missing = false;

    public getProperties(arg:{}) {
        var args = [];
        for (var p in arg) {
            args.push(p);
        }
        return args;
    }

    public extend(args: any[]): any{
        var first = args[0];
        for (var i=1; i < args.length; i++)
        {
            var ex = args[i];
            if (ex)
            {
                var props = this.getProperties(ex);
                for (var j = 0; j < props.length; j++)
                {
                    var k = props[j];
                    if (typeof ex === "object" && ex.hasOwnProperty(k))
                    {
                        if (this.deep)
                        {
                            var left = first[k];
                            var right = ex[k];
                            if (left && typeof left === 'object' && right && typeof right === 'object'){
                                this.extend([left, right]);
                            }
                            else{
                                if (!this.missing || !first.hasOwnProperty(k)){
                                    Object.defineProperty(first, k, Object.getOwnPropertyDescriptor(ex, k));
                                }
                            }
                        }
                        else
                        {
                            if (!this.missing || !first.hasOwnProperty(k)){
                                Object.defineProperty(first, k, Object.getOwnPropertyDescriptor(ex, k));
                            }
                        }

                    }
                }
            }
        }
        return first;
    }
}

var stdExtender = new Extender();
var deepExtender = new Extender();
deepExtender.deep = true;
var missingExtender = new Extender();
missingExtender.missing = true;

/**
 *
 * @param any
 * @returns {any}
 */
export function extend(...any: any[]): any{
    return stdExtender.extend(any);
}

export default extend;

export interface ExtendConfig{
    deep ?: boolean;
    missing ?: boolean;
    properties ?: string[];
}

/**
 *
 * Merges the given objects into the first object using a deep merge
 */
export function deep(...any: any[]): any{
    return deepExtender.extend(any);
}

/**
 * Merges the given objects into the first object using given properties
 */
export function missing(...any: any[]): any{
    return missingExtender.extend(any);
}

export function properties(p: string[]): {extend(...objects: any[]): any}{
    var ext = new Extender();
    ext.getProperties = function(){
        return p;
    }
    return ext;
}

export function configure(config: ExtendConfig) {
    var ext = new Extender();
    properties(["deep", "missing"]).extend(ext, config);
    if (config.properties){
        ext.getProperties = function(){
            return config.properties;
        }
    }
    return ext;
}