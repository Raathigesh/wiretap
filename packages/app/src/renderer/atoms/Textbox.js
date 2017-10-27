import React, { Component } from "react";

export default class Textbox extends Component {
  render() {
    return (
      <input
        style={this.props.style}
        ref={this.props.inputRef}
        className="form-input input-sm"
        type="text"
        placeholder={this.props.placeholder}
        defaultValue={this.props.defaultValue}
      />
    );
  }
}

