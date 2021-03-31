import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Base64 from "./components/Base64"
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <Container>
              <Base64 />
          </Container>
    );
  }
}
