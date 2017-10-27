import React, { Component } from "react";
import JSONTree from "react-json-view";
import { observer } from "mobx-react";
import {
  CardContainer,
  ToggleHandler,
  CardHeader,
  CardTitle,
  Order
} from './style';

function Log({ order, title, log, tracker, trackersStore }) {
  const {} = this.props;
  const subLabelText = log.isExpanded ? "Collapse" : "Expand";
  const isSnapshot = tracker.selectedTab === 2;
  return (
    <CardContainer
      isSnapshot={isSnapshot}
      className="card"
    >
      <CardHeader>
        <CardTitle className="card-title">
          { order &&
            <Order>{order}</Order>
          }
          {title}
        </CardTitle>
        <ToggleHandler
          className="btn btn-sm"
          onClick={() => {
            log.isExpanded = !log.isExpanded;
          }}
        >
          {subLabelText}
        </ToggleHandler>
        {trackersStore.applySnapshot && (
          <ToggleHandler
            className="btn btn-sm"
            onClick={() => {
              trackersStore.applySnapshot(tracker.id, log.value);
            }}
          >
            Apply
          </ToggleHandler>
        )}
        {isSnapshot && trackersStore.saveSnapshot && (
          <ToggleHandler
            className="btn btn-sm"
            onClick={() => {
              trackersStore.saveSnapshot(tracker.id, log.value);
            }}
          >
            Save
          </ToggleHandler>
        )}
      </CardHeader>
      {log.isExpanded && (
        <div className="card-body">
          <JSONTree src={log.value} />
        </div>
      )}
    </CardContainer>
  );
}

export default observer(Log);
