import {v1} from "uuid";
import {dayShoppingListsType, filterType} from "../App";

let shopListID1 = v1()
let shopListID2 = v1()

let initialState: dayShoppingListsType[] = []

export const DayShoppingListsReducer = (state = initialState, action: allDayShoppingListsType) => {
    switch (action.type) {
        case "REMOVE-SHOPPING-LIST": {
            return [...state.filter(f => f.id !== action.payload.shopListID)]
        }
        case "ADD-SHOPPING-LIST": {
            return (
                [...state, {id: action.payload.shopListID, title: action.payload.title, filter: 'all'}]
            )
        }
        case "FILTER-PRODUCT": {
            return [...state.map(m => m.id === action.payload.shopListID ? {...m, filter: action.payload.valueFilterBtn} : m)]
        }
        default:
            return state
    }
}

export type allDayShoppingListsType = removeShoppingListACType | addShoppingListACType | filterProductACType
export type removeShoppingListACType = ReturnType<typeof removeShoppingListAC>
export type addShoppingListACType = ReturnType<typeof addShoppingListAC>
export type filterProductACType = ReturnType<typeof filterProductAC>


export const removeShoppingListAC = (shopListID: string) => {
    return {
        type: 'REMOVE-SHOPPING-LIST',
        payload: {shopListID: shopListID}
    } as const
}

export const addShoppingListAC = (title: string) => {
    return {
        type: 'ADD-SHOPPING-LIST',
        payload: {title: title, shopListID: v1()}
    } as const
}

export const filterProductAC = (shopListID: string, valueFilterBtn: filterType) => {
    return {
        type: 'FILTER-PRODUCT',
        payload: {shopListID: shopListID, valueFilterBtn: valueFilterBtn}
    } as const
}