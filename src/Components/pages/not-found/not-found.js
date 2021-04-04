import React from "react"

import {history} from "../../../helpers/history"
import {Button} from "react-bootstrap"
import notFound from '../../../assets/notFound.png'
import styles from './not-found.module.css'

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <img src={notFound} alt="githubLogo"/>
            <h1>404</h1>
            <h4>Page not found</h4>
            <h6>The page you are looking for doesn't exist or an other error occurred.</h6>
            <br/>
            <Button onClick={() => history.push('/')} variant='secondary'>
                Go to home page
            </Button>
        </div>
    )
}

export default NotFound