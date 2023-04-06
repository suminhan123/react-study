import { createSlice} from "@reduxjs/toolkit";

// export const INCREMENT = 'increment';
const initialCounterState = { counter : 0, showCounter : true}

const counterSlice = createSlice({
    name : 'counter',
    initialState: initialCounterState,
    reducers : {
        increment(state) {
            // 툴깃이랑 createSlice를 같이 사용하면 기존 상태를 바꿀 수는 없음
            state.counter++; // immer라는 패키지에서 자동으로 원래 상태를 복제, 새로운 상태 객체를 생성 => 더쉬운 리덕스스
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    }
})
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
// const counterReducer = (state = initialState, action) => {
//     if (action.type === INCREMENT){
//         return {
//             counter : state.counter + 1, 
//             showCounter : state.showCounter
//         };
//     }
//     if (action.type === "decrement"){
//         return {
//             counter : state.counter - 1,
//             showCounter : state.showCounter
//         };
//     }
//     if (action.type === 'increaseby5') {
//         return {
//             counter : state.counter + action.amount,
//             showCounter : state.showCounter
//         };
//     }
//     if (action.type === 'toggle') {
//         return {
//             counter : state.counter,
//             showCounter : !state.showCounter,
//         };
//     }
//     return state;
// }
// const store = createStore(counterSlice.reducer);