import React from "react"

import {connect} from 'react-redux'
import {Navbar, Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import styles from './nav-menu.module.css'
import {logout} from "../../store/actions"
import Settings from "../settings/settings"

const NavMenu = ({isAuthenticated}) => {
    return (
        <Navbar bg="dark" variant="dark">
            <NavLink to='/' exact
                     className={styles.header}>
                ToDo List
            </NavLink>
            <Nav>
                {isAuthenticated &&
                <NavLink to='/' exact
                         activeClassName={styles.active}
                         className={styles.navLink}>
                    Home
                </NavLink>}
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

                {isAuthenticated && <Settings/>}
            </Nav>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
    }
}

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)