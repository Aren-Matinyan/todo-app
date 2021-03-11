import React, {useEffect} from 'react'

import styles from './spinner.module.css'

const Spinner = () => {

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

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