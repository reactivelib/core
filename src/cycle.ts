/*
 * Copyright (c) 2018. Christoph Rodak  (https://reactivechart.com)
 */

function findIndex(objects: any[], value: any){
    for (var i=0; i < objects.length; i++){
        var o = objects[i];
        if (o.value === value){
            return i;
        }
    }
    return -1;
}

export function decycle(object: any, replacer?: any) {
    var objects: any[] = [];
    return (function derez(value, path) {
        var old_path;
        var nu: any;
        if (replacer !== undefined) {
            value = replacer(value);
        }
        if (
            typeof value === "object" && value !== null &&
            !(value instanceof Boolean) &&
            !(value instanceof Date) &&
            !(value instanceof Number) &&
            !(value instanceof RegExp) &&
            !(value instanceof String)
        ) {

            old_path = objects[findIndex(objects, value)];
            if (old_path !== undefined) {
                return {$ref: old_path.path};
            }
            objects.push({value: value, path: path});
            if (Array.isArray(value)) {
                nu = [];
                value.forEach(function (element, i) {
                    nu[i] = derez(element, path + "[" + i + "]");
                });
            } else {
                nu = {};
                Object.keys(value).forEach(function (name) {
                    nu[name] = derez(
                        value[name],
                        path + "[" + JSON.stringify(name) + "]"
                    );
                });
            }
            return nu;
        }
        return value;
    }(object, "$"));
};

export function retrocycle($: any) {
    var px = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\([\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*")\])*$/;
    (function rez(value) {
        if (value && typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(function (element, i) {
                    if (typeof element === "object" && element !== null) {
                        var path = element.$ref;
                        if (typeof path === "string" && px.test(path)) {
                            value[i] = eval(path);
                        } else {
                            rez(element);
                        }
                    }
                });
            } else {
                Object.keys(value).forEach(function (name) {
                    var item = value[name];
                    if (typeof item === "object" && item !== null) {
                        var path = item.$ref;
                        if (typeof path === "string" && px.test(path)) {
                            value[name] = eval(path);
                        } else {
                            rez(item);
                        }
                    }
                });
            }
        }
    }($));
    return $;
};