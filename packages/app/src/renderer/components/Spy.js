import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { observer } from "mobx-react";
import JSONTree from "react-json-view";

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 2;
`;

const TraceContainer = styled.div`
  overflow: auto;
  padding: 20px;
`;

class Spy extends Component {
  constructor() {
    super();
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.bottomEle);
    node.scrollIntoView({ behavior: "smooth" });
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    const { spyTrace } = this.props;
    return (
      <ContentContainer className="card">
        <div className="card-header">
          <div className="card-title h5">Spy Log</div>
        </div>
        <TraceContainer>
          {spyTrace.map(item => {
            return (
              <div className="card">
                <div className="card-header">
                  <div className="card-subtitle text-gray">{item.name}</div>
                </div>
                <div className="card-body">
                  <JSONTree
                    src={item.data}
                    collapsed={true}
                    enableClipboard={false}
                    displayObjectSize={false}
                  />
                </div>
              </div>
            );
          })}
          <div ref={ele => (this.bottomEle = ele)} />
        </TraceContainer>
      </ContentContainer>
    );
  }
}

export default observer(Spy);
