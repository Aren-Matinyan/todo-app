import React, {memo} from "react"

import githubLogo from '../../assets/github.png'
import linkedinLogo from '../../assets/linkedin.png'

import styles from './footer.module.css'

const Footer = () => {

    return (
        <div className={styles.footer}>
            <a href="https://github.com/Aren-Matinyan"
               target={'_blank'} rel="noreferrer">
                <img src={githubLogo} alt="githubLogo"
                     className={styles.logo}/>
            </a>
            <a href="https://www.linkedin.com/in/aren-matinyan-9a6140195/"
               target={'_blank'} rel="noreferrer">
                <img src={linkedinLogo} alt="linkedinLogo"
                     className={styles.logo}/>
            </a>
        </div>
    )
}

export default memo(Footer)