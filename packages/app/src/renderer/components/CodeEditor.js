import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/java";
import "brace/theme/github";

function CodeEditor() {
  return (
    <AceEditor
      mode="java"
      theme="github"
      name="UNIQUE_ID_OF_DIV"
      height="250px"
      editorProps={{ $blockScrolling: true }}
    />
  );
}

export default observer(CodeEditor);
