import React from 'react';
import s from './SuperButton.module.css'

type SuperButtonPropsType = {
    children: React.ReactNode
    callback: ()=>void
}

export const SuperButton: React.FC<SuperButtonPropsType> = (props) => {
    const {children, callback, ...otherprops} = props

    const onClickHandler = () => callback()

    return <button onClick={onClickHandler} className={s.button}>{children}</button>
};
