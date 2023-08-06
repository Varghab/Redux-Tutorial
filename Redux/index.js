import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
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
const store = createStore(reducer, applyMiddleware(logger.default,thunk.default));


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

//Action creators - 
function getuser(id){
    return async(dispatch, getState) => {
        const {data} = await axios.get(`https://fakestoreapi.com/products/${id}`);
        dispatch(initUser(data.price))
    }
    
}

function initUser(value){
    return ({type:init, payload:{amount:value}})
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


store.dispatch(getuser(5));
console.log(store.getState());