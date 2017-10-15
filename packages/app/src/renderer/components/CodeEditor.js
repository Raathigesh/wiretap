import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/java";
import "brace/theme/github";

function CodeEditor({ code, onChange }) {
  return (
    <AceEditor
      mode="java"
      theme="github"
      name="UNIQUE_ID_OF_DIV"
      height="228px"
      width="100%"
      value={code}
      editorProps={{ $blockScrolling: true }}
      onChange={onChange}
    />
  );
}

export default observer(CodeEditor);
