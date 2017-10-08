import React from "react";
import JSONTree from "react-json-view";
import { observer } from "mobx-react";

function ObjectView({ name, data, update, isEditable = true }) {
  let props = {};

  if (isEditable) {
    props.onEdit = ops => {
      update(ops);
    };
  }
  return (
    <div>
      <JSONTree name={name} src={data} {...props} />
    </div>
  );
}

export default observer(ObjectView);
