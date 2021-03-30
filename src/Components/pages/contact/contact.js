import React, {useState, useEffect} from "react"

import {connect} from 'react-redux'
import {sendContactForm} from "../../../store/actions"
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import styles from './contact.module.css'

function Contact({sendContactForm, formSentSuccess}) {
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

    useEffect(() => {
        if (formSentSuccess) {
            setValues({
                name: '',
                email: '',
                message: ''
            })
        }
    }, [formSentSuccess])

    const handleSubmit = () => {
        const {name, email, message} = values
        let valid = true

        let emailMessage = null

        if (!name) {
            valid = false
        }

        if (!message) {
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

        setErrors({
            name: name ? null : 'Name is required',
            email: emailMessage,
            message: message ? null : 'Message is required'
        })

        if (valid) {
            sendContactForm(values)
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
        <div>
            <Container>
                <Row className='justify-content-center mt-5'>
                    <Col xs={12} sm={8} md={6}>
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        formSentSuccess: state.formSentSuccess
    }
}

const mapDispatchToProps = {
    sendContactForm
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)