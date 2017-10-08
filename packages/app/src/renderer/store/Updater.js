import { observable, extendObservable } from "mobx";
const { autoUpdater } = require("electron").remote.require("electron-updater");
const log = require("electron-log");
const { app } = require("electron").remote;
autoUpdater.autoDownload = false;
autoUpdater.logger = log;
autoUpdater.logger.info();

export const UpdaterStatus = {
  NoUpdate: 0,
  CheckingUpdate: 1,
  UpdateAvailableForDownload: 2,
  DownloadingUpdate: 3,
  UpdateDownloaded: 4,
  InstallingUpdate: 5
};

class Updater {
  constructor() {
    extendObservable(this, {
      updateStatus: UpdaterStatus.NoUpdate,
      currentVersion: app.getVersion()
    });

    autoUpdater.on("checking-for-update", () => {
      this.updateStatus = UpdaterStatus.CheckingUpdate;
    });
    autoUpdater.on("update-available", info => {
      this.updateStatus = UpdaterStatus.UpdateAvailableForDownload;
    });
    autoUpdater.on("update-not-available", info => {
      this.updateStatus = UpdaterStatus.NoUpdate;
    });
    autoUpdater.on("error", err => {
      this.updateStatus = UpdaterStatus.NoUpdate;
      console.error(err);
    });
    autoUpdater.on("update-downloaded", info => {
      this.updateStatus = UpdaterStatus.UpdateDownloaded;
      autoUpdater.quitAndInstall();
      this.updateStatus = UpdaterStatus.InstallingUpdate;
    });
    autoUpdater.checkForUpdates();
  }

  checkForUpdate() {
    autoUpdater.checkForUpdates();
  }

  downloadUpdate() {
    autoUpdater.downloadUpdate();
    this.updateStatus = UpdaterStatus.DownloadingUpdate;
  }
}

export default new Updater();
