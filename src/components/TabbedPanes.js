import React from "react";

export default function TabbedPanes({tabs, children}) {
  return (
    <div className="card">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          {tabs.map((content, idx) => (
            <li className="nav-item" key={idx}>
              {content}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
