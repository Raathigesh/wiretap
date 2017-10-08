import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import isString from "lodash.isstring";
import ObjectView from "./components/ObjectView";
import Frame from "./components/Frame";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import EmptyContent from "./components/EmptyContent";
import SpyContent from "./components/Spy";

import "./styles/global.css";
import "./styles/loader.css";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.css";
import state from "./store/Trackers";
import updater from "./store/Updater";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainCotent = styled.div`
  display: flex;
  flex-grow: 1;
`;

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
          updater={updater}
        />
        <MainCotent>
          {state.currentTracker && (
            <Content
              name={state.currentTracker.name}
              updatedOn={state.currentTracker.updatedOn}
            >
              {isString(toJS(state.currentTracker.value)) && (
                <kbd>{toJS(state.currentTracker.value)}</kbd>
              )}
              {!isString(toJS(state.currentTracker.value)) && (
                <ObjectView
                  name={state.currentTracker.name}
                  data={
                    state.currentTracker && toJS(state.currentTracker.value)
                  }
                  update={payload => {
                    state.update(payload);
                  }}
                  isEditable={state.currentTracker.isObservable}
                />
              )}
            </Content>
          )}
          {!state.currentTracker && <EmptyContent />}
          {state.spyTraces.length > 0 && (
            <SpyContent spyTrace={state.spyTraces} />
          )}
        </MainCotent>
      </AppContainer>
    );
  }
}

export default observer(App);

ReactDOM.render(<App />, document.getElementById("app"));
