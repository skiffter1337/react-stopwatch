import React, {useState} from 'react';
import './App.css';
import {Display} from "./Components/Display";
import {SuperButton} from "./Components/SuperButton";


export type TimeType = {
    ms: number
    s: number
    m: number
    h: number
}

function App() {

    const [time, setTime] = useState<TimeType>({ms: 0, s: 0, m: 0, h: 0})

    let updatedH = time.h, updatedM = time.m, updatedS = time.s, updatedMS = time.ms

    const start = () => {
        run()
        setInterval(run, 10)
    }

    const run = () => {
        if(updatedM === 60) {
            updatedH++
            updatedM = 0
        }
        if(updatedS === 60) {
            updatedM++
            updatedS = 0
        }
        if(updatedMS === 100) {
            updatedS++
            updatedMS = 0
        }
        updatedMS++
        return  setTime({ms: updatedMS, s: updatedS, m: updatedM, h: updatedH})
    }
    return (
        <div>
            <div>
                <div>
                    <Display time={time}/>
                    <SuperButton callback={start}>Start</SuperButton>
                </div>
            </div>
        </div>
    );
}

export default App;
