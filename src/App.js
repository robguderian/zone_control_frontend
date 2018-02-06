import React, { Component } from 'react';
import './App.css';

import {Button, Navbar, Panel, ListGroup, ListGroupItem, Row, Col, Grid, Form, FormGroup, FormControl} from 'react-bootstrap';

class Zone extends Component {

  constructor(props) {
    super(props);
    this.upClick = this.upClick.bind(this);
    this.downClick = this.downClick.bind(this);
    this.postValue = this.postValue.bind(this);
    this.getUpdate = this.getUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {"actual": -1}
  }
  
  componentWillMount() {
    // fetch the data
    this.getUpdate();
  }


  getUpdate() {
    fetch('/zones/' + this.props.name)
    .then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    })
    .then(function(data) { 
      this.currTemp.value = data.setting;
      this.setState({"actual": data.current})
    }.bind(this))
    .catch(function(error) { console.log(error); });
   

    // get the next update
    // wait 60 s
    setTimeout(this.getUpdate, 60000);
  }

  handleChange() {
    // push up change
    // TODO - wait for all the results to change
    // do a wait, see if there is any more changes coming, to avoid
    // too many posts
    this.pushUpdate(this.currTemp.value);
  }

  pushUpdate(newValue) {
    fetch('/zones/' + this.props.name + '/' + newValue,
      {method: 'POST'}
    );
    // care about result?
  }

  upClick() {
    this.currTemp.value = Math.round(parseFloat(this.currTemp.value) * 10 + 1) / 10;
    this.pushUpdate(this.currTemp.value);
  }

  downClick() {
    this.currTemp.value =  Math.round(parseFloat(this.currTemp.value) * 10 - 1) / 10;
    this.pushUpdate(this.currTemp.value);
  }

  postValue(newValue) {
    fetch('/zones/' + this.props.name + '/' + newValue);
  }

  render () {
    return (
        <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Zone: {this.props.name}</Panel.Title>
        </Panel.Heading>
        <ListGroup>
          <ListGroupItem>Current temperature: <b>{this.state.actual}</b></ListGroupItem>
          <ListGroupItem>Set temperature:
            <Form inline>
              <FormGroup controlId={this.props.name}>
                <Button onClick={this.upClick}><span className="glyphicon glyphicon-chevron-up"> </span></Button>
                <Col><FormControl inputRef={ref => { this.currTemp = ref; }}  type="number" onChange={this.handleChange} /></Col>
                <Button onClick={this.downClick}><span className="glyphicon glyphicon-chevron-down"> </span></Button>
              </FormGroup>
            </Form>
          </ListGroupItem>
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
              <Col md={6}>
                <Zone name="Kitchen" />
              </Col>
              <Col md={6}>
                <Zone name="Mud Room" />
              </Col>
            </Row>
            <Row className="show-grid">
              <Col md={6}>
                <Zone name="Ensuite" />
              </Col>
              <Col md={6}>
                &nbsp;
              </Col>
            </Row>
            <Row className="show-grid">
              <Col md={6}>
                <Zone name="Garage" />
              </Col>
              <Col md={6}>
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
