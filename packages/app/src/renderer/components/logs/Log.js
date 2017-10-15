import React from "react";
import JSONTree from "react-json-view";
import { observer } from "mobx-react";
import styled from "styled-components";

const CardContainer = styled.div`
  border: 0px solid;
  border-bottom: 1px solid #e4e4e4;
`;
const ToggleHandler = styled.button`
  float: right;
  font-size: 0.5rem;
  margin-left: 5px;
`;
const CardHeader = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 12px;
  padding-left: 17px;
`;
const CardTitle = styled.div`float: left;`;

function Log({ title, log, currrentTrackerId, applySnapshot }) {
  const subLabelText = log.isExpanded ? "Collapse" : "Expand";
  return (
    <CardContainer className="card">
      <CardHeader>
        <CardTitle className="card-title">{title}</CardTitle>
        <ToggleHandler
          className="btn btn-sm"
          onClick={() => {
            log.isExpanded = !log.isExpanded;
          }}
        >
          {subLabelText}
        </ToggleHandler>
        {applySnapshot && (
          <ToggleHandler
            className="btn btn-sm"
            onClick={() => {
              applySnapshot(currrentTrackerId, log.value);
            }}
          >
            Apply
          </ToggleHandler>
        )}
      </CardHeader>
      {log.isExpanded && (
        <div className="card-body">
          <JSONTree src={log.value} />
        </div>
      )}
    </CardContainer>
  );
}

export default observer(Log);
