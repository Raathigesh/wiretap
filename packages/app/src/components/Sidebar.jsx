import React, { Component } from "react";
import styled from "styled-components";
const autoUpdater = require("electron").remote.autoUpdater;
const { app } = require("electron").remote;
import Loader from "./Loader";
import { observer } from "mobx-react";

const SidebarContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 250px;
  padding: 25px;
  box-shadow: 0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #b3b3b3;
  flex-direction: column;
`;

const Menus = styled.ul`box-shadow: 0 0;`;

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      isUpdateAvailable: true
    };

    this.checkForUpdate = this.checkForUpdate.bind(this);
    this.quitAndInstallUpdate = this.quitAndInstallUpdate.bind(this);
  }

  componentDidMount() {
    debugger;
    autoUpdater.checkForUpdates();
    debugger;
  }

  checkForUpdate() {
    autoUpdater.on("update-available", a => {
      debugger;
      this.setState({
        isUpdateAvailable: true
      });
    });
    autoUpdater.on("checking-for-update", a => {
      debugger;
    });
    autoUpdater.on("update-not-available", a => {
      debugger;
    });
    autoUpdater.on("update-downloaded", a => {
      debugger;
    });
  }

  quitAndInstallUpdate() {
    // autoUpdater.quitAndInstall();
    autoUpdater.checkForUpdates();
  }

  render() {
    const { trackers, setTrackerId, connectionInfo } = this.props;
    return (
      <div className="panel">
        <div className="panel-header text-center">
          <div className="panel-title h5 mt-10">Mobx Wiretap</div>
          <div className="panel-subtitle">Control your observables</div>
        </div>
        <div className="panel-body">
          <Menus className="menu">
            {trackers.map(tracker => {
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
          {connectionInfo.port && (
            <span>
              <span className="text-primary">
                <Loader /> Connected via port {connectionInfo.port}
              </span>
            </span>
          )}
          <div>
            Version <mark>{app.getVersion()}</mark>{" "}
            {this.state.isUpdateAvailable && (
              <button
                className="btn btn-link"
                onClick={this.quitAndInstallUpdate}
              >
                Update now
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default observer(Sidebar);
