import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { observer } from "mobx-react";
import Log from "./Log/Log";
import LogSaved from "./Log/LogSaved";
import Accordion from '../../atoms/Accordion';

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 2;
`;
const TraceContainer = styled.div`overflow: auto;`;
const ClearButton = styled.button`float: right;`;
const CardHeader = styled.div`margin-bottom: 10px;`;
const ToggleHandler = styled.button`
  position: absolute;
  float: none;
  width: calc(100% - 10px);
  font-size: 0.5rem;
  margin-left: 5px;
`;

class Spy extends Component {
  render() {
    const { tracker, trackersStore } = this.props;
    const { savedSnapshots } = trackersStore;

    return (
      <ContentContainer className="card">
        <CardHeader className="card-header">
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
            Logs for taking a close look at the changes
          </div>
        </CardHeader>
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
                    tracker.isStateTree ? action.value.name : action.time
                  }
                  log={action}
                  tracker={tracker}
                  trackersStore={trackersStore}
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
                  tracker={tracker}
                  trackersStore={trackersStore}
                />
              );
            })}
        </TraceContainer>
        <TraceContainer>
          { tracker.selectedTab === 2 &&
            <ToggleHandler
              className="btn btn-sm"
              onClick={() => tracker.toggleSnapshotRecording()}
            >
              { !tracker.isRecordingSnapshots ?
                'Start Recording' :
                'Stop Recording'
              }
            </ToggleHandler>
          }
          {tracker.selectedTab === 2 &&
            <div>
              <Accordion style={{ marginTop: '30px' }}>
              { savedSnapshots.map((snapshot, index) =>
                <LogSaved
                  key={index}
                  title={snapshot.name}
                  log={snapshot}
                  tracker={tracker}
                  trackersStore={trackersStore}
                />
              )}
              </Accordion>
              { tracker.logs.snapshots.map((snapshot, index) =>
                <Log
                  order={snapshot.displayNumber}
                  key={index}
                  title={snapshot.time}
                  log={snapshot}
                  tracker={tracker}
                  trackersStore={trackersStore}
                />
              )}
            </div>
          }
        </TraceContainer>
      </ContentContainer>
    );
  }
}

export default observer(Spy);
