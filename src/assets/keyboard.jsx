import clsx from "clsx"
export default function Keyboard(props) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

    function handleClick(letter) {
        props.setGuessedLetters(prev =>
            prev.includes(letter) ? prev : [...prev, letter]
        )
    }
// OR props.isGameOver ? null : which makes the keyboard disappears 
    return alphabet.map(letter => {
        const isGuessed = props.guessedLetters.includes(letter)
        const isCorrect = isGuessed && props.currentWord.toLowerCase().includes(letter)
        const isWrong = isGuessed && !props.currentWord.toLowerCase().includes(letter)

        return (
            <button
                key={letter}
                className={clsx("keyboard-button", {
                    correct: isCorrect,
                    wrong: isWrong
                })}
                disabled={props.isGameOver}
                aria-disabled={props.guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={() => handleClick(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })
}