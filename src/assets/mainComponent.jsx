import { useState } from 'react'
import { LanguagesElement } from './languagesElement.jsx'
import Keyboard from './keyboard'
import { languages } from './languages'
import clsx from 'clsx'
import { getFarewellText, getRandomWord } from './utils.js'
import Confetti from 'react-confetti'

export default function Main() {

    const [currentWord, setCurrentWord] = useState(() => getRandomWord()) // lazy state function to let react ignores this function when we rerender to avoid extra operation

    const [guessedLetters, setGuessedLetters] = useState([])

    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.toLowerCase().includes(letter)).length

    const isGameWon = currentWord.toLowerCase().split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost
    const displayFarewellMessages =  wrongGuessCount > 0 && !isGameOver ? getFarewellText(languages[wrongGuessCount - 1].name) : ""

    const displayWord = currentWord.split("").map((letter, index) => {

        const letterClassName = clsx("letter",
            isGameLost && !guessedLetters.includes(letter) && "missed-letter" // same syntax as objects way 
        )
        return (
        <span key={index} className={letterClassName}>
                {guessedLetters.includes(letter.toLowerCase()) || isGameLost ? letter.toUpperCase() : ""}
        </span>
        )
    })
    
    function resetGame() {
        setCurrentWord(getRandomWord()) 
        setGuessedLetters([])
    }
    return (
        
        <main>
            { isGameWon &&
                <Confetti 
                    recycle={false}
                    numberOfPieces={1000}
                />
            }
            <header className='header'>
                <h1>Assembly Endgame</h1>
                <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
            </header>

            <section 
                aria-live="polite" // role="status" already gives the element an implicit polite live-region behavior.
                role="status"
            className={clsx("status", {
                won: isGameWon,
                lose: isGameLost,
                displayFarewellMessages: displayFarewellMessages
            })}
            >
                <h2 className="farewell"> 
                    {wrongGuessCount > 0 && !isGameOver ? displayFarewellMessages : ""}
                </h2>
                <h2>
                    {isGameWon ? "YOU WIN!" : isGameOver ? "GAME OVER!" : ""}
                </h2>
                <p>
                    {isGameWon ? "Well done" : isGameLost ? "You lose! Better Start Learning Assembly" : ""}
                </p>
            </section>

            {/* Combined visually-hidden aria-live region for status updates. */}
            <section 
                className="sr-only"
                aria-live="polite"
                role="status"
            >
                <p>
                    {
                        currentWord.includes(guessedLetters[guessedLetters.length - 1]) ? 
                        `Correct! The letter ${guessedLetters[guessedLetters.length - 1]} is in the word.` :
                        `Wrong! The letter ${guessedLetters[guessedLetters.length - 1]} is not in the word.`
                    }
                    You have {languages.length - 1 - wrongGuessCount} attempts left.
                </p>
                <p>
                    Current Word : {currentWord.split("").map(letter => guessedLetters.includes(letter) ? letter + "." : "blank.").join(" ")} 
                    {/* adding . gives extra pause. */}
                </p>
            </section>

            <div className="languages-list">
                <LanguagesElement
                    wrongGuessCount={wrongGuessCount}
                />
            </div>

            <div className="word-display">
                {displayWord}
            </div>

            <div className="keyboard-container">
                <Keyboard 
                    currentWord={currentWord}
                    guessedLetters={guessedLetters}
                    setGuessedLetters={setGuessedLetters}
                    isGameOver={isGameOver}
                />
            </div>

            <section>
               {isGameOver && 
                    <button 
                        className="game-button"
                        onClick={resetGame}
                    >
                        New Game
                    </button>
               }
            </section>
        </main>
    )
}










