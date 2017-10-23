import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import IfYesThenFirst from "../IfYesThenFirst";

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

const RecodingLabel = styled.span``;
const RecodingButton = styled.button`margin-left: 5px;`;

class Recording extends Component {
  constructor() {
    super();
    this.state = {
      isEdit: false
    };
  }

  render() {
    const {
      trackerId,
      currentTracker,
      recording,
      playRecording,
      renameRecording,
      removeRecording
    } = this.props;
    return (
      <RecordingContainer>
        {!this.state.isEdit && <RecodingLabel>{recording.name}</RecodingLabel>}
        {this.state.isEdit && (
          <input
            ref={ele => (this.renameTextbox = ele)}
            className="form-input input-sm"
            type="text"
            placeholder="Name"
            defaultValue={recording.name}
          />
        )}
        <div>
          {!this.state.isEdit && (
            <RecodingButton
              className="btn btn-sm"
              onClick={() => {
                playRecording(trackerId, recording.recordingId);
              }}
            >
              Play
            </RecodingButton>
          )}
          <RecodingButton
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
          </RecodingButton>
          <RecodingButton
            className="btn btn-sm"
            onClick={() => {
              currentTracker.removeRecording(recording.recordingId);
            }}
          >
            Delete
          </RecodingButton>
        </div>
      </RecordingContainer>
    );
  }
}

export default observer(Recording);
