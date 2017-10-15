import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Actions from "./Actions";
import Recordings from "./Recordings";

const Container = styled.div`
  display: flex;
  height: 300px;
  flex-direction: row;
  padding-left: 0;
  padding-right: 0;
  background-color: #fbfbfb;
`;
class ExecutionPanel extends Component {
  render() {
    const {
      tracker,
      executeAction,
      startRecording,
      stopRecording,
      playRecording,
      isRecording,
      renameRecording
    } = this.props;
    return (
      <Container>
        <Actions
          tracker={tracker}
          actions={tracker.actions}
          executeAction={executeAction}
        />
        {tracker.nodeType !== 2 && (
          <Recordings
            trackerId={tracker.id}
            nodeType={tracker.nodeType}
            isRecording={isRecording}
            recordings={tracker.recordings}
            startRecording={startRecording}
            stopRecording={stopRecording}
            playRecording={playRecording}
            renameRecording={renameRecording}
          />
        )}
      </Container>
    );
  }
}

export default observer(ExecutionPanel);
