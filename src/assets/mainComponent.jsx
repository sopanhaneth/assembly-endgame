import languagesElement from './languagesElement'
import { useState } from 'react'
import keyboard from './keyboard'

export default function Main() {

    const [currentWord, setCurrentWord] = useState('react')

    const displayWord = currentWord.split("").map((letter, index) => 
        <span 
            key={index} className="letter"
        >
            {letter.toUpperCase()}
        </span>
    )

    return (
        <main>
            <header className='header'>
                <h1>Assembly Endgame</h1>
                <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
            </header>

            <section className="status">
                <h2>YOU WIN!</h2>

                <p>WELL DONE</p>
            </section>

            <div className="languages-list">
                {languagesElement}
            </div>

            <div className="word-display">
                {displayWord}
            </div>

            <div className="keyboard-container">
                {keyboard}
            </div>

            <footer>
                <button className="new-game-button">New Game</button>
            </footer>
        </main>
    )
}






