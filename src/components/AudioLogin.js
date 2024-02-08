import React, { useState, useEffect } from "react";
import { FaFileUpload } from "react-icons/fa";
import { ReactMic } from "react-mic";
import AudioPlayer from "../utils/AudioPlayer";
const AudioLogin = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceData, setVoiceData] = useState("");

  const handleAudioUpload = (audioData) => {
    setVoiceData(audioData);
    setIsRecording(false);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setVoiceData("");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };
  useEffect(() => {
    console.log("This is is recording", isRecording);
  }, [isRecording]);
  return (
    <div className="flex flex-col justify-center items-center space-y-4 mx-auto">
      <div className="w-full max-w-md p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center ">
        {voiceData ? (
          <AudioPlayer url={voiceData.blobURL} />
        ) : (
          !voiceData && (
            <ReactMic
              record={isRecording}
              className={"mediaplayer"}
              onStop={(audioData) => {
                handleAudioUpload(audioData);
              }}
            />
          )
        )}

        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          type="button"
          className={`${
            isRecording ? "bg-red-500" : "bg-green-500"
          } flex items-center justify-center h-10 px-6 font-semibold rounded-md border hover:bg-green-700 text-white `}
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
        Upload
      </button>
    </div>
  );
};

export default AudioLogin;
