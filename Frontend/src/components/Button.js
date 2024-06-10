import React from "react";
import { useState, useEffect } from 'react'

function App() {
    const [color, setColor] = useState("white")

    const click = color => {
      setColor(color)
    }
    useEffect(() => {
      document.body.style.backgroundColor = color
    }, [color])

    return (<div className = "App">
      <button onClick = {
        () => click("grey")
      }>Change BG Color</button>
    </div>)
  }
export default App;
