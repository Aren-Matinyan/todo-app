import React from "react"

import {Navbar, Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import styles from './nav-menu.module.css'

const NavMenu = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav>
                <NavLink to='/' exact
                         activeClassName={styles.active}>
                    Home
                </NavLink>
                <NavLink to='/about' exact
                         activeClassName={styles.active}>
                    About us
                </NavLink>
                <NavLink to='/contact' exact
                         activeClassName={styles.active}>
                    Contact us
                </NavLink>
            </Nav>
        </Navbar>
    )
}

export default NavMenu