import React from "react"

import {Container, Row, Col} from "react-bootstrap"

const About = () => {

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={12} lg={8}>
                    <h2 className='text-center mt-3'>The project</h2>
                    <h5 className='text-center'
                        style={{color: 'grey'}}>
                        Hi, my name is Aren. This is my final project at BitSchool. This project uses technologies such
                        as React, Redux, Bootstrap, Material UI, CSS.
                        In this application, you can register, add tasks to be done, mark a deadline, edit and delete
                        tasks, delete all or only marked tasks, filter by status, by creation date, sort tasks and...
                        You can find the source code of this application <a
                        href="https://github.com/Aren-Matinyan/todo-app" target='_blank' rel="noreferrer">here</a>.
                        I hope you will enjoy.
                    </h5>
                </Col>
            </Row>
        </Container>
    )
}

export default About