import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { observer } from "mobx-react";
import Frame from "./components/Frame";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content";
import EmptyContent from "./components/EmptyContent";
import LogPanel from "./components/logs/LogPanel";
import ExecutionPanel from "./components/executionPanel/ExecutionPanel";
import SplitPane from "react-split-pane";
import "./styles/global.css";
import "./styles/loader.css";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.css";
import "spectre.css/dist/spectre-exp.css";
import state from "./store/Trackers";

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
        <Sidebar store={state} />
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
                title={state.peerId}
                subtitle="Initialize your connection with the above ID"
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

ReactDOM.render(<App />, document.getElementById("root"));
