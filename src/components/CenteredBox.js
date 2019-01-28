import React from "react";

export default function CenteredBox({width="25em", header, footer, children}) {
  return (
    <div style={{width, margin: "2em auto"}}>
      <div style={{textAlign: "center"}}>
        {header}
      </div>
      <div style={{
        margin: "2em 0",
        border: "1px solid #ddd",
        boxShadow: "2px 2px 8px 1px rgba(0, 0, 0, 0.2)"
      }}>
        {children}
      </div>
      <div className="text-muted">
        {footer}
      </div>
    </div>
  );
}
