import React, {useEffect, useState} from "react"

import ChangePassword from "./change-password/change-password"
import {connect} from "react-redux"
import {logout} from "../../store/actions"
import {NavDropdown} from "react-bootstrap"

const Settings = ({user, logout, passwordChangeSuccess}) => {
    const [changePassword, setChangePassword] = useState(false)
    useEffect(() => {
        if (passwordChangeSuccess) {
            setChangePassword(false)
        }
    }, [passwordChangeSuccess])

    return (
        <div>
            <NavDropdown title={user ? <span>{`${user.name} ${user.surname}`}</span> : ''}
                         id="basic-nav-dropdown">
                <NavDropdown.Item>
                    Update info
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => setChangePassword(true)}>
                    Account security
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick={logout}>
                    Sign Out
                </NavDropdown.Item>
            </NavDropdown>
            <ChangePassword show={changePassword}
                            onHide={() => setChangePassword(false)}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        passwordChangeSuccess: state.passwordChangeSuccess
    }
}

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)