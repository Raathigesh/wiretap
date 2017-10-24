import React from "react";
import styled, { injectGlobal } from "styled-components";
import Hero from "./Hero";
import Feature from "./Feature";
import Footer from "./Footer";
import Docs from "./Docs";
import media from "./MediaUtil";

injectGlobal`
body {
  background-color: #f4f4f4;
  min-height: 100vh;
}
`;

const IndexGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  flex-flow: wrap;
  margin-left: 200px;
  margin-right: 200px;
  ${media.desktop`
  margin-right: ${props => props.theme.mainMargin.desktop};
  `};
  ${media.desktop`
  margin-left: ${props => props.theme.mainMargin.desktop};
  `};
  ${media.tablet`
  margin-right: ${props => props.theme.mainMargin.tablet};
  margin-left: ${props => props.theme.mainMargin.tablet};
  grid-template-columns: 1fr;
  `};
  ${media.phone`
  margin-right: ${props => props.theme.mainMargin.phone};
  margin-left: ${props => props.theme.mainMargin.phone};
  grid-template-columns: 1fr;
  `};
`;

const IndexPage = () => (
  <IndexGrid>
    <div>
      <Hero />
      <Docs />
    </div>
    <FeatureGrid>
      <Feature
        url={require("./images/mst.png")}
        title="Inspect Mobx and Mobx State Tree"
        subtitle="Supports mobx and mobx state tree"
      />
      <Feature
        url={require("./images/Inspect.png")}
        title="Inspect observables live"
        subtitle="Examine your observables in realtime as they change"
      />
      <Feature
        url={require("./images/actions.png")}
        title="Invoke actions"
        subtitle="Invoke actions with arguments"
      />
      <Feature
        url={require("./images/Record.png")}
        title="Actions, snapshots and patches"
        subtitle="Examine how your observables change overtime"
      />
      <Feature
        url={require("./images/Patches.png")}
        title="Record and replay actions"
        subtitle="Record and replay actions with mobx state tree"
      />
      <Feature
        url={require("./images/updates.png")}
        title="Receive updates"
        subtitle="Get new features to wiretap with a click."
      />
    </FeatureGrid>
    <Footer />
  </IndexGrid>
);

export default IndexPage;
