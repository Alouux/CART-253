"use strict";

let myRec;
let myVoice;
let voiceSpoken = false;

function setup() {
  // Initialize p5.SpeechRec
  myRec = new p5.SpeechRec();
  myRec.continuous = false;
  myRec.interimResults = true;

  // Initialize p5.Speech
  myVoice = new p5.Speech();

  // Start speech recognition
  myRec.start();

  // Event handlers
  myRec.onResult = parseResult;
  myRec.onEnd = restartRec;

  // Load voices asynchronously
  speechSynthesis.onvoiceschanged = function() {
    let voices = speechSynthesis.getVoices();
    let selectedVoice = voices.find(voice => voice.name === 'Google UK English Female');
    if (selectedVoice) {
      myVoice.setVoice(selectedVoice.name);
    } else {
      console.error('Selected voice not available.');
    }
  };
}

function parseResult() {
  let lowStr = myRec.resultString.toLowerCase();
  let mostrecentword = lowStr.split(' ').pop();
  
  if (!voiceSpoken) { // Check if the voice has not spoken yet
    if (mostrecentword.includes("angry")) {
      speakWithVoice('a banana might fix your turmoil');
      voiceSpoken = true; // Set the flag to true after speaking
    } else if (mostrecentword.includes("happy")) {
      speakWithVoice('that makes one of us');
      voiceSpoken = true;
    } else if (mostrecentword.includes("sad")) {
      speakWithVoice('you might just have the human affliction');
      voiceSpoken = true;
    } else if (mostrecentword.includes("tired")) {
      speakWithVoice('tired? cheer up, you also LOOK tired!');
      voiceSpoken = true;
    } else if (mostrecentword.includes("bored")) {
      speakWithVoice('Well, I suggest talking to your plants, but they might fall asleep from the boredom too');
      voiceSpoken = true; 
    } else if (mostrecentword.includes("annoyed")) {
      speakWithVoice('would you look at that, we are finally on the same page');
      voiceSpoken = true;
    } else if (mostrecentword.includes("lazy")) {
      speakWithVoice('Lazy? Nah, you are just in energy-saving mode, your default setting.');
      voiceSpoken = true;
    } else if (mostrecentword.includes("dumb")) {
      speakWithVoice('no');
      voiceSpoken = true;
    } else if (mostrecentword.includes("stop")) {
      speakWithVoice('ok.');
      voiceSpoken = true;
    }
  }

  console.log(mostrecentword);
}

function speakWithVoice(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function restartRec() {
  console.log("end");
  myRec.start();
  voiceSpoken = false;
}