import React from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';


export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
         
                <Container >
                    <h1 STYLE="text-transform:capitalize;font-family:American Typewriter" >Welcome {this.props.username}</h1>
                </Container>
         
        )
    }
}
