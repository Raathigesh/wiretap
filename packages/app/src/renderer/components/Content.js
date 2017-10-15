import React from "react";
import styled from "styled-components";
import TimeAgo from "react-timeago";
import isString from "lodash.isstring";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import ObjectView from "./ObjectView";

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
  height: 100%;
`;

function Content({ currentTracker, spyTrace, children, update }) {
  const isValueAString = currentTracker && isString(currentTracker.value);
  return (
    <ContentContainer className="card">
      <div className="card-header">
        <div className="card-title h5">{currentTracker.name}</div>
        <div className="card-subtitle text-gray">
          <TimeAgo date={currentTracker.updatedOn.toDate()} />
        </div>
      </div>
      <div className="card-body">
        {isValueAString && <kbd>{currentTracker.value}</kbd>}
        {!isValueAString && (
          <ObjectView
            name={currentTracker.name}
            data={currentTracker && toJS(currentTracker.value)}
            update={payload => {
              update(payload);
            }}
            isEditable={currentTracker.nodeType === 0}
          />
        )}
      </div>
    </ContentContainer>
  );
}

export default observer(Content);
