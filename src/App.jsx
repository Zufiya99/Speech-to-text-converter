import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import "./App.css";

const App = () => {
  const [copyText, setCopyText] = useState("");
  const [isCopied, setCopied] = useClipboard(copyText);

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    setCopyText(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition.</p>;
  }

  return (
    <>
      <div className="container">
        <h2>Speech to text converter</h2>
        <p>Welcome to the project</p>

        <div className="main-content" onClick={() => setCopyText(transcript)}>
          {transcript}
        </div>
        <div className="btn-style">
          <button onClick={setCopied}>{isCopied ? "Copied!" : "Copy"}</button>
          <button onClick={startListening}>Start listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop listening
          </button>
        </div>
      </div>
      <footer className="footer-sec">
        &copy;{" "}
        <span>
          <a
            href="https://www.linkedin.com/in/zufiyaidrisi9797/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zufiya Idrisi
          </a>
        </span>{" "}
        | All rights reserved | {new Date().getFullYear()}
      </footer>
    </>
  );
};

export default App;
