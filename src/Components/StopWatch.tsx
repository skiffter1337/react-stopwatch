import React, {useState} from 'react';
import {Display} from "./Display";
import {SuperButton} from "./SuperButton";

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
}

export const StopWatch = () => {

    const [time, setTime] = useState<TimeType>({ms: 0, s: 0, m: 0, h: 0})
    const [status, setStatus] = useState(0)
    const [interv, setInterv] = useState(setInterval(() => {
    }, 10))

    let updatedH = time.h, updatedM = time.m, updatedS = time.s, updatedMS = time.ms

    const start = () => {
        run()
        setInterv(setInterval(run, 10))
        setStatus(1)
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

    const buttonsConfigs: ButtonsConfigType = {
        0: [
            { text: "Start", callback: start },
            { text: "Reset", callback: restart }
        ],
        1: [
            { text: "Stop", callback: stop },
            { text: "Reset", callback: restart }
        ],
        2: [
            { text: "Resume", callback: stop },
            { text: "Reset", callback: restart }
        ]
    };

    const buttons = buttonsConfigs[status].map(({ text, callback }) => (
        <SuperButton callback={callback}>{text}</SuperButton>
    ));

    return (
        <div>
            <Display time={time}/>
            {buttons}
        </div>
    );
};

