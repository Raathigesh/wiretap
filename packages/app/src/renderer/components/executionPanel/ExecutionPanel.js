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
      currentTracker,
      executeAction,
      startRecording,
      stopRecording,
      playRecording,
      isRecording
    } = this.props.trackersStore;

    return (
      <Container>
        <Actions
          tracker={currentTracker}
          actions={currentTracker.actions}
          executeAction={executeAction}
        />
        {currentTracker.isObservable && (
          <Recordings
            currentTracker={currentTracker}
            isRecording={isRecording}
            startRecording={startRecording}
            stopRecording={stopRecording}
            playRecording={playRecording}
            renameRecording={(recordingId, name) =>
              currentTracker.renameRecording(recordingId, name)}
          />
        )}
      </Container>
    );
  }
}

export default observer(ExecutionPanel);
