import React from "react"

import {connect} from 'react-redux'
import {Navbar, Nav, Button} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import styles from './nav-menu.module.css'
import {logout} from "../../store/actions"

const NavMenu = ({isAuthenticated, user, logout}) => {
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

                {isAuthenticated &&
                <Button onClick={logout}>
                    Log Out
                </Button>
                }

                {user ? <span>{`${user.name} ${user.surname}`}</span> : null}

            </Nav>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
        user: state.user
    }
}

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)