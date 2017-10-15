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
import state from "./store/Trackers";
import updater from "./store/Updater";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainCotent = styled.div`
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
    const { currentTracker, update, applySnapshot, applyPatch } = state;

    return (
      <AppContainer>
        <DevTools />
        <Sidebar store={state} updater={updater} />
        <Wrapper>
          <MainCotent>
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
                  <LogPanel
                    tracker={currentTracker}
                    applySnapshot={applySnapshot}
                    applyPatch={applyPatch}
                  />
                )}
              </SplitPane>
            )}
            {!currentTracker && (
              <EmptyContent
                title="Such empty! Much space!"
                subtitle="Click an item from the sidebar to kick things off"
              />
            )}
          </MainCotent>
          {currentTracker &&
            currentTracker.nodeType !== 2 && <ExecutionPanel store={state} />}
        </Wrapper>
      </AppContainer>
    );
  }
}

export default observer(App);

ReactDOM.render(<App />, document.getElementById("app"));
