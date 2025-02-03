// pages/api/video.ts

import { NextApiRequest, NextApiResponse } from "next";

const videoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const video = req.body.video;

    try {
      // Save the video to a file or database
      // For example, using the `fs` module to save to a file
      const fs = require("fs");
      const filePath = "uploads/video.webm";
      fs.writeFileSync(filePath, video);

      res.status(201).json({ message: "Video uploaded successfully" });
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ message: "Error uploading video" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default videoHandler;