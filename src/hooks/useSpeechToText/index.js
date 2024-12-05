import React, { useEffect, useRef, useState } from 'react';

const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [fullTranscript, setFullTranscript] = useState(""); // Added to store complete transcript
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
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      // Process all results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
          // Add the final transcript to the full transcript
          setFullTranscript(prev => prev + ' ' + transcript);
        } else {
          interimTranscript += transcript;
        }
      }

      // Set the current transcript to show interim results
      setTranscript(interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Save any remaining transcript when stopping
      if (transcript) {
        setFullTranscript(prev => prev + ' ' + transcript);
        setTranscript("");
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript(""); // Clear current transcript
      setFullTranscript(""); // Clear full transcript when starting new recording
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
    transcript: fullTranscript + (transcript ? ' ' + transcript : ''), // Combine full and current transcript
    startListening,
    stopListening,
  };
};

export default useSpeechToText;