import {combineReducers, createStore} from "redux";
import {DayShoppingListsReducer} from "../reducers/DayShoppingListsReducer";
import {shopListReducer} from "../reducers/ShopListReducer";

let rootReducer = combineReducers({
    DayShoppingListsReducer: DayShoppingListsReducer,
    shopListReducer: shopListReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)