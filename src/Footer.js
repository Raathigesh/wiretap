import React from "react";
import styled from "styled-components";

const FooterGrid = styled.div`
  text-align: center;
  padding: 10px;
  color: #743dc2;
  font-size: 12px;
  margin-top: 10px;
`;

const Footer = () => (
  <FooterGrid>
    A side project by{" "}
    <a href="https://twitter.com/Raathigesh" target="_blank">
      Raathigeshan
    </a>
  </FooterGrid>
);

export default Footer;
