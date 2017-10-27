import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import IfYesThenFirst from "../IfYesThenFirst";
import Textbox from '../../atoms/Textbox';

const RecordingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => (props.active ? "wheat" : "#f1f1f1")};
  padding: 5px;
  cursor: pointer;
  margin-bottom: 2px;
  padding-left: 15px;
  margin: 5px;
  color: #727e96;
  min-height: 33px;
`;

const RecordingLabel = styled.span``;
const RecordingButton = styled.button`margin-left: 5px;`;
class Recording extends Component {
  constructor() {
    super();
    this.state = {
      isEdit: false
    };
  }

  render() {
    const {
      currentTracker,
      recording,
      playRecording,
      renameRecording,
      removeRecording
    } = this.props;
    return (
      <RecordingContainer>
        {!this.state.isEdit && <RecordingLabel>{recording.name}</RecordingLabel>}
        {this.state.isEdit && (
          <Textbox
            style={{ width: '400px' }}
            inputRef={ele => (this.renameTextbox = ele)}
            placeholder="Name"
            defaultValue={recording.name}
          />
        )}
        <div>
          {!this.state.isEdit && (
            <RecordingButton
              className="btn btn-sm"
              onClick={() => {
                playRecording(currentTracker.id, recording.recordingId);
              }}
            >
              Play
            </RecordingButton>
          )}
          <RecordingButton
            className="btn btn-sm"
            onClick={event => {
              if (this.state.isEdit) {
                renameRecording(
                  recording.recordingId,
                  this.renameTextbox.value
                );
              }

              this.setState({
                isEdit: !this.state.isEdit
              });
            }}
          >
            {this.state.isEdit ? "Save" : "Edit"}
          </RecordingButton>
          <RecordingButton
            className="btn btn-sm"
            onClick={() => {
              currentTracker.removeRecording(recording.recordingId);
            }}
          >
            Delete
          </RecordingButton>
        </div>
      </RecordingContainer>
    );
  }
}

export default observer(Recording);
