const redux = require('redux');
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();


const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

function orderCake() { // ini adalah sebuah fungsi yang mengembalikan nilai dispatch
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty // nilai quantity dimasukan ketika dispatch di panggil menggunakan store.dispatch()
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function reastockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

// const initialState = { // nilai state adalah nilai bawaan dari redux
//     numOfCakes: 10,
//     numOfIceCream: 20
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCream: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) { // action.type di ambil dari nilai yang sudah di tetapkan di object dispatchnya
        case CAKE_ORDERED: // CAKE_ORDERED adalah sebuah variabel string yang akan di tetapkan jika nilainya true
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload // payload akan bernilai tiga jika saat dispatching nilainya dibuat menjadi 3
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream + action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({ // menggabungkan dua reducers kedalam satu store redux
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger)) // function reducer dimasukan sebagai redux store dimana nilainya bisa di atur oleh redux
console.log('Initial State', store.getState()); // ketika program dijalankan maka di cetak di console nilai awalan dari state yang suda di redux store

const unsubscribe = store.subscribe(() => {}); // function subscribe dipanggil setiap ada perubahan data di redux store

// store.dispatch({ // ini juga merupakan dispatch yang memiliki nilai object di dalamnya ada type yang di ambil dari variabel CAKE_ORDERED
//     type: CAKE_ORDERED,
//     payload: 1
// }) 
// store.dispatch(orderCake()) // ini adalah dispatch dari reducer 
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, reastockIceCream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.reastockIceCream(2);

unsubscribe();