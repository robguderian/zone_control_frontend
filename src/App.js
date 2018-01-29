import React, { Component } from 'react';
import './App.css';

import {Navbar, Panel, ListGroup, ListGroupItem, Row, Col, Grid} from 'react-bootstrap';

class Zone extends Component {
  render () {
    return (
        <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Zone: {this.props.name}</Panel.Title>
        </Panel.Heading>
        <ListGroup>
          <ListGroupItem>Current temperature: </ListGroupItem>
          <ListGroupItem>Set temperature: </ListGroupItem>
        </ListGroup>
      </Panel>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Home Zone Control
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <p className="App-intro">
          Find your zone!
        </p>
        <div>
          <Grid>
            <Row className="show-grid">
              <Col md={6} mdPush={6}>
                <Zone name="Kitchen" />
              </Col>
              <Col md={6} mdPull={6}>
                <Zone name="Mud Room" />
              </Col>
            </Row>
            <Row className="show-grid">
              <Col md={6} mdPush={6}>
                <Zone name="Some other place" />
              </Col>
              <Col md={6} mdPull={6}>
                &nbsp;
              </Col>
            </Row>

           </Grid>
          
         
          
        </div>
      </div>
    );
  }
}

export default App;
