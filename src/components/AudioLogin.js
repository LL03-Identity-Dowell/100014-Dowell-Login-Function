import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { ReactMic } from "react-mic";

const AudioLogin = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleAudioUpload = async (audioData) => {
    try {
      // Handle the recorded audio data (e.g., upload to server)
      toast.success("Audio uploaded successfully 🚀");
    } catch (error) {
      toast.error("An error occurred during audio upload.");
      console.log("Error during audio upload:", error);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 mx-auto">
      <div className="max-w-screen-md p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center">
        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={(audioData) => handleAudioUpload(audioData)}
        />
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          type="button"
          className={`${
            isRecording ? "bg-red-500" : "bg-green-500"
          } flex items-center justify-center h-10 px-6 font-semibold rounded-md border hover:bg-green-700 text-white`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      <button
        type="button"
        className="flex items-center justify-center h-10 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
        onClick={handleAudioUpload}
      >
        <FaFileUpload className="mr-2" />
        Save
      </button>
    </div>
  );
};

export default AudioLogin;
