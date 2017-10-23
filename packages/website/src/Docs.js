import React from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/styles";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const DocsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
  background-color: #efecf2;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    margin: 20px;
  }
`;

const Title = styled.div`font-weight: bold;`;

const FirstStep = styled.div`@media (max-width: 700px) {margin-bottom: 20px;}`;

const ViewDoc = styled.button`
  background-color: #793ec5;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`;
const codeString = `npm install mobx-wiretap --dev
or
yarn add mobx-wiretap  --dev`;

const InspectCode = `import { initialize, inspect } from "mobx-wiretap";
initialize("Todo app");
inspect("Todos Array", theObservableToInspect);
`;

const Docs = () => (
  <Container>
    <DocsContent>
      <FirstStep>
        <Title>1 - Install mobx-wiretap</Title>
        <div>
          <SyntaxHighlighter
            language="javascript"
            style={docco}
            customStyle={{ whiteSpace: "pre-wrap" }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </FirstStep>
      <FirstStep>
        <Title>2 - Start Inspecting</Title>
        <div>
          <SyntaxHighlighter
            language="javascript"
            style={docco}
            customStyle={{ whiteSpace: "pre-wrap" }}
          >
            {InspectCode}
          </SyntaxHighlighter>
        </div>
      </FirstStep>
    </DocsContent>
    <ViewDoc>Learn How To Integrate With Your App</ViewDoc>
  </Container>
);

export default Docs;
