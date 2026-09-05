import { languages } from './languages'

const languagesElement = languages.map(language => {
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color
    }
    return (
            <span 
              className='chip'
              key={language.name}
              style={styles}
            >
              {language.name}
            </span>
          )
})

export default languagesElement