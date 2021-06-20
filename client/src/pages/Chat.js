import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import {Container, Row, Col, Form, Button, InputGroup, FormControl, Spinner } from'react-bootstrap';
import {io} from 'socket.io-client'

import dataChat from '../fakeData/chat';

let socket
let interval

export default function Chat({ auth, setAuth }) {
    let history = useHistory()

    const [chat, setChat] = useState(null)
    const [form, setForm] = useState({ username: auth.username, message: '' })

    const { message } = form

    if(!auth.username){
        history.push('/auth')
    }

    const logout = () => {
        setAuth({username: ''})
        history.push('/auth')
    }

    useEffect(()=> {
        socket = io('http://localhost:5000/chat')
        setTimeout(()=>{
            loadMessage()
        },2000)
        return () => {
            socket.disconnect()
        }
    },[])

    const loadMessage = async () => {
        socket.on('message',(data) => {
            setChat(data)
        })
    }

    // if(interval){
    //     clearInterval(interval)
    // }

    setInterval(()=>{
        loadMessage()
    },5000)

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        socket.emit('add message', form)
        setForm({ username: auth.username, message: '' })
    }


    return (
        <div className="chat" style={{minHeight: '100vh'}}> 
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col lg="4">
                        <div className="fixed-top py-1 border-bottom" style={{backgroundColor: '#0096c7'}}>
                            <Container>
                                <Row className="d-flex justify-content-center">
                                    <Col lg="4" className="d-flex align-items-center px-0">
                                        <div className="w-100">
                                            {auth.username}
                                        </div>
                                        <Button size="sm" variant="secondary" onClick={logout}>Logout</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                        <div className="my-5">
                            {chat ? 
                                <>
                                    {chat.map((item)=> (
                                        <div className={`py-2 d-flex ${item.username == auth.username && 'justify-content-end'}`}>
                                            <div style={{backgroundColor: '#00b4d8', maxWidth: '200px'}} className="p-2 rounded">
                                                <div style={{fontSize: '10px', color: '#023e8a'}}>{item.username}</div>
                                                <div style={{lineHeight: 1.2}}>{item.message}</div>
                                            </div>
                                        </div>
                                    ))} 
                                </>
                            : 
                                <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}>
                                    <Spinner animation="border" variant="light" />
                                </div>
                            }

                            
                        </div>

                        <div className="fixed-bottom p-1 pb-2">
                            <Container>
                                <Row className="d-flex justify-content-center">
                                    <Col lg="4" className="px-0">
                                        <Form onSubmit={handleOnSubmit}>
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="Write here ..."
                                                    onChange={onChange}
                                                    value={message}
                                                    name="message"
                                                />
                                                <Button variant="info" id="button-addon2">
                                                Send
                                                </Button>
                                            </InputGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
