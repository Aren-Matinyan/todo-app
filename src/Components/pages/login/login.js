import React, {useState} from 'react'

import {login} from "../../../store/actions"
import {connect} from "react-redux"
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import styles from './login.module.css'

function Login(props) {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        email: null,
        password: null
    })

    const handleSubmit = () => {
        const {email, password} = values

        setErrors({
            email: email ? null : 'Email is required',
            password: password ? null : 'Password is required'
        })

        if (email && password) {
            props.login(values)
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

    return (
        <div className={styles.main}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.heading}>Log In</h3>
                            <Form.Group>
                                <Form.Control className={errors.email ? styles.invalid : ''}
                                              type="email"
                                              name="email"
                                              placeholder="Enter email"
                                              value={values.email}
                                              onChange={handleChange}/>
                                <Form.Text className="text-danger">
                                    {errors.email}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control className={errors.password ? styles.invalid : ''}
                                              type="password"
                                              placeholder="Password"
                                              value={values.password}
                                              onChange={handleChange}
                                              name="password"/>
                                <Form.Text className="text-danger">
                                    {errors.password}
                                </Form.Text>
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="primary"
                                        onClick={handleSubmit}
                                        className={styles.loginButton}>
                                    Log In
                                </Button>
                                <Button variant="success"
                                        onClick={() => props.history.push('/register')}
                                        className={styles.registerButton}>
                                    Create New Account
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(Login)
