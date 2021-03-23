import React from 'react';
import ReactDOM from 'react-dom';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container';
import { postData } from './utils';

export default class WhiteBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        console.log('Whiteboard=>', form)
        postData('/api/api_basic/wb/', {
            text: form['text'].value
        })
            .then(res => {
                console.log(res)
                if (!('text' in res)) {
                    alert(JSON.stringify(res));
                }
                else {
                    this.setState({text:res['text']});
                }
            })
    }


    componentDidMount() {
        fetch('/api/api_basic/wb')
            .then(res => {
                // console.log(res.status)
                if (res.status === 400) return { text: "" }
                if (res.status === 203) return res.json()
                return res.json()
            })
            .then(res => {
                console.log(res)
                if (!("text" in res)) {
                    console.log(JSON.stringify(res))
                }
                else {
                    this.setState({ text: res['text'] })
                }
            })
    }

    componentWillUnmount() {
        // console.log('unmount')
    }


    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="text">
                        <Form.Label>WhiteBoard</Form.Label>
                        <Form.Control as="textarea" row={10} placeholder="Your Whiteboard" defaultValue={this.state.text} color="pink" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                </Button>
                </Form>
            </Container>
        )
    }
}


