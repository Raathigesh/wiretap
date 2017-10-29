import React from "react";
import styled from "styled-components";
import cn from "classnames";
import CodeEditor from "../CodeEditor";

const EditorPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export default function Arguments({ open, action, tracker, onClose }) {
  return (
    <div className={cn("modal", { active: open })}>
      <div className="modal-overlay" />
      <div className="modal-container">
        <div className="modal-header">
          <button className="btn btn-clear float-right" onClick={onClose} />
          <div className="modal-title h5">Arguments for {action.name}</div>
          <div className="card-subtitle text-gray">Arguments of the action should be supplied as an array</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <EditorPanel>
              <CodeEditor
                code={action && action.arguments}
                onChange={value => tracker.setActionArguments(value)}
              />
            </EditorPanel>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
