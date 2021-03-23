import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import ReactDOM from 'react-dom';
import { postData } from './utils';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    }

    signup = (data) => {
        postData('/api/accounts/signup/', data)
            .then(res => {
                console.log('Signup=>', res);
                if ('error' in res) {
                    alert(res.error);
                }
                else {
                    this.props.onLoginCallback(res['username'])
                    this.props.history.push('/frontend/home');
                }
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        console.log('Signup=>', form)
        const data = {
            username: form['username'].value,
            email: form['email'].value,
            password: form['password'].value
        }
        this.signup(data);
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}


