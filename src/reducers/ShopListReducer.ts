import {v1} from "uuid";
import {shopListStateType} from "../App";
import {addShoppingListACType, removeShoppingListACType} from "./DayShoppingListsReducer";


let shopListID1 = v1()
let shopListID2 = v1()

let initialState: shopListStateType = {
    [shopListID1]: []
};

export const shopListReducer = (state = initialState, action: shopListType) => {
    switch (action.type) {
        case 'ADD-PRODUCT': {
            const newProduct = {id: v1(), title: action.payload.title.trim(), isDone: false}
            return {...state, [action.payload.shopListID]: [newProduct, ...state[action.payload.shopListID]]}
        }
        case "REMOVE-PRODUCT": {
            return {
                ...state,
                [action.payload.shopListID]: state[action.payload.shopListID].filter(f => f.id !== action.payload.id)
            }
        }
        case "ONCHANGE-CHECKBOX": {
            return {
                ...state,
                [action.payload.shopListID]: state[action.payload.shopListID].map(m => m.id === action.payload.idCheckbox ? {
                    ...m,
                    isDone: action.payload.isDoneCheckbox
                } : m)
            }
        }
        case "REMOVE-SHOPPING-LIST": {
            let copyState = {...state}
            delete copyState[action.payload.shopListID]
            return copyState
        }
        case "ADD-SHOPPING-LIST": {
            return (
                {...state, [action.payload.shopListID]: []}
            )
        }
        default:
            return state
    }
}


export type shopListType =
    addProductACType
    | removeProductACType
    | onChangeCheckboxACType
    | removeShoppingListACType
    | addShoppingListACType

export type addProductACType = ReturnType<typeof addProductAC>
export type removeProductACType = ReturnType<typeof removeProductAC>
export type onChangeCheckboxACType = ReturnType<typeof onChangeCheckboxAC>

export const addProductAC = (shopListID: string, title: string) => {
    return {
        type: 'ADD-PRODUCT',
        payload: {shopListID: shopListID, title: title}
    } as const
}


export const removeProductAC = (shopListID: string, id: string) => {
    return {
        type: 'REMOVE-PRODUCT',
        payload: {shopListID: shopListID, id: id}
    } as const
}

export const onChangeCheckboxAC = (shopListID: string, idCheckbox: string, isDoneCheckbox: boolean) => {
    return {
        type: 'ONCHANGE-CHECKBOX',
        payload: {shopListID: shopListID, idCheckbox: idCheckbox, isDoneCheckbox: isDoneCheckbox}
    } as const
}