import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Recording from "./Recording";
import IfYesThenFirst from "../IfYesThenFirst";
import EmptyContent from "../EmptyContent";

const RecordingContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  flex-basis: 50%;
`;

const RecordingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px;
  background-color: #f1f1f1;
  font-size: 16px;
  min-height: 37px;
`;

const RecordingsContent = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 15px;
  background-color: #e6e9ff;
  font-size: 16px;
`;

function Recordings({
  trackerId,
  currentTracker,
  nodeType,
  isRecording,
  recordings,
  startRecording,
  stopRecording,
  playRecording,
  renameRecording,
  removeRecording
}) {
  let title = "It's empty over here";
  let subtitle = "Record new actions by clicking the 'Start Recoding' button";

  if (nodeType !== 1) {
    // mst node
    title = "Not supported";
    subtitle =
      "Mobx does not support recording actions. Record and replay is supported with Mobx state tree.";
  }

  return (
    <RecordingContainer>
      <RecordingsHeader>
        <span>Recordings</span>
        {nodeType === 1 && (
          <button
            className="btn btn-sm"
            onClick={() => {
              if (isRecording) {
                stopRecording(trackerId);
              } else {
                startRecording(trackerId);
              }
            }}
          >
            <IfYesThenFirst condition={isRecording}>
              <span>Stop Recording</span>
              <span>Start Recording</span>
            </IfYesThenFirst>
          </button>
        )}
      </RecordingsHeader>
      <RecordingsContent>
        {recordings.map((recording, index) => {
          return (
            <Recording
              key={index}
              currentTracker={currentTracker}
              trackerId={trackerId}
              recording={recording}
              playRecording={playRecording}
              renameRecording={renameRecording}
              removeRecording={removeRecording}
            />
          );
        })}
      </RecordingsContent>
      {recordings.length === 0 && (
        <EmptyContent title={title} subtitle={subtitle} icon="icon-apps" />
      )}
    </RecordingContainer>
  );
}

export default observer(Recordings);
