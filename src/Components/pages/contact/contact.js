import React, {useState} from "react"

import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import styles from './contact.module.css'

const Contact = () => {
    const requiredErrorMessage = 'Field is required'

    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    })

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
    })

    const handleChange = ({target: {name, value}}) => {
        if (!value) {
            setErrors({
                ...errors,
                [name]: requiredErrorMessage
            })
        } else {
            setErrors({
                ...errors,
                [name]: null
            })
        }

        if (name === 'email' && value) {
            const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
            if (!emailReg.test(value)) {
                setErrors({
                    ...errors,
                    email: 'Invalid email'
                })
            }
        }

        setValues({
            ...values,
            [name]: value.trim()
        })
    }

    const handleSubmit = () => {
        const errorsArr = Object.values(errors)
        const errorsExist = !errorsArr.every(el => el === null)

        const valuesArr = Object.values(values)
        const valuesExist = !valuesArr.some(el => el === '')

        if (valuesExist && !errorsExist) {
            fetch('http://localhost:3001/form', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(async (response) => {
                    const res = await response.json()
                    if (response.status >= 400 && response.status < 600) {
                        if (res.error) {
                            throw res.error
                        } else {
                            throw new Error('Something went wrong!!!')
                        }
                    }
                    console.log("Form sent successfully")
                    setValues({
                        name: '',
                        email: '',
                        message: ''
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            return
        }

        if (!valuesExist && !errorsExist) {
            setErrors({
                name: requiredErrorMessage,
                email: requiredErrorMessage,
                message: requiredErrorMessage
            })
        }
    }

    return (
        <Container>
            <Row className='justify-content-center mt-5'>
                <Col xs={7}>
                    <Form>
                        <h2 className='text-center'>Contact us</h2>
                        <Form.Group>
                            <Form.Control className={errors.name ? styles.invalid : ''}
                                          type="text"
                                          placeholder="Enter your name"
                                          name='name'
                                          value={values.name}
                                          onChange={handleChange}/>
                            <Form.Text className="text-danger">
                                {errors.name}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control className={errors.email ? styles.invalid : ''}
                                          type="email"
                                          placeholder="Enter email"
                                          name='email'
                                          value={values.email}
                                          onChange={handleChange}/>
                            <Form.Text className="text-danger">
                                {errors.email}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control className={errors.message ? styles.invalid : ''}
                                          as="textarea"
                                          rows={4}
                                          placeholder="Enter your message"
                                          name='message'
                                          value={values.message}
                                          onChange={handleChange}/>
                            <Form.Text className="text-danger">
                                {errors.message}
                            </Form.Text>
                        </Form.Group>
                        <div className='text-center'>
                            <Button variant="outline-primary"
                                    className={styles.submitButton}
                                    onClick={handleSubmit}>
                                Send
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact