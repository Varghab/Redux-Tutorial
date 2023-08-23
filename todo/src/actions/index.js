export const addTask = "TODO/ADD";
export const removeTask = "TODO/REMOVE";
export const clearAll = "TODO/CLEARALL";
export const editTask = "TODO/EDIT";

export function add(task){
    return {type:addTask, payload:task}
}

export function remove(id){
    return {type:removeTask, payload:id}
}

export function clear(){
    return {type:clearAll}
}

export function edit(id){
    return {type:addTask, payload:id}
}