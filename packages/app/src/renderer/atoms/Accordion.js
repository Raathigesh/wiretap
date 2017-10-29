import React, { Component } from 'react';
import styled from "styled-components";
const Summary = styled.summary`margin-left: 10px`;

export default class Accordion extends Component {
  render() {
    const { children, style } = this.props;
    return (
      <details className="accordion" style={style} open>
        <Summary className="accordion-header">
          <i className="icon icon-arrow-right mr-1"></i>
          { 'Saved Snapshots' }
        </Summary>
        <div className="accordion-body">
          { children }
        </div>
      </details>
    );
  }
}

