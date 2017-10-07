import React, { Component } from "react";
import JSONTree from "react-json-view";
import ReactGridLayout from "react-grid-layout";
import styled from "styled-components";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import ObjectView from "./components/ObjectView";
import Frame from "./components/Frame";
import Sidebar from "./components/Sidebar";

import state from "./store/Trackers";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const Content = styled.div`display: flex;`;

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <AppContainer>
        <Sidebar
          trackers={state.trackers}
          setTrackerId={state.setCurrentTrackerId}
          connectionInfo={state.connectionInfo}
        />
        <Content>
          <ObjectView
            data={state.currentTracker && toJS(state.currentTracker.value)}
            update={payload => {
              state.update(payload);
            }}
          />
          {state.setCurrentTrackerId}
        </Content>
      </AppContainer>
    );
  }
}

export default observer(App);
