import React, { useEffect } from "react";

const Root = () => {
  useEffect(() => {
    console.log("root mount");
    return () => {
      console.log("root unmount");
    };
  }, []);
  return (
    <>
      <div id="sidebar">
        <h1>React Router MeetingSDK</h1>

        <nav>
          <ul>
            <li>
              <a href={`/meeting`}> meeting </a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
};

export default Root;
