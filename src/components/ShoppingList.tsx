import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType} from "../App";
import s from "./shoppingList.module.css"
import {Card, Grid, IconButton, TextField} from "@mui/material";
import {Close, Delete, Done} from "@mui/icons-material";


export type shopListType = {
    id: string
    title: string
    isDone: boolean
}

type propsType = {
    shopListID: string
    title: string
    nameList: string
    shopList: Array<shopListType>
    removeProduct: (shopListID: string, id: string) => void
    addProduct: (shopListID: string, title: string) => void
    filterProduct: (shopListID: string, valueFilterBtn: filterType) => void
    filter: filterType
    onChangeCheckbox: (shopListID: string, idCheckbox: string, isDoneCheckbox: boolean) => void
    removeShoppingList: (shopListID: string) => void
}

export const ShoppingList = (props: propsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const removeProductHandler = (id: string) => {
        props.removeProduct(props.shopListID, id)
    }

    const addProductHandler = () => {
        if (title.trim() === '') {
            setError(true)
        } else {
            props.addProduct(props.shopListID, title)
        }
        setTitle('')
    }

    const oncChangeAddProductHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressAddProductHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addProductHandler()
        }
    }

    // const onClickAllHandler = () => {
    //     props.filterProduct('all')
    // }
    //
    // const onClickActiveHandler = () => {
    //     props.filterProduct('active')
    // }
    //
    // const onClickCompletedHandler = () => {
    //     props.filterProduct('completed')
    // }

    const onClickFilterHandler = (valueFilterBtn: filterType) => {
        props.filterProduct(props.shopListID, valueFilterBtn)
    }

    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>, idCheckbox: string) => {
        props.onChangeCheckbox(props.shopListID, idCheckbox, e.currentTarget.checked)
    }

    const removeShoppingListHandler = () => {
        props.removeShoppingList(props.shopListID)
    }


    return (
        <Grid item>
            <Card sx={{ mt:2, mr:2, mb:2, ml:2 }}>
                <div style={{textAlign: 'right'}}>
                    <IconButton color="error" onClick={removeShoppingListHandler}><Close/></IconButton>
                </div>
                <div>
                    <h3 style={{textAlign: 'center', marginTop: '5px', paddingBottom: '15px'}}>{props.nameList}</h3>
                </div>


                <TextField label="Add to the list" size="small" style={{ marginLeft: '10px' }} onChange={oncChangeAddProductHandler} value={title} onKeyPress={onKeyPressAddProductHandler}/>

                {/*<GeneralInput value={title} title={title} setTitle={setTitle} addProductHandler={addProductHandler}*/}
                {/*              error={error} setError={setError}/>*/}

                {/*<GeneralButton variant={"contained"} callBackButton={addProductHandler} nameButton={'+'}></GeneralButton>*/}
                {/*<GeneralButton variant={"contained"} callBackButton={removeShoppingListHandler}*/}
                {/*               nameButton={'-'}></GeneralButton>*/}
                <IconButton color="success" onClick={addProductHandler}><Done/></IconButton>
                {error && <div>Enter product</div>}
                <ul>
                    {props.shopList &&
                    props.shopList.map(m => {
                            return (
                                <li key={m.id}>
                                    <input type={'checkbox'} checked={m.isDone}
                                           onChange={(e) => onChangeCheckboxHandler(e, m.id)}/>
                                    <span style={{fontSize:'18px'}} className={m.isDone ? s.opacityTitle : ''}>{m.title}</span>
                                    {/*<GeneralButton variant={"contained"} callBackButton={() => removeProductHandler(m.id)}*/}
                                    {/*               nameButton={'x'}></GeneralButton>*/}
                                    <IconButton size="small" onClick={() => removeProductHandler(m.id)}><Delete fontSize="small"/></IconButton>
                                </li>
                            )
                        }
                    )}
                </ul>


                {/*<button onClick={onClickAllHandler}>all</button>*/}
                {/*<button onClick={onClickActiveHandler}>active</button>*/}
                {/*<button onClick={onClickCompletedHandler}>completed</button>*/}

                <button
                    className={`${props.filter === 'all' ? s.activeFilter : s.buttonFilterStyle} ${s.buttonFilterStyle}`}
                    onClick={() => onClickFilterHandler('all')}>all
                </button>
                {/*<GeneralButton variant={'outlined'} color={"warning"} callBackButton={() => onClickFilterHandler('all')}*/}
                {/*               nameButton={'all'}></GeneralButton>*/}
                <button
                    className={`${props.filter === 'active' ? s.activeFilter : s.buttonFilterStyle} ${s.buttonFilterStyle}`}
                    onClick={() => onClickFilterHandler('active')}>active
                </button>
                {/*<GeneralButton variant={'outlined'} callBackButton={() => onClickFilterHandler('active')}*/}
                {/*               nameButton={'active'}></GeneralButton>*/}
                <button
                    className={`${props.filter === 'completed' ? s.activeFilter : s.buttonFilterStyle} ${s.buttonFilterStyle}`}
                    onClick={() => onClickFilterHandler('completed')}>completed
                </button>
                {/*<GeneralButton variant={'outlined'} callBackButton={() => onClickFilterHandler('completed')}*/}
                {/*               nameButton={'completed'}></GeneralButton>*/}
            </Card>
        </Grid>

    )
}