import React from "react";
import { Input } from "antd";

function AppLayout({ children }) {
  return (
    <>
      <div className="app">
        <div className="header">
          <Input.Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            style={{ width: 200 }}
          />
        </div>
        <div className="container">{children}</div>
        <div className="sidebar">sidebar</div>
        <div className="footer">footer</div>
      </div>
    </>
  );
}

export default AppLayout;
