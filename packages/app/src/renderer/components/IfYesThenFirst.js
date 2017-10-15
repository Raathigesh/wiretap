import React from "react";

export default function IfYesThenFirst({ condition, children }) {
  if (condition) {
    return children[0];
  }

  return children[1];
}
