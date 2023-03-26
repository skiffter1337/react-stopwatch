import React, {useEffect, useState} from 'react';
import {Display} from "../Display/Display";
import {SuperButton} from "../SuperButton/SuperButton";
import s from "./Stopwatch.module.css"
import {KeyboardEvent} from "react";
export type TimeType = {
    ms: number
    s: number
    m: number
    h: number
}

type ButtonsConfigType = {
[key: number]: ButtonConfigType[]
}
type ButtonConfigType = {
    text: String
    callback: () => void
    getFromLocalStorage?: ()=>void
}

export const StopWatch = () => {

    const [time, setTime] = useState<TimeType>({ms: 0, s: 0, m: 0, h: 0})
    const [status, setStatus] = useState(0)
    const [interv, setInterv] = useState(setInterval(() => {}, 10))
    const [hotkey, setHotkey] = useState(false)

    let hotkeys = hotkey ? <span className={s.hotkeyInfo}>SPACE - start/stop, R - reset</span> : ""

    let updatedH = time.h, updatedM = time.m, updatedS = time.s, updatedMS = time.ms
    const run = () => {
        if (updatedM === 60) {
            updatedH++
            updatedM = 0
        }
        if (updatedS === 60) {
            updatedM++
            updatedS = 0
        }
        if (updatedMS === 100) {
            updatedS++
            updatedMS = 0
        }
        updatedMS++
        setTime({ms: updatedMS, s: updatedS, m: updatedM, h: updatedH})
    }

    const start = () => {
        run()
        setInterv(setInterval(run, 10))
        setStatus(1)
        setHotkey(true)
    }
    const restart = () => {
        clearInterval(interv)
        setStatus(0)
        setTime({ms: 0, s: 0, m: 0, h: 0})
    }
    const stop = () => {
        clearInterval(interv)
        setStatus(2)
    }

    const buttonsConfigs: ButtonsConfigType = {
        0: [
            { text: "Start", callback: start },
            { text: "Reset", callback: restart }
        ],
        1: [
            { text: "Stop", callback: stop},
            { text: "Reset", callback: restart }
        ],
        2: [
            { text: "Resume", callback: start},
            { text: "Reset", callback: restart }
        ]
    };
    const buttons = buttonsConfigs[status].map(({ text, callback }, index) => (<SuperButton callback={callback} key={index}>{text}</SuperButton>));


    useEffect(() => {
        let valueAsString = localStorage.getItem('stopwatchValue')
        if(valueAsString) {
            let valueAsObject = JSON.parse(valueAsString)
            setTime(valueAsObject)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('stopwatchValue', JSON.stringify(time))}, [time]
    )

    const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "space") {
            start()
        } else if (e.code === "KeyR") {
            restart()
        }
    }


    return (
        <div className={s.stopwatch} onKeyDown={onKeyDownHandler}  tabIndex={0}>
            <Display time={time}/>
            <div className={s.buttons}>
            {buttons}
            </div>
            {hotkeys}
        </div>
    );
};

