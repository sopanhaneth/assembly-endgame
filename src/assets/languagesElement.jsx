import { languages } from './languages'
import clsx from 'clsx'

export function LanguagesElement(props) {
  return languages.map((language, index) => {
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color
    }

    const isLost = index < props.wrongGuessCount
    return (
            <span 
                key={language.name} 
                style={styles}
                className={clsx('chip', isLost && 'lost')}
            >
              {language.name}
            </span>
          )
})}
