import React from "react";
import JSONTree from "react-json-view";
import { observer } from "mobx-react";

function ObjectView({ data, update }) {
  return (
    <div>
      <JSONTree
        src={data}
        onEdit={ops => {
          update(ops);
        }}
      />
    </div>
  );
}

export default observer(ObjectView);
