import React from 'react'

import styles from './spinner.module.css'

const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles.ldsCss}>
                <div className={styles.ldsDoubleRing}>
                    <div/>
                    <div/>
                </div>
            </div>
        </div>
    )
}

export default Spinner;