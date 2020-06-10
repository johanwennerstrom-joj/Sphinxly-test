import React, { useState, useEffect, useRef } from 'react'
import './main.css'

const App = () => {
    //state
    const [ref, setRef] = useState('')
    const [name, setName] = useState()
    const [clicked, setClicked] = useState(false)
    const [display, setDisplay] = useState(true)
    const [greet, setGreet] = useState('')
    // Ref hook
    const input = useRef(null)

    // Math for randomizing image
    const math = Math.floor(Math.random() * 30)

    // Fetch from picsum api
    const getImg = async () => {
        const response = await fetch(
            `https://cors-anywhere.herokuapp.com/https://picsum.photos/id/${math}/info/`
        )
        response.json().then((res) => setRef(res.download_url))
    }

    // Timeout function to hide text after display
    const timeoutDisplay = () => {
        const timer = setTimeout(() => {
            setDisplay(!display)
        }, 4000)
        return () => clearTimeout(timer)
    }

    // UseEffect hook
    useEffect(() => {
        getImg()
        localStorage.setItem('prevVisitors', ['Hejpa', 'Dejpa'])
        setName(localStorage.getItem('presetName'))
        if (localStorage.presetName) {
            timeoutDisplay()
            setGreet('back')
        }
    }, [])

    // Click and change handler to process input and click
    const handleChange = () => {
        setName(input.current.value)
    }
    const handleClick = () => {
        setClicked(!clicked)
        localStorage.setItem('presetName', name)
        timeoutDisplay()
    }

    // JSX
    return (
        <div className="App">
            {!ref ? (
                <div className="loading__wrap">
                    {' '}
                    <h3 className="loading">Loading</h3>
                </div>
            ) : (
                <main>
                    <div className="top__section">
                        <img src={ref} alt="pic" height="500" width="800" />
                    </div>
                    <div className="middle__section">
                        {!clicked && localStorage.presetName === undefined ? (
                            <div className="input__wrap">
                                <label id="name__input">
                                    Please enter your name
                                </label>
                                <input
                                    id="name__input"
                                    type="text"
                                    onChange={handleChange}
                                    ref={input}
                                />
                                <button onClick={handleClick}>
                                    Press to save
                                </button>
                            </div>
                        ) : null}
                    </div>

                    <div className="bottom__section">
                        {!display ? null : (
                            <h2>
                                {localStorage.presetName || clicked
                                    ? `Welcome ${greet} ${name}! 😊`
                                    : null}
                            </h2>
                        )}
                    </div>
                </main>
            )}
        </div>
    )
}

export default App
