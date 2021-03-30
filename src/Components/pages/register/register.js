import React, {useState} from 'react'

import {connect} from 'react-redux'
import {register} from "../../../store/actions"
import {Link} from 'react-router-dom'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import styles from './register.module.css'

function Register({register}) {
    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null
    })

    const handleSubmit = () => {
        const {name, surname, email, password, confirmPassword} = values
        let valid = true

        let emailMessage = null
        let passwordMessage = null
        let confirmPasswordMessage = null

        if (!name) {
            valid = false
        }

        if (!surname) {
            valid = false
        }

        const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!email) {
            emailMessage = 'Email is required'
            valid = false
        } else if (!emailReg.test(email)) {
            emailMessage = 'Invalid email'
            valid = false
        }

        if (!password) {
            passwordMessage = 'Password is required'
            valid = false
        } else if (password.length < 6) {
            passwordMessage = 'Password must contain at least 6 characters'
            valid = false
        }

        if (!confirmPassword) {
            confirmPasswordMessage = 'Password confirmation is required'
            valid = false
        } else if (password !== confirmPassword) {
            confirmPasswordMessage = "Passwords didn't match"
            valid = false
        }

        setErrors({
            name: name ? null : 'Name is required',
            surname: surname ? null : 'Surname is required',
            email: emailMessage,
            password: passwordMessage,
            confirmPassword: confirmPasswordMessage
        })

        if (valid) {
            register(values)
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

    const params = [
        {name: 'name', type: 'text', placeholder: 'Enter your name'},
        {name: 'surname', type: 'text', placeholder: 'Enter your surname'},
        {name: 'email', type: 'email', placeholder: 'Enter email'},
        {name: 'password', type: 'password', placeholder: 'Password'},
        {name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password'},
    ]

    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.header}>Sign Up</h3>
                            <h6 className={styles.message}>Create your account. It's free and only takes a minute.</h6>

                            {params.map(({name, type, placeholder}) => {
                                return <Form.Group key={name}>
                                    <Form.Control className={errors[name] ? styles.invalid : ''}
                                                  type={type}
                                                  name={name}
                                                  placeholder={placeholder}
                                                  value={values[name]}
                                                  onChange={handleChange}/>
                                    <Form.Text className="text-danger">
                                        {errors[name]}
                                    </Form.Text>
                                </Form.Group>
                            })}

                            <Button variant="primary"
                                    className={styles.submitButton}
                                    onClick={handleSubmit}>
                                Register Now
                            </Button>
                            <h6 className={styles.signIn}>Already have an account? <Link to='/login'>Sign in</Link></h6>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapDispatchToProps = {
    register
}

export default connect(null, mapDispatchToProps)(Register)
