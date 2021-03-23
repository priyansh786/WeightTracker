import React from 'react';
import ReactDOM from 'react-dom';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container';
import { postData } from './utils';

export default class Target extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            target: null
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        console.log('Target=>', form)
        postData('/api/api_basic/tw/', {
            weight: form['target'].value
        })
            .then(res => {
                console.log(res)
                if (!('weight' in res)) {
                    alert(JSON.stringify(res));
                }
                else {
                    this.setState({target:res['weight']});
                }
            })
    }


    componentDidMount() {
        fetch('/api/api_basic/tw')
            .then(res => {
                // console.log(res.status)
                if (res.status === 400) return { target: 0 }
                if (res.status === 203) return res.json()
                return res.json()
            })
            .then(res => {
                console.log(res)
                if (!("weight" in res)) {
                    console.log(JSON.stringify(res))
                }
                else {
                    this.setState({ target: res['weight'] })
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
                    <Form.Group controlId="target">
                        <Form.Label>Target</Form.Label>
                        <Form.Control type="number" placeholder="Enter Target Weight" defaultValue={this.state.target} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                </Button>
                </Form>
            </Container>
        )
    }
}


