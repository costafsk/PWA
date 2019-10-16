import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Container
} from 'reactstrap';

import logo from './../../img/icon.jpg';
import ReactJson from 'react-json-view';

import Axios from 'axios';

export default class Home extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      username:'',
      github: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.githubCheck = this.githubCheck.bind(this);
  }

  async githubCheck () {
    try {
      const user = await Axios.get(`https://api.github.com/users/${this.state.username}`);

      this.setState({github: user.data});

      this.notify ('Success!')
    } catch (err) {
      this.notify ('Failed!')
    }
  }

  notify (message) {
    toast (message);
  }

  handleChange (event) {
    this.setState({username: event.target.value});
  }

  render () {
    return (
      <Container className="d-flex flex-column align-items-center">
        <ToastContainer />
        <img src={logo} alt="Logo"/>
        <h3 className="text-center font-weight-bold">Join!</h3>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">@</InputGroupAddon>
          <Input placeholder="username" value={this.state.username} onChange={this.handleChange}/>
          <Button color="secondary" onClick={this.githubCheck}>Add</Button>
        </InputGroup>
        <ReactJson src={this.state.github} />
      </Container>
    )
  }

}
