import React from "react";
import styled from "styled-components";
import TimeAgo from "react-timeago";

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
  height: 100%;
`;

export default function Content({ spyTrace, name, updatedOn, children }) {
  return (
    <ContentContainer className="card">
      <div className="card-header">
        <div className="card-title h5">{name}</div>
        <div className="card-subtitle text-gray">
          <TimeAgo date={updatedOn.toDate()} />
        </div>
      </div>
      <div className="card-body">{children}</div>
    </ContentContainer>
  );
}
