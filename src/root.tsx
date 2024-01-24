import React from "react";

const Root = () => {
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
