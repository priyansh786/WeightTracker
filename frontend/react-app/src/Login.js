import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import ReactDOM from 'react-dom';
import { postData } from './utils';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    login = (data) => {
        postData('/api/accounts/login/', data).then(res => {
            if ('error' in res) {
                alert(res.error);
            }
            else {

                console.log('Login=>', res);
                alert("Logged In :)");
                this.props.onLoginCallback(res['username'])
                this.props.history.push('/frontend/home');
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        console.log('Login=>', form)
        const data = {
            username: form['username'].value,
            password: form['password'].value
        }
        this.login(data);
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" />
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


