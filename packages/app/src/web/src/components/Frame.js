import React from "react";
import styled from "styled-components";

const FrameContainer = styled.div`background-color: #f9f9f9;`;
const FrameHeader = styled.div`
  height: 25px;
  background-color: #f1f1f1;
  padding: 5px;
`;

export default function Frame({ children }) {
  return (
    <FrameContainer>
      <FrameHeader>Header</FrameHeader>
      {children}
    </FrameContainer>
  );
}
