import React from "react";
import styled from "styled-components";

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => (props.active ? "wheat" : "#f1f1f1")};
  padding: 5px;
  cursor: pointer;
  margin-bottom: 2px;
  padding-left: 15px;
  margin: 5px;
  height: 50px;
  flex-basis: 48%;
  color: #727e96;
`;

const ActionColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

const SetArguments = styled.a`font-size: 10px;`;

export default function Action({
  index,
  active,
  action,
  tracker,
  onArgumentClick,
  executeAction
}) {
  return (
    <ActionContainer
      active={active}
      onClick={() => {
        tracker.selectedActionIndex = index;
      }}
    >
      <ActionColumn>
        <div>{action.name}</div>
        <div>
          <SetArguments onClick={onArgumentClick}>Set Arguments</SetArguments>
        </div>
      </ActionColumn>
      <div>
        <a
          className="btn btn-sm"
          onClick={() => {
            executeAction(
              tracker.id,
              tracker.actions[tracker.selectedActionIndex].name,
              eval(tracker.actionArguments)
            );
          }}
        >
          Execute
        </a>
      </div>
    </ActionContainer>
  );
}
