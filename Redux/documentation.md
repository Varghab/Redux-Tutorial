#Understand the Terms - 

1. Store - The store is the central and single source of truth for the application's state. It holds the entire state tree of your application. In Redux, there should only be one store in your application. The store is responsible for managing the state, handling actions, and notifying the view (usually a UI component) when the state changes.

2. Reducer - A reducer is a pure function that specifies how the application's state changes in response to actions sent to the store. It takes the current state and an action as arguments and returns a new state. The reducer function should not modify the state directly but instead produce a new state object based on the action and the current state. Reducers are combined to form the complete state tree in the Redux store.

3. Action - An action is a plain JavaScript object that represents an event or an intention to change the state. It must have a type property that indicates the type of action being performed. The type property is typically a string constant that describes the action. Other than the type property, the structure of the action object is up to you, and it can contain additional data necessary for updating the state.

4. Dispatch - Dispatching an action means sending the action to the Redux store. To update the state in Redux, you dispatch actions using the dispatch method provided by the store. When an action is dispatched, it triggers the corresponding reducer(s) to handle the action and update the state accordingly.

The Redux flow can be summarized as follows:

1. Components trigger actions (e.g., user clicks a button).
2. Actions are dispatched to the Redux store.
3. Reducers handle the dispatched actions and update the state.
4. The store notifies subscribers (usually UI components) about the state changes.
5. UI components re-render based on the updated state.


* When we are dispatching any action it should be dispatched instantly, meaning that if we dispatch any data in the payload and the data is coming after awaiting any api call then the program will give us error. Why so? As said the action should be dispatched instantly and return a plain object. Refer to the code, the code will give error as in the payload we are getting the data.price after awaiting the api call.

```
async function initUser(val){
    const {data} = await axios.get('https://fakestoreapi.com/products');
    return ({type:init, payload:{amount:data.price}})
}

store.dispatch(initUser())

```