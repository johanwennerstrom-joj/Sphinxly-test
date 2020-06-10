import React, { useState, useEffect, useRef } from 'react'
import './app.css'

const App = () => {
    const [ref, setRef] = useState('')
    const [name, setName] = useState()
    const [clicked, setClicked] = useState(false)
    const [display, setDisplay] = useState(true)
    const [greet, setGreet] = useState('')
    const input = useRef(null)

    const math = Math.floor(Math.random() * 30)

    const getImg = async () => {
        const response = await fetch(
            `https://cors-anywhere.herokuapp.com/https://picsum.photos/id/${math}/info/`
        )
        response.json().then((res) => setRef(res.download_url))
    }
    const timeoutDisplay = () => {
        const timer = setTimeout(() => {
            setDisplay(!display)
        }, 4000)
        return () => clearTimeout(timer)
    }

    useEffect(() => {
        getImg()
        localStorage.setItem('prevVisitors', ['Hejpa', 'Dejpa'])
        setName(localStorage.getItem('presetName'))
        if (localStorage.presetName) {
            timeoutDisplay()
            setGreet('back')
        }
    }, [])

    const handleChange = () => {
        setName(input.current.value)
    }
    const handleClick = () => {
        setClicked(!clicked)
        localStorage.setItem('presetName', name)
        timeoutDisplay()
    }

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
