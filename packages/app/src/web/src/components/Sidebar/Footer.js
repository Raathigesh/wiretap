import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Loader from "./Loader";

const PortLabel = styled.div`margin-bottom: 5px;`;
const UpdateLabel = styled.span`font-size: 12px;`;

const UpdateButton = styled.button`
  padding-left: 0px;
  font-size: 12px;
`;

function Footer({ connectionInfo, peerId }) {
  return (
    <div className="panel-footer">
      {connectionInfo.app && (
        <span>
          <span className="text-primary">
            <Loader app={connectionInfo.app} />
          </span>
        </span>
      )}
    </div>
  );
}

export default observer(Footer);
