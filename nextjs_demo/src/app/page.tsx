// src/app/page.tsx

import WebcamRecorder from "./components/WebcamRecorder";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 justify-items-center">
        <h1 className="text-2xl font-bold mb-4">Webcam Recorder</h1>
        <WebcamRecorder />
        <div className="flex justify-center mt-4">
          <div className="flex flex-col items-center mr-4">
            <h2 className="text-lg font-bold">Model Performance</h2>
            <p className="text-sm">Model Inference Time: 0ms</p>
            <p className="text-sm">Model FPS: Infinityfps</p>
            <p className="text-sm">Overhead FPS: NaNfps</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold">Total Performance</h2>
            <p className="text-sm">Total Time: 0ms</p>
            <p className="text-sm">Total FPS: Infinityfps</p>
            <p className="text-sm">Overhead Time: +0.00ms</p>
          </div>
        </div>
      </main>
    </div>
  );
}