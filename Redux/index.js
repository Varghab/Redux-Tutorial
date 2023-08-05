import { createStore } from 'redux';

const inc = "INCREMENT";
const dec = "DECREMENT";
const incByAmt = "INCREMENTBYAMOUNT";

const initialState = {
    amount:1,
    val: 99
}

const store = createStore(reducer);


function reducer(state=initialState, action){
    if(action.type === inc){
        return {...state, amount: state.amount+1};
    }
    if(action.type === dec){
        return {...state, amount: state.amount-1};
    }
    if(action.type === incByAmt){
        return {...state, amount: state.amount + action.payload.amount};
    }
    return state;
}

//Action creators - 

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
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(incrementByAmount(7));
console.log(store.getState());