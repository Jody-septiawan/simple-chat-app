import { useState } from 'react'
import { Container, Row, Col , Card, Form, Button } from'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function Auth({ setAuth, auth }) {

    let history = useHistory()

    if(auth.username){
        history.push('/')
    }

    const [message, setMessage] = useState('')
    const [form, setForm] = useState({ username: '' })

    const { username } = form

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if(username){
            setAuth(form)
            history.push('/')
        }else{
            setMessage('Sign in Failed!')
        }

    }

    return (
        <div className="auth">
            <Container>
                <Row style={{height: '100vh'}} className="d-flex align-items-center justify-content-center">
                    <Col md="4">
                        <Card className="shadow">
                            <Card.Body>
                                <Form onSubmit={handleOnSubmit}>
                                    <div className="h4 text-center mb-5">Sign in | Chat App</div>
                                    {message &&
                                        <div className="alert alert-danger py-1">
                                            {message}
                                        </div>
                                    }
                                    <Form.Group className="mb-4">
                                        <Form.Control type="text" name="username" value={username} onChange={onChange} placeholder="Enter username" />
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" type="submit" size="sm">
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
