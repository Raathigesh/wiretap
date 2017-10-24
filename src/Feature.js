import React from "react";
import styled from "styled-components";

const FeatureContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Title = styled.span`
  font-size: 25px;
  color: #773bc2;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Subtitle = styled.span`
  font-size: 15px;
  color: #737373;
`;

const IconContent = styled.div`
  display: flex;
  min-width: 54px;
  padding-top: 7px;
  padding-right: 10px;
`;

const Icon = styled.img`
  padding-right: 5px;
  margin-top: -7px;
  height: 54px;
  width: 54px;
`;

const Feature = ({ url, title, subtitle }) => (
  <FeatureContent>
    <IconContent>
      <Icon src={url} />
    </IconContent>
    <TextContent>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </TextContent>
  </FeatureContent>
);

export default Feature;
