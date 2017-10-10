import React from "react";
import JSONTree from "react-json-view";
import { observer } from "mobx-react";
import styled from "styled-components";

const CardContainer = styled.div`
  border: 0px solid gray;
  border-bottom: 1px solid #e4e4e4;
`;
const ToggleHandler = styled.button`
  float: right;
  font-size: 0.5rem;
`;
const CardHeader = styled.div`float: left;`;

function LogEntry({ description }) {
  const subLabelText = description.isExpanded ? "Collapse" : "Expand";
  return (
    <CardContainer className="card">
      <div className="card-header">
        <CardHeader className="card-title h5">{description.type}</CardHeader>
        <ToggleHandler
          className="btn btn-sm"
          onClick={() => {
            description.isExpanded = !description.isExpanded;
          }}
        >
          {subLabelText}
        </ToggleHandler>
      </div>
      {description.isExpanded && (
        <div className="card-body">
          <JSONTree src={description} />
        </div>
      )}
    </CardContainer>
  );
}

export default observer(LogEntry);
