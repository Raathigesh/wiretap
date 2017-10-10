import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import isString from "lodash.isstring";
import ObjectView from "./components/ObjectView";
import Frame from "./components/Frame";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content";
import EmptyContent from "./components/EmptyContent";
import SpyContent from "./components/Traces/Spy";
import ExecutionPanel from "./components/ExecutionPanel";

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

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

class App extends Component {
  render() {
    const {
      currrentTrackerId,
      trackers,
      setCurrentTrackerId,
      connectionInfo,
      currentTracker,
      update
    } = state;

    const isValueAString = currentTracker && isString(currentTracker.value);
    return (
      <AppContainer>
        <Sidebar
          currrentTrackerId={currrentTrackerId}
          trackers={trackers}
          setTrackerId={setCurrentTrackerId}
          connectionInfo={connectionInfo}
          updater={updater}
        />
        <Wrapper>
          <MainCotent>
            {currentTracker && (
              <Content
                name={currentTracker.name}
                updatedOn={currentTracker.updatedOn}
              >
                {isValueAString && <kbd>{currentTracker.value}</kbd>}
                {!isValueAString && (
                  <ObjectView
                    name={currentTracker.name}
                    data={currentTracker && toJS(currentTracker.value)}
                    update={payload => {
                      update(payload);
                    }}
                    isEditable={currentTracker.isObservable}
                  />
                )}
              </Content>
            )}
            {!currentTracker && <EmptyContent />}
            {currentTracker && <SpyContent spyTrace={currentTracker.traces} />}
          </MainCotent>
          {currentTracker && <ExecutionPanel tracker={currentTracker} />}
        </Wrapper>
      </AppContainer>
    );
  }
}

export default observer(App);

ReactDOM.render(<App />, document.getElementById("app"));
