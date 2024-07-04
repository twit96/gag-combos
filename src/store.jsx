import { configureStore } from "@reduxjs/toolkit";
import { calculatorReducer } from "~/features/calculator";
import { recommendationsReducer } from "~/features/recommendations";


// Handle any Major Redux Store Changes During Development
const lastRefactoredStore = "202407040838";
const localRefactorDate = localStorage.getItem("lrs");
// if local refactored date doesn't match last refactored date, clear local storage
if (lastRefactoredStore !== localRefactorDate) {
  localStorage.clear();
  localStorage.setItem("lrs", lastRefactoredStore);
}


const persistentState = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) : {};

const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    recommendations: recommendationsReducer,
  },
  preloadedState: persistentState
});

store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
});

export default store;
