import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const LoadingText = styled.div`margin-left: 10px;`;

export default function Loader({ app }) {
  return (
    <LoaderContainer>
      <div className="loader">
        <svg>
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="2"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
      <LoadingText>Inspecting {app}</LoadingText>
    </LoaderContainer>
  );
}
