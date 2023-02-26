import React from 'react';
import {TimeType} from "../App";


type DisplayPropsType = {
    time: TimeType
}

export const Display: React.FC<DisplayPropsType> = (props) => {
    const {time, ...otherprops} = props
    return (
        <div>
            <span>{time.h}</span>{" : "}
            <span>{time.m}</span>{" : "}
            <span>{time.s}</span>{" : "}
            <span>{time.ms}</span>
        </div>
    );
};
