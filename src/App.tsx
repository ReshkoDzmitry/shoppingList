import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {shopListType, ShoppingList} from "./components/ShoppingList";
import {AppBar, Box, Button, Container, Grid, Icon, Toolbar, Typography} from "@mui/material";
import {ShoppingBag} from "@mui/icons-material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useDispatch, useSelector} from "react-redux";
import {addShoppingListAC, filterProductAC, removeShoppingListAC} from "./reducers/DayShoppingListsReducer";
import {rootReducerType} from "./store/store";
import {addProductAC, onChangeCheckboxAC, removeProductAC} from "./reducers/ShopListReducer";

// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';


export type filterType = 'all' | 'active' | 'completed'

export type dayShoppingListsType = {
    id: string
    title: string
    filter: filterType
}

export type shopListStateType = {
    [key: string]: shopListType[]
}

function App() {


    let dispatch = useDispatch();

    let DayShoppingLists = useSelector<rootReducerType, dayShoppingListsType[]>(state => state.DayShoppingListsReducer)
    let ShopList = useSelector<rootReducerType, shopListStateType>(state => state.shopListReducer)


    // let shopListID1 = v1()
    // let shopListID2 = v1()

    // let [dayShoppingLists, setDayShoppingLists] = useState<dayShoppingListsType[]>([
    //     {id: shopListID1, title: '29.12.2021', filter: 'all'},
    //     {id: shopListID2, title: '28.12.2021', filter: 'all'},
    // ]);

    // const [shopList, setShopList] = useState<shopListStateType>({
    //     [shopListID1]: [
    //         {id: v1(), title: 'chicken', isDone: true},
    //         {id: v1(), title: 'milk', isDone: false},
    //         {id: v1(), title: 'bread', isDone: true},
    //         {id: v1(), title: 'tomatoes', isDone: false},
    //         {id: v1(), title: 'tea', isDone: true},
    //     ],
    //     [shopListID2]: [
    //         {id: v1(), title: 'fish', isDone: true},
    //         {id: v1(), title: 'ice cream', isDone: true},
    //         {id: v1(), title: 'beer', isDone: false},
    //     ],
    // });

    const removeProduct = (shopListID: string, id: string) => {
        // setShopList(shopList.filter(f => f.id !== id)) для 1 shopList
        // setShopList({...shopList, [shopListID]: shopList[shopListID].filter(f => f.id !== id)})
        dispatch(removeProductAC(shopListID, id))
    }

    const addProduct = (shopListID: string, title: string) => {
        // const newProduct = {id: v1(), title: title.trim(), isDone: false}
        // setShopList([newProduct, ...shopList]) для 1 shopList
        // setShopList({...shopList, [shopListID]: [newProduct, ...shopList[shopListID]]})
        dispatch(addProductAC(shopListID, title))
    }

    const filterProduct = (shopListID: string, valueFilterBtn: filterType) => {
        // setDayShoppingLists(dayShoppingLists.map(m => m.id === shopListID ? {...m, filter: valueFilterBtn} : m))
        dispatch(filterProductAC(shopListID, valueFilterBtn))
    }

    const onChangeCheckbox = (shopListID: string, idCheckbox: string, isDoneCheckbox: boolean) => {
        // setShopList(shopList.map(m => m.id === idCheckbox ? {...m, isDone: isDoneCheckbox} : m)) для 1 shopList

        // setShopList({
        //     ...shopList,
        //     [shopListID]: shopList[shopListID].map(m => m.id === idCheckbox ? {...m, isDone: isDoneCheckbox} : m)
        // })

        dispatch(onChangeCheckboxAC(shopListID, idCheckbox, isDoneCheckbox))
    }

    const [titleNewShoppingList, setTitleNewShoppingList] = useState('')
    const newTitleShoppingListValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleNewShoppingList(e.currentTarget.value)
        //console.log(titleNewShoppingList)
    }

    const addShoppingList = (title: string) => {
        dispatch(addShoppingListAC(title))
        /*let newShoppingListID = v1()
        setDayShoppingLists([...dayShoppingLists, {
            id: newShoppingListID,
            titleList: titleNewShoppingList,
            filter: 'All'
        }])*/

        // setShopList({
        //     ...shopList, [newShoppingListID]: []
        // })
    }

    const removeShoppingList = (shopListID: string) => {
        // setDayShoppingLists(dayShoppingLists.filter(f => f.id !== shopListID))
        // delete shopList[shopListID]
        dispatch(removeShoppingListAC(shopListID))
    }

    const [value, setValue] = React.useState<Date | null>(null);

    return (
        <div>
            <AppBar className="appBar">
                <div className="container">
                    <Toolbar>
                        <Typography variant="h6" sx={{flexGrow: 1}}>Shopping
                            List <Icon><ShoppingBag/></Icon></Typography>
                        <Box>
                            <input onChange={newTitleShoppingListValue} className="inputData" value={titleNewShoppingList} type={'date'}/>
                            <Button variant="contained"
                                    onClick={() => addShoppingList(titleNewShoppingList)}>+</Button>
                        </Box>
                    </Toolbar>
                </div>
            </AppBar>
            {/*<div style={{padding: '20px 30px 40px', margin: '10px'}}>*/}
            {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
            {/*    <DatePicker*/}
            {/*        label="OLOLOLOLO"*/}
            {/*        value={titleNewShoppingList}*/}
            {/*        onChange={(newValue) => {*/}
            {/*            setValue(newValue);*/}
            {/*        }}*/}

            {/*        renderInput={(params) => <TextField {...params} />}*/}
            {/*    />*/}
            {/*</LocalizationProvider>*/}
            {/*    <input onChange={newTitleShoppingListValue} value={titleNewShoppingList} type={'date'}/>*/}
            {/*    <Button variant="contained" onClick={() => addShoppingList(titleNewShoppingList)}>+</Button>*/}
            {/*</div>*/}

            <div className="container">
                <Container sx={{mt: 15}}>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {
                            DayShoppingLists.map(m => {
                                let shopListForShoppingList = ShopList[m.id]

                                if (m.filter === 'active') {
                                    shopListForShoppingList = ShopList[m.id].filter(f => f.isDone === false)
                                }
                                if (m.filter === 'completed') {
                                    shopListForShoppingList = ShopList[m.id].filter(f => f.isDone === true)
                                }
                                return (
                                    <div key={m.id} style={{
                                        // margin: '0 30px',
                                        // border: 'solid 2px lightGrey',
                                        // padding: '25px',
                                        // borderRadius: '10px'
                                    }}>
                                        <ShoppingList key={m.id}
                                                      shopListID={m.id}
                                                      title={m.title}
                                                      nameList={m.title}
                                                      shopList={shopListForShoppingList}
                                                      removeProduct={removeProduct}
                                                      addProduct={addProduct}
                                                      filterProduct={filterProduct}
                                                      filter={m.filter}
                                                      onChangeCheckbox={onChangeCheckbox}
                                                      removeShoppingList={removeShoppingList}
                                        />
                                    </div>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </div>
        </div>
    );
}


export default App;
