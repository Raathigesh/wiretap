import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { observer } from "mobx-react";
import Log from "./Log";

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 2;
`;

const TraceContainer = styled.div`overflow: auto;`;

const ClearButton = styled.button`float: right;`;

class Spy extends Component {
  render() {
    const { tracker, applySnapshot, applyPatch, clearLogs } = this.props;
    return (
      <ContentContainer className="card">
        <div className="card-header">
          <div className="card-title h5">
            Debug panel{" "}
            <ClearButton
              className="btn btn-sm"
              onClick={() => {
                tracker.clearLogs();
              }}
            >
              Clear
            </ClearButton>
          </div>

          <div className="card-subtitle text-gray">
            Actions, snaphots and patches
          </div>
        </div>
        {tracker.nodeType === 1 && (
          <div>
            <ul className="tab tab-block">
              <li
                className={`tab-item ${tracker.selectedTab === 0
                  ? "active"
                  : ""}`}
                onClick={() => {
                  tracker.setSelectedTab(0);
                }}
              >
                <a href="#tabs">Actions</a>
              </li>
              <li
                className={`tab-item ${tracker.selectedTab === 1
                  ? "active"
                  : ""}`}
                onClick={() => {
                  tracker.setSelectedTab(1);
                }}
              >
                <a href="#tabs">Patches</a>
              </li>
              <li
                className={`tab-item ${tracker.selectedTab === 2
                  ? "active"
                  : ""}`}
                onClick={() => {
                  tracker.setSelectedTab(2);
                }}
              >
                <a href="#tabs">Snapshots</a>
              </li>
            </ul>
          </div>
        )}
        <TraceContainer>
          {tracker.selectedTab === 0 &&
            tracker.logs.actionLogs.map((action, index) => {
              return (
                <Log
                  order={action.displayNumber}
                  key={index}
                  title={
                    tracker.nodeType === 1 ? action.value.name : action.time
                  }
                  log={action}
                  currrentTrackerId={tracker.id}
                />
              );
            })}
        </TraceContainer>
        <TraceContainer>
          {tracker.selectedTab === 1 &&
            tracker.logs.patches.map((patch, index) => {
              return (
                <Log
                  order={patch.displayNumber}
                  key={index}
                  title={patch.value.path}
                  log={patch}
                  applySnapshot={applyPatch}
                  currrentTrackerId={tracker.id}
                />
              );
            })}
        </TraceContainer>
        <TraceContainer>
          {tracker.selectedTab === 2 &&
            tracker.logs.snapshots.map((snapshot, index) => {
              return (
                <Log
                  order={snapshot.displayNumber}
                  key={index}
                  title={snapshot.time}
                  log={snapshot}
                  applySnapshot={applySnapshot}
                  currrentTrackerId={tracker.id}
                />
              );
            })}
        </TraceContainer>
      </ContentContainer>
    );
  }
}

export default observer(Spy);
