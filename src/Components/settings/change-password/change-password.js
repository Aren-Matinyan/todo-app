import React, {useEffect, useState} from 'react'

import {connect} from "react-redux"
import {changePassword} from "../../../store/actions"
import {Button, Form, Modal} from "react-bootstrap"
import styles from './change-password.module.css'

function ChangePassword({onHide, show, changePassword, passwordChangeSuccess}) {

    const [values, setValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const [errors, setErrors] = useState({
        oldPassword: null,
        newPassword: null,
        confirmNewPassword: null
    })

    useEffect(() => {
        if (passwordChangeSuccess) {
            setValues({
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            })
        }
    }, [passwordChangeSuccess])

    const handleSubmit = () => {
        const {oldPassword, newPassword, confirmNewPassword} = values
        let valid = true

        let oldPasswordMessage = null
        let newPasswordMessage = null
        let confirmPasswordMessage = null

        if (!oldPassword.trim()) {
            oldPasswordMessage = 'Old password is required'
            valid = false
        } else if (oldPassword.length < 6) {
            oldPasswordMessage = 'Password must contain at least 6 characters'
            valid = false
        }

        if (!newPassword.trim()) {
            newPasswordMessage = 'Password is required'
            valid = false
        } else if (newPassword.length < 6) {
            newPasswordMessage = 'Password must contain at least 6 characters'
            valid = false
        }

        if (!confirmNewPassword.trim()) {
            confirmPasswordMessage = 'Password confirmation is required'
            valid = false
        } else if (newPassword !== confirmNewPassword) {
            confirmPasswordMessage = 'Passwords didn\'t match'
            valid = false
        }

        setErrors({
            oldPassword: oldPasswordMessage,
            newPassword: newPasswordMessage,
            confirmNewPassword: confirmPasswordMessage
        })

        if (valid) {
            changePassword(values)
        }
    }

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })

        setErrors({
            ...errors,
            [name]: null
        })
    }

    const clearValues = () => {
        setValues({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        })
        setErrors({
            oldPassword: null,
            newPassword: null,
            confirmNewPassword: null
        })
        onHide()
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit()
        }
    }

    const params = [
        {name: 'oldPassword', placeholder: 'Old password'},
        {name: 'newPassword', placeholder: 'New password'},
        {name: 'confirmNewPassword', placeholder: 'Confirm password'},
    ]

    return (
        <Modal show={show}
               onHide={clearValues}
               size="sm"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change password
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {params.map(({name, placeholder}) => {
                    return <Form.Group key={name}>
                        <Form.Control className={errors[name] ? styles.invalid : ''}
                                      type='password'
                                      name={name}
                                      placeholder={placeholder}
                                      value={values[name]}
                                      onKeyPress={handleKeyDown}
                                      onChange={handleChange}/>
                        <Form.Text className="text-danger">
                            {errors[name]}
                        </Form.Text>
                    </Form.Group>
                })}
            </Modal.Body>

            <Modal.Footer>
                <Button variant='success'
                        onClick={handleSubmit}>
                    Change
                </Button>
                <Button variant='primary'
                        onClick={clearValues}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        passwordChangeSuccess: state.passwordChangeSuccess
    }
}

const mapDispatchToProps = {
    changePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)