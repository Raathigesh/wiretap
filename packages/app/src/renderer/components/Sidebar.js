import React, { Component } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { observer } from "mobx-react";
import { UpdaterStatus } from "../store/Updater";

const SidebarContainer = styled.div`background-color: #f7f7ff;`;

const Menus = styled.ul`
  box-shadow: 0 0;
  background-color: #f7f7ff;
`;

const UpdateButton = styled.button`
  padding-left: 0px;
  font-size: 12px;
`;
const PortLabel = styled.div`margin-bottom: 5px;`;
const UpdateLabel = styled.span`font-size: 12px;`;
const Divider = styled.li`
  &:after {
    background-color: #f7f7ff !important;
  }
`;

class Sidebar extends Component {
  render() {
    const { trackers, setTrackerId, connectionInfo, updater } = this.props;
    const observableTrackers = trackers.filter(tracker => tracker.isObservable);
    const logTrackers = trackers.filter(tracker => !tracker.isObservable);
    return (
      <SidebarContainer className="panel">
        <div className="panel-header text-center">
          <img
            src={require("../assets/wiretap.png")}
            alt="Avatar XL"
            width="50"
          />
          <div className="panel-title h5 mt-10">Mobx Wiretap</div>
          <div className="panel-subtitle">
            Stare into the soul of your observables
          </div>
        </div>
        <div className="panel-body">
          <Menus className="menu">
            {observableTrackers.length > 0 && (
              <Divider className="divider" data-content="Observables" />
            )}
            {observableTrackers.map(tracker => {
              return (
                <li
                  className="menu-item"
                  onClick={() => {
                    setTrackerId(tracker.id);
                  }}
                >
                  <a href="#menus">{tracker.name}</a>
                </li>
              );
            })}

            {logTrackers.length > 0 && (
              <Divider className="divider" data-content="Logs" />
            )}
            {logTrackers.map(tracker => {
              return (
                <li
                  className="menu-item"
                  onClick={() => {
                    setTrackerId(tracker.id);
                  }}
                >
                  <a href="#menus">{tracker.name}</a>
                </li>
              );
            })}
          </Menus>
        </div>
        <div className="panel-footer">
          {connectionInfo.app && (
            <span>
              <span className="text-primary">
                <Loader app={connectionInfo.app} />
              </span>
            </span>
          )}
          <div className="divider" />
          <PortLabel>Listening on port {connectionInfo.port}</PortLabel>
          <div>Version {updater.currentVersion}</div>
          <div>
            {updater.updateStatus === UpdaterStatus.NoUpdate && (
              <UpdateButton
                className="btn btn-link"
                onClick={updater.checkForUpdate}
              >
                Check for update
              </UpdateButton>
            )}
            {updater.updateStatus === UpdaterStatus.CheckingUpdate && (
              <UpdateLabel>Checking for update</UpdateLabel>
            )}

            {updater.updateStatus ===
              UpdaterStatus.UpdateAvailableForDownload && (
              <UpdateButton
                className="btn btn-link"
                onClick={updater.downloadUpdate}
              >
                Download and Install
              </UpdateButton>
            )}
            {updater.updateStatus === UpdaterStatus.DownloadingUpdate && (
              <UpdateLabel>Downloading update</UpdateLabel>
            )}
            {updater.updateStatus === UpdaterStatus.InstallingUpdate && (
              <UpdateLabel>Installing update</UpdateLabel>
            )}
          </div>
        </div>
      </SidebarContainer>
    );
  }
}

export default observer(Sidebar);
