import { addTask, removeTask, clearAll, editTask } from "../actions";

const intialState = {
    tasks: [
        
    ],


}

export function todoReducer(state=intialState, action){
    switch (action.type) {
        case addTask:
            const id = new Date(); // Generate a unique id
            return {...state, tasks: [...state.tasks, { id: id, task: action.payload }] };
        case removeTask:
            const deleteId = action.payload;
            const newTaskList = state.tasks.filter((task)=>task.id!==deleteId);
            return {...state, tasks: newTaskList };
            
        case clearAll:
            return {...state, tasks: [] }
        default:
            return state
    }
}