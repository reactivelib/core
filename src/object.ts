function isEmptyObject(obj){
    return Object.getOwnPropertyNames(obj).length === 0;
}

export function removeEmptyProperties(config){
    var empties = [];
    for (var p in config){
        if (typeof config[p] !== "boolean" && !config[p]){
            empties.push(p);
        }
        else if (typeof config[p] === "object"){
            if (isEmptyObject(config[p])){
                empties.push(p);
            }
        }
    }
    for (var i=0; i < empties.length; i++){
        delete config[empties[i]];
    }
    return config;
}