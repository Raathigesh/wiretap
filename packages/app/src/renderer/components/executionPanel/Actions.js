import React, { Component } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import Arguments from "./Arguments";
import Action from "./Action";
import EmptyContent from "../EmptyContent";

const ActionsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  flex-basis: 50%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  padding-top: 6px;
  background-color: #f1f1f1;
  font-size: 16px;
  min-height: 37px;
`;

const PopoverCard = styled.div`
  height: 380px;
  width: 400px;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
`;

const ActionsColumn = styled.div`
  display: flex;
  overflow: auto;
  color: #fffbfb;
  flex-wrap: wrap;
`;

const ExecuteButton = styled.button`margin-top: 8px;`;

class Actions extends Component {
  constructor() {
    super();
    this.state = {
      isArgDialogOpen: false
    };
  }

  render() {
    const { actions, tracker, executeAction } = this.props;
    const action = actions[tracker.selectedActionIndex];
    return (
      <ActionsContainer>
        <Header>
          <span>Actions</span>
        </Header>
        {actions.length > 0 && (
          <Arguments
            open={this.state.isArgDialogOpen}
            action={action}
            tracker={tracker}
            onClose={() => {
              this.setState({
                isArgDialogOpen: false
              });
            }}
          />
        )}
        <ActionsColumn>
          {actions.map((action, index) => {
            return (
              <Action
                key={index}
                index={index}
                active={index === tracker.selectedActionIndex}
                tracker={tracker}
                action={action}
                executeAction={executeAction}
                onArgumentClick={() => {
                  this.setState({
                    isArgDialogOpen: true
                  });
                }}
              />
            );
          })}
          {actions.length === 0 && (
            <EmptyContent
              title="No actions"
              subtitle="This observable does not have any actions associated."
              icon="icon-apps"
            />
          )}
        </ActionsColumn>
      </ActionsContainer>
    );
  }
}

export default observer(Actions);
