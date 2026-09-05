const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const keyboardElement = alphabet.map((letter, index) => {
    return (
        <button
            key={index}
            className={"keyboard-button"}
        >
            {letter.toUpperCase()}
        </button>
    )
})

export default keyboardElement;