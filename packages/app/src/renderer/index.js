import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { observer } from "mobx-react";
import Frame from "./components/Frame";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content";
import EmptyContent from "./components/EmptyContent";
import LogPanel from "./components/logs/LogPanel";
import ExecutionPanel from "./components/ExecutionPanel/ExecutionPanel";
import DevTools from "mobx-react-devtools";
import SplitPane from "react-split-pane";
import "./styles/global.css";
import "./styles/loader.css";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.css";
import "spectre.css/dist/spectre-exp.css";
import trackersStore from "./store/Trackers";
import updater from "./store/Updater";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

class App extends Component {
  render() {
    const {
      currentTracker,
      update,
    } = trackersStore;

    return (
      <AppContainer>
        <Sidebar trackersStore={trackersStore} updater={updater} />
        <Wrapper>
          <MainContent>
            {currentTracker && (
              <SplitPane
                split="vertical"
                style={{ position: "absolute" }}
                pane2Style={{ display: "flex" }}
                minSize={300}
                defaultSize={600}
              >
                <Content currentTracker={currentTracker} update={update} />
                {currentTracker && (
                  <LogPanel trackersStore={trackersStore} tracker={currentTracker} />
                )}
              </SplitPane>
            )}
            {!currentTracker && (
              <EmptyContent
                title="Such empty! Much space!"
                subtitle="Click an item from the sidebar to kick things off"
              />
            )}
          </MainContent>
          {currentTracker &&
            currentTracker.isObservable && <ExecutionPanel trackersStore={trackersStore} />}
        </Wrapper>
      </AppContainer>
    );
  }
}

export default observer(App);

ReactDOM.render(<App />, document.getElementById("app"));
