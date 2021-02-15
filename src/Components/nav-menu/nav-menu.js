import React from "react"

import {Navbar, Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import styles from './nav-menu.module.css'

const NavMenu = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <NavLink to='/' exact
                     className={styles.header}>
                ToDo List
            </NavLink>
            <Nav>
                <NavLink to='/' exact
                         activeClassName={styles.active}
                         className={styles.navLink}>
                    Home
                </NavLink>
                <NavLink to='/about' exact
                         activeClassName={styles.active}
                         className={styles.navLink}>
                    About us
                </NavLink>
                <NavLink to='/contact' exact
                         activeClassName={styles.active}
                         className={styles.navLink}>
                    Contact us
                </NavLink>
            </Nav>
        </Navbar>
    )
}

export default NavMenu