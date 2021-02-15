import React from "react"

import styles from './not-found.module.css'

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h1>404</h1>
            <h4>Page not found</h4>
            <span>The page you are looking for doesn't exist or an other error occurred.</span>
        </div>
    )
}

export default NotFound