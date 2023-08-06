import { createStore } from 'redux';
import axios from 'axios';
// Declaration of constants so that name of the action type doesn't change by mistake
const init = "INIT";
const inc = "INCREMENT";
const dec = "DECREMENT";
const incByAmt = "INCREMENTBYAMOUNT";

//The initial global state for the store
const initialState = {
    amount:1,
    val: 99
}

//Creating the store by passing the reduce function as argument
const store = createStore(reducer);


function reducer(state=initialState, action){
    switch(action.type){
        case init:
            return {...state, amount: action.payload.amount};
        case inc:
            return {...state, amount: state.amount+1};
        case dec:
            return {...state, amount: state.amount-1};
        case incByAmt:
            return {...state, amount: state.amount + action.payload.amount};

        default:
            return state;
        }
    
}

//Async API call

async function getUser(){
    const {data} = await axios.get('https://fakestoreapi.com/products');
    console.log(data);
}

getUser();

//Action creators - 
async function initUser(val){
    const {data} = await axios.get('https://fakestoreapi.com/products');
    return ({type:init, payload:{amount:data.price}})
}

function increment(){
    return {type:inc};
}

function decrement(){
    return {type:dec};
}

function incrementByAmount(value){
    return {type:incByAmt, payload:{amount:value}};
}


// store.dispatch({type:"decrement"})
// store.dispatch({type:"incrementByAmount", payload:{amount:4}})
// store.dispatch({type:"incrementByAmount", payload:{amount:4}})
// store.dispatch(increment());
// store.dispatch(decrement());
// store.dispatch(incrementByAmount(7));
store.dispatch(initUser());
console.log(store.getState());