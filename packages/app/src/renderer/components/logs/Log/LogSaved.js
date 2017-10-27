import React, { Component } from "react";
import JSONTree from "react-json-view";
import { observer } from "mobx-react";
import styled from "styled-components";
import Textbox from '../../../atoms/Textbox';
import {
  CardContainer,
  ToggleHandler,
  CardHeader,
  CardTitle
} from './style';


class Log extends Component {

  editName = () => {
    const { trackersStore, log } = this.props;
    const { isEditing } = this.state || {};
    if (isEditing) trackersStore.renameSavedSnapshot(log.id, this.textbox.value);
    this.setState({
      isEditing: !isEditing
    });
  }

  setTextbox = element => {
    this.textbox = element;
  }

  render() {
    const { title, log, tracker, trackersStore, isSaved } = this.props;
    const { isEditing } = this.state || {};
    const subLabelText = log.isExpanded ? "Collapse" : "Expand";
    const isSnapshot = tracker.selectedTab === 2;
    return (
      <CardContainer className="card">
        <CardHeader>
          <CardTitle className="card-title">
            { isEditing &&
              <Textbox
                style={{ width: '200px' }}
                inputRef={this.setTextbox}
                placeholder="Name"
                defaultValue={title}
              />
            }
            { !isEditing && title }
          </CardTitle>
          <ToggleHandler
            className="btn btn-sm"
            onClick={() => {
              log.isExpanded = !log.isExpanded;
            }}
          >
            {subLabelText}
          </ToggleHandler>
          <ToggleHandler
            className="btn btn-sm"
            onClick={() => {
              trackersStore.applySnapshot(tracker.id, log.value);
            }}
          >
            Apply
          </ToggleHandler>
          <ToggleHandler
            className="btn btn-sm"
            onClick={() => trackersStore.removeSavedSnapshot(log.id) }
          >
            Remove
          </ToggleHandler>
          <ToggleHandler
            className="btn btn-sm"
            onClick={this.editName}
          >
            { isEditing ? 'Save' : 'Edit' }
          </ToggleHandler>
        </CardHeader>
        {log.isExpanded && (
          <div className="card-body">
            <JSONTree src={log.value} />
          </div>
        )}
      </CardContainer>
    );
  }
}

export default observer(Log);
