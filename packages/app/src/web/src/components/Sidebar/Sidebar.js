import React, { Component } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { observer } from "mobx-react";
import Footer from "./Footer";

const SidebarContainer = styled.div`background-color: #f7f7ff;`;

const Menus = styled.ul`
  box-shadow: 0 0;
  background-color: #f7f7ff;
`;

const Divider = styled.li`
  &:after {
    background-color: #f7f7ff !important;
  }
`;

class Sidebar extends Component {
  render() {
    const {
      currrentTrackerId,
      trackers,
      connectionInfo,
      update,
      setCurrentTrackerId,
      peerId
    } = this.props.store;

    return (
      <SidebarContainer className="panel">
        <div className="panel-header text-center">
          <img
            src={require("../../assets/wiretap.png")}
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
            {trackers.map((tracker, index) => {
              const isActive = tracker.id === currrentTrackerId;
              return (
                <li
                  key={index}
                  className="menu-item"
                  onClick={() => {
                    setCurrentTrackerId(tracker.id);
                  }}
                >
                  <a href="#menus" className={isActive ? "active" : ""}>
                    {tracker.name}
                  </a>
                </li>
              );
            })}
          </Menus>
        </div>
        <Footer
          connectionInfo={connectionInfo}
          updater={this.props.updater}
          peerId={peerId}
        />
      </SidebarContainer>
    );
  }
}

export default observer(Sidebar);
