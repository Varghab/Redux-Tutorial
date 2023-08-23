import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todo: []
}

const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        add: {
            reducer: (state,action)=>{
                const currentTodos = localStorage.getItem('todos');
                let newTodos = [];
                if(currentTodos){
                    newTodos = JSON.parse(currentTodos);
                }else{
                    localStorage.setItem('todos',[]);
                }
                newTodos.push(action.payload);
                localStorage.setItem('todos', JSON.stringify(newTodos))
                state.todo.push(action.payload)
            },
            prepare: (todo)=>{
                const id = nanoid();
                return { payload:{id, todo} };
            }
        },
        remove: (state, action)=>{
            const id = action.payload;
            const afterRemoving = state.todo.filter((todo)=>todo.id!==id);
            state.todo = afterRemoving;
            localStorage.setItem('todos',JSON.stringify(afterRemoving))
        },
        edit: (state, action) =>{
            const {id, todo} = action.payload;
            // console.log(action.payload);
            const index = state.todo.findIndex((e)=>e.id===id);
            state.todo[index] = {
                id:id,
                todo:todo
            }
            localStorage.setItem('todos',JSON.stringify(state.todo))
        }, 
        clear: (state) => {
            state.todo.splice(0, state.todo.length);
            localStorage.removeItem('todos');

        },
        localInit: (state) => {
            const allTodos = JSON.parse(localStorage.getItem('todos'));
            if(allTodos){
                state.todo = allTodos;
            }
            else state.todo = [];
        }
    }
})
export const { add, remove, edit, clear, localInit } = todoSlice.actions;
export default todoSlice.reducer