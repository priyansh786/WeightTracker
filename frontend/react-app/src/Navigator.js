import React from 'react';
import ReactDOM from 'react-dom';
import { Link,withRouter } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {postData} from './utils'

class Navigator extends React.Component {
    constructor(props) {
        super(props)
    }

    logout = (e) => {
        e.preventDefault();
        postData('/api/accounts/logout/').then(res => {
            console.log('Logout=>', res);
            console.log('props=>',this.props);
            this.props.onLogoutCallback()
            this.props.history.push('/frontend/login');
        })
    }

    render() {
        return (

            <Container>
                <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/frontend/home">WeightTracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/frontend/wlogs/">WeightLog</Nav.Link>{' '}
                            <Nav.Link as={Link} to="/frontend/target/">Target</Nav.Link>
                            <Nav.Link as={Link} to="/frontend/stats/">Statistics</Nav.Link>
                            <Nav.Link as={Link} to="/frontend/whiteboard/">WhiteBoard</Nav.Link>
                        </Nav>
                        <Nav>
                            {
                                this.props.isLoggedIn ?
                                    (
                                        <React.Fragment>
                                            <Nav.Link as={Link} to="/frontend/home/">{this.props.username}</Nav.Link>
                                            <Button onClick={this.logout}>Logout</Button>
                                        </React.Fragment>
                                    )
                                    :
                                    (
                                        <React.Fragment>

                                            <Nav.Link as={Link} to="/frontend/login/">Login</Nav.Link>
                                            <Nav.Link as={Link} to="/frontend/signup/">Signup</Nav.Link>
                                        </React.Fragment>
                                    )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </Container >
        )
    }
}


export default withRouter(Navigator)


