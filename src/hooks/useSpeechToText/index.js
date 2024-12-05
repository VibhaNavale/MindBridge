import React, { useEffect, useRef, useState } from 'react'

const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
      if (!('webkitSpeechRecognition' in window)) {
          console.log("WebSpeech API is not supported.");
          return;
      }

      recognitionRef.current = new window.webkitSpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.continuous = false;

      if ("webkitSpeechGrammarList" in window) {
          const grammar =
              "#JSGF V1.0; grammar punctuations; public <punc> = . | , | ? | ! | ; | : ;";
          const speechRecognitionList = new window.webkitSpeechGrammarList();
          speechRecognitionList.addFromString(grammar, 1);
          recognition.grammars = speechRecognitionList;
      }

      recognition.onresult = (event) => {
          let text = "";
          for (let i = 0; i < event.results.length; i++) {
              text += event.results[i][0].transcript;
          }
          setTranscript(text);
      };

      recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
          setIsListening(false);
          setTranscript("");
      };

      return () => {
          recognition.stop();
      };
  }, []);

  const startListening = () => {
      if (recognitionRef.current && !isListening) {
          recognitionRef.current.start();
          setIsListening(true);
      }
  };

  const stopListening = () => {
      if (recognitionRef.current && isListening) {
          recognitionRef.current.stop();
          setIsListening(false);
      }
  };

  return {
      isListening,
      transcript,
      startListening,
      stopListening,
  };
};

export default useSpeechToText;