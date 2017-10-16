import React from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
`;

export default function EmptyContent({ title, subtitle }) {
  return (
    <ContentContainer className="empty">
      <div className="empty-icon">
        <i className="icon icon-3x icon-emoji" />
      </div>
      <p className="empty-title h5">{title}</p>
      <p className="empty-subtitle">{subtitle}</p>
    </ContentContainer>
  );
}
