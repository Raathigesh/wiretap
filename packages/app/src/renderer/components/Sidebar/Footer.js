import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { UpdaterStatus } from "../../store/Updater";
import Loader from "./Loader";

const PortLabel = styled.div`margin-bottom: 5px;`;
const UpdateLabel = styled.span`font-size: 12px;`;

const UpdateButton = styled.button`
  padding-left: 0px;
  font-size: 12px;
`;

function Footer({ connectionInfo, updater }) {
  return (
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

        {updater.updateStatus === UpdaterStatus.UpdateAvailableForDownload && (
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
  );
}

export default observer(Footer);
