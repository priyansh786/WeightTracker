import React from 'react';
import ReactDOM from 'react-dom';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container';
import { postData } from './utils';

export default class WeightLog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wlogs: []
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        console.log('WeightLog=>',form)
        postData('/api/api_basic/wlogs/',{
            weight:form['wlog'].value
        })
        .then(res => {
            console.log(res)
            if(!('weight' in res)) {
                alert(JSON.stringify(res));
            }
            else {
                this.setState(state => {wlogs:[...state.wlogs,res['weight']]});
                alert("Weight Logged In");
            }
        })
    }


    componentDidMount() {
        fetch('/api/api_basic/wlogs')
            .then(res => {
                // console.log(res.status)
                if(res.status!==200) return []
                return res.json()
            })
            .then(res => {
                console.log(res)
                this.setState({wlogs:res})
            })
    }

    componentWillUnmount() {
        // console.log('unmount')
    }


    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="wlog">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="number" placeholder="Enter Weight" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
            </Container>
        )
    }
}


