import React, {ChangeEvent, KeyboardEvent} from 'react';

type propsInputType = {
    title: string
    setTitle: (title:string) => void
    addProductHandler: () => void
    error: boolean
    setError: (error: boolean) => void
    value: string
}

const GeneralInput = (props: propsInputType) => {

    const oncChangeAddProductHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
        props.setError(false)
    }

    const onKeyPressAddProductHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addProductHandler()
        }
    }
    return (
        <div>
            <input value={props.value} onChange={oncChangeAddProductHandler} onKeyPress={onKeyPressAddProductHandler}/>
        </div>
    );
};

export default GeneralInput;