import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import IfYesThenFirst from "../IfYesThenFirst";

const RecordingContainer = styled.div`
  width: 250px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
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
    const { trackerId, recording, playRecording, renameRecording } = this.props;
    return (
      <RecordingContainer>
        {!this.state.isEdit && <RecodingLabel>{recording.name}</RecodingLabel>}
        {this.state.isEdit && (
          <input
            ref={ele => (this.renameTextbox = ele)}
            className="form-input input-sm"
            type="text"
            placeholder="Name"
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
        </div>
      </RecordingContainer>
    );
  }
}

export default observer(Recording);
