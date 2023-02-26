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
  return (
    <div>
       <div>
        <div>
      <Display time={time}/>
      <SuperButton/>
        </div>
       </div>
    </div>
  );
}

export default App;
