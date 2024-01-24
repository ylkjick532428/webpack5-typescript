import React, { useEffect, useState } from "react";
import { devDefaultConfig } from "./config";
import { ZoomMtg } from "@zoom/meetingsdk";
import { loadCSS, loadScript } from "./util";

let isLoadResource = false;
const MeetingApp: React.FC = () => {
  const meetingArgs: any = Object.fromEntries(
    new URLSearchParams(location.search),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const devConfig = devDefaultConfig;
  useEffect(() => {
    if (!isLoadResource) {
      loadCSS(
        "https://d27xp8zu78jmsf.cloudfront.net/jssdk/2024-01-22-opjb19/cdn/css/bootstrap.css",
      );
      loadCSS(
        "https://d27xp8zu78jmsf.cloudfront.net/jssdk/2024-01-22-opjb19/cdn/css/react-select.css",
      );
      // loadScript(
      //   "https://d27xp8zu78jmsf.cloudfront.net/jssdk/2024-01-22-opjb19/cdn/zoom-meeting-3.5.0.min.js",
      //   () => {
      //     setIsLoading(false);
      //   },
      // );
      setIsLoading(false);
      isLoadResource = true;
    }

    return () => {
      if (isJoined) {
        console.log("Leave Meeting");
        ZoomMtg.leaveMeeting({ confirm: false });
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      ZoomMtg.prepareWebSDK();
      ZoomMtg.preLoadWasm();
      ZoomMtg.init({
        leaveUrl: "/",
        webEndpoint: devDefaultConfig.webEndpoint,
      });
      ZoomMtg.join({
        meetingNumber: devDefaultConfig.meetingNumber,
        passWord: devDefaultConfig.passcode,
        userName: devDefaultConfig.name,
        userEmail: devDefaultConfig.email,
      });
      ZoomMtg.inMeetingServiceListener("onMeetingStatus", function (data: any) {
        console.log("inMeetingServiceListener onMeetingStatus", data);
        if (data && "meetingStatus" in data && data.meetingStatus === 2) {
          setIsJoined(true);
        }
      });
    }
  }, [isLoading]);

  return <div></div>;
};

export default MeetingApp;
