import React, {useEffect, useState} from 'react'

import {connect} from "react-redux"
import {changeInfo, getUser} from "../../../store/actions"
import {Button, Form, Modal} from "react-bootstrap"
import styles from './update-info.module.css'

function UpdateInfo({onHide, show, user, changeInfo, getUser}) {

    const [values, setValues] = useState({
        name: '',
        surname: ''
    })

    const [errors, setErrors] = useState({
        name: null,
        surname: null
    })

    useEffect(() => {
        if (user) {
            setValues({
                name: user.name,
                surname: user.surname
            })
        }
    }, [user])


    const handleSubmit = () => {
        const {name, surname} = values
        let valid = true

        if (!name.trim()) {
            valid = false
        }

        if (!surname.trim()) {
            valid = false
        }

        setErrors({
            name: name.trim() ? null : 'Name is required',
            surname: surname.trim() ? null : 'Surname is required',
        })

        if (valid) {
            changeInfo(values)
            getUser()
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
            name: user.name,
            surname: user.surname
        })
        setErrors({
            name: null,
            surname: null
        })
        onHide()
    }

    const params = [
        {name: 'name', placeholder: 'Name'},
        {name: 'surname', placeholder: 'Surname'}
    ]

    return (
        <Modal show={show}
               onHide={clearValues}
               size="sm"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change info
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {params.map(({name, placeholder}) => {
                    return <Form.Group key={name}>
                        <Form.Control className={errors[name] ? styles.invalid : ''}
                                      type='text'
                                      name={name}
                                      placeholder={placeholder}
                                      value={values[name]}
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
        user: state.user,
        infoChangeSuccess: state.infoChangeSuccess
    }
}

const mapDispatchToProps = {
    changeInfo,
    getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfo)