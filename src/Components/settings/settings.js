import React, {useEffect, useState} from "react"

import ChangePassword from "./change-password/change-password"
import UpdateInfo from "./update-info/update-info"
import {connect} from "react-redux"
import {logout} from "../../store/actions"
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Divider from "@material-ui/core/Divider"

const Settings = ({user, logout, passwordChangeSuccess, infoChangeSuccess}) => {
    const [changePassword, setChangePassword] = useState(false)
    const [changeInfo, setChangeInfo] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        if (passwordChangeSuccess) {
            setChangePassword(false)
        }
    }, [passwordChangeSuccess])

    useEffect(() => {
        if (infoChangeSuccess) {
            setChangeInfo(false)
        }
    }, [infoChangeSuccess])

    const updateInfo = () => {
        setAnchorEl(null)
        setChangeInfo(true)
    }

    const updatePassword = () => {
        setAnchorEl(null)
        setChangePassword(true)
    }

    const open = Boolean(anchorEl)
    const handleClick = (event) => {setAnchorEl(event.currentTarget)}
    const handleClose = () => {setAnchorEl(null)}
    const ITEM_HEIGHT = 48

    return (
        <>
            {user ?
                <div>
                    {`${user.name} ${user.surname}`}
                    <IconButton aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                                style={{padding: 0}}>
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu id="long-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                              style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: '20ch'
                              },
                          }}>
                        <MenuItem onClick={updateInfo}>
                            Update info
                        </MenuItem>
                        <MenuItem onClick={updatePassword}>
                            Account security
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={logout}>
                            Sign Out
                        </MenuItem>
                    </Menu>
                </div>
                : null}
            <ChangePassword show={changePassword}
                            onHide={() => setChangePassword(false)}/>
            <UpdateInfo show={changeInfo}
                        onHide={() => setChangeInfo(false)}/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        passwordChangeSuccess: state.passwordChangeSuccess,
        infoChangeSuccess: state.infoChangeSuccess
    }
}

const mapDispatchToProps =
    {
        logout
    }

export default connect(mapStateToProps, mapDispatchToProps)(Settings)