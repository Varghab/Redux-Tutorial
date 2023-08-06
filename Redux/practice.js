import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

//Initial state defination
const initialState = {
    posts:[],
    loading: false
}

//Action type constants defination
const fullfiled = 'posts/fullfiled';
const rejected = 'posts/rejected';
const loading = 'posts/loading';

const store = createStore(postReducer, applyMiddleware(logger.default, thunk.default));

function postReducer(state, action){
    switch (action.type) {
        case fullfiled:
            const sortedData = action.payload;
            sortedData.sort((a,b)=>{
                if (a.name<b.name) return -1;
                if (b.name<a.name) return 1;
                else return 0;
            })
            return {...state, posts: sortedData, loading:false}    
        case loading:
            return {...state, loading:true}   
        case rejected:
            return {...state, loading: false, error: action.error}     
        default:
            return state;
    }
}

//Action creators defination
async function getPosts(dispatch, getState){
    try {
        dispatch(PostsLoading());
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/users");
        dispatch(PostsFullfiled(data));
    } catch (error) {
        dispatch(PostsRejected(error.message));
    }
}

const PostsFullfiled = (val) => {
    return{type:fullfiled, payload:val}    
}

const PostsRejected = (error) => {
    return{type: rejected, error:error}
}

const PostsLoading = () => {
    return{type:loading}    
}


//Action Dispatch
store.dispatch(getPosts)