import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import CodeEditor from "./CodeEditor";

const Container = styled.div`
  padding-left: 0;
  padding-right: 0;
`;

const Menus = styled.ul`
  box-shadow: 0 0;
  background-color: #f7f7ff;
  height: 100%;
`;

function ExecutionPanel({ tracker }) {
  return (
    <Container className="container">
      <div className="columns col-gapless">
        <div className="column col-4">
          <Menus className="menu">
            {tracker.actions.map(action => {
              return (
                <li className="menu-item">
                  <a href="#menus">{action}</a>
                </li>
              );
            })}
          </Menus>
        </div>
        <div className="column col-4">
          <CodeEditor />
        </div>
      </div>
    </Container>
  );
}

export default observer(ExecutionPanel);
