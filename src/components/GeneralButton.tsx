import React from 'react';
import {Button} from "@mui/material";
import s from "./shoppingList.module.css"
import {filterType} from "../App";

type buttonType = {
    nameButton: string
    callBackButton: () => void
    variant?: "text" | "outlined" | "contained" | undefined
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
}

export const GeneralButton = (props: buttonType) => {
    const callBackHandler = () => {
        props.callBackButton()
    }

    let activeColor = "inherit"
    if (props.nameButton === 'active') {
        activeColor = "error"
    }

    return (
        <div>
            {console.log(activeColor)}
            <Button variant={props.variant} onClick={callBackHandler}
                    className={s.activeFilter}>{props.nameButton}</Button>
        </div>
    );
};
