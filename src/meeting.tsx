import React, { useEffect, useState } from "react";
import { devDefaultConfig } from "./config";
import { ZoomMtg } from "@zoom/meetingsdk";
import { loadCSS, loadScript } from "./util";

const isLoadResource = false;
const MeetingApp: React.FC = () => {
  const meetingArgs: any = Object.fromEntries(
    new URLSearchParams(location.search),
  );
  useEffect(() => {
    ZoomMtg.setZoomJSLib("/node_modules/@zoom/meetingsdk/dist/lib", "/av");
    ZoomMtg.prepareWebSDK();
    ZoomMtg.preLoadWasm();
    ZoomMtg.init({
      leaveUrl: "/",
      webEndpoint: devDefaultConfig.webEndpoint,
    });
    const signature = ZoomMtg.generateSDKSignature({
      sdkKey: devDefaultConfig.sdkKey,
      sdkSecret: devDefaultConfig.sdkSecret,
      meetingNumber: devDefaultConfig.meetingNumber,
      role: devDefaultConfig.role,
    });
    ZoomMtg.join({
      meetingNumber: devDefaultConfig.meetingNumber,
      signature,
      passWord: devDefaultConfig.passcode,
      userName: devDefaultConfig.name,
      userEmail: devDefaultConfig.email,
      sdkKey: devDefaultConfig.sdkKey,
    });
    ZoomMtg.inMeetingServiceListener("onMeetingStatus", function (data: any) {
      console.log("inMeetingServiceListener onMeetingStatus", data);
      if (data && "meetingStatus" in data && data?.meetingStatus === 2) {
        console.log("joined");
      }
    });

    ZoomMtg.inMeetingServiceListener("onUserJoin", function (data: any) {
      console.log("inMeetingServiceListener onUserJoin", data);
    });

    ZoomMtg.inMeetingServiceListener("onUserLeave", function (data: any) {
      console.log("inMeetingServiceListener onUserLeave", data);
    });

    return () => {
      ZoomMtg.leaveMeeting({});
    };
  }, []);

  return <div></div>;
};

export default MeetingApp;
