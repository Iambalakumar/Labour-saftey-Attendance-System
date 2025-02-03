// src/app/components/WebcamRecorder.tsx

"use client";

import { useRef, useState, useEffect } from "react";

const WebcamRecorder = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [recording, setRecording] = useState(false);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedBlobs((prevBlobs) => prevBlobs.concat(event.data));
        }
      };
      mediaRecorder.start(100); // Start recording in 100ms chunks

      setRecording(true);
      setMediaRecorder(mediaRecorder);
    } catch (error) {
      console.error("Error initializing stream:", error);
    }
  };

  const stopWebcam = () => {
    if (recording && mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setMediaRecorder(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
  };

  const sendRecording = async () => {
    if (recordedBlobs.length > 0) {
      const blob = new Blob(recordedBlobs, { type: "video/webm" });
      const formData = new FormData();
      formData.append("video", blob);

      try {
        const response = await fetch("/api/video", {
          method: "POST",
          body: formData,
        });
        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.error("Error sending recording:", error);
      }
    }
  };

  const switchCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      if (cameras.length > 1) {
        const newDeviceId = cameras[1].deviceId;
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: newDeviceId,
          },
        });
        setStream(newStream);
        setDeviceId(newDeviceId);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          videoRef.current.play();
        }
      }
    } catch (error) {
      console.error("Error switching camera:", error);
    }
  };

  const liveDetection = () => {
    console.log("Live detection button clicked");
  };

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-[640px] h-[480px] rounded-lg border-2 border-gray-300 shadow-lg"
        style={{ display: "block" }}
      />
      <div className="mt-4 flex gap-4">
        <button
          onClick={startWebcam}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Start Webcam
        </button>
        <button
          onClick={stopWebcam}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Stop Webcam
        </button>
        <button
          onClick={sendRecording}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send Recording
        </button>
        <button
          onClick={switchCamera}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          Switch Camera
        </button>
        <button
          onClick={liveDetection}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg"
        >
          Live Detection
        </button>
      </div>
    </div>
  );
};

export default WebcamRecorder;

/*const sendRecording = async () => {
  if (recordedBlobs.length > 0) {
    const blob = new Blob(recordedBlobs, { type: "video/webm" });
    const formData = new FormData();
    formData.append("video", blob);

    try {
      const response = await fetch("/api/video", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error("Error sending recording:", error);
    }
  }
};

from server side
// pages/api/video.ts

import { NextApiRequest, NextApiResponse } from "next";

const videoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const video = req.body.video;
      // Save the video to a file or database
      res.status(201).send("Video uploaded successfully");
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).send("Error uploading video");
    }
  } else {
    res.status(405).send("Method not allowed");
  }
};

export default videoHandler;
*/