import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { observer } from "mobx-react";
import LogEntry from "./LogEntry";

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 2;
`;

const TraceContainer = styled.div`overflow: auto;`;

class Spy extends Component {
  render() {
    const { spyTrace } = this.props;
    return (
      <ContentContainer className="card">
        <div className="card-header">
          <div className="card-title h5">Spy Log</div>
          <div className="card-subtitle text-gray">
            Changes made to the object
          </div>
        </div>
        <TraceContainer>
          {spyTrace.map(item => {
            return <LogEntry description={item} />;
          })}
        </TraceContainer>
      </ContentContainer>
    );
  }
}

export default observer(Spy);
