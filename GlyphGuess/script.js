document.addEventListener("DOMContentLoaded", function () {
  var clear = document.getElementById("clear");
  var paint = false;

  var can = document.querySelector("canvas");
  var context = can.getContext("2d");
  can.addEventListener("mouseup", finish);
  can.addEventListener("mousemove", draw);
  clear.addEventListener("click", clearContent);
  can.addEventListener("mousedown", painting);
  var doodlenet;
  var canvas;
  var ctx;

  function setup() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    doodlenet = ml5.imageClassifier("DoodleNet", modelReady);
  }

  function modelReady() {
    console.log("Model Loaded!");
  }

  function guessGlyph() {
    canvas.toBlob(function (blob) {
      doodlenet.classify(blob, function (err, results) {
        if (err) {
          console.error(err);
          return;
        }
        var guess = document.getElementById("guess");
        var confidence = document.getElementById("confidence");
        guess.innerText = "Guess: " + results[0].label;
        confidence.innerText =
          "Confidence: " + (results[0].confidence * 100).toFixed(2) + "%";
      });
    }, "image/png");
  }

  setup();

  document.querySelector(".reset").addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("guess").innerText = "";
    document.getElementById("confidence").innerText = "";
  });

  document.querySelector("#color").addEventListener("input", function () {
    ctx.strokeStyle =
      "hsl(" + document.querySelector("#color").value + ", 100%, 50%)";
  });

  document.querySelector("#size").addEventListener("input", function () {
    ctx.lineWidth = document.querySelector("#size").value;
  });

  canvas.addEventListener("mousedown", function () {
    canvas.addEventListener("mousemove", drawWithClassification);
  });

  canvas.addEventListener("mouseup", function () {
    canvas.removeEventListener("mousemove", drawWithClassification);
    guessGlyph();
  });

  function draw(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function drawWithClassification(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    ctx.lineTo(x, y);
    ctx.stroke();
    guessGlyph(); // Call classification function for real-time classification
  }

  function clearContent() {
    context.clearRect(0, 0, can.width, can.height);
  }

  function painting() {
    paint = true;
    context.beginPath();
  }

  function finish() {
    paint = false;
  }

  function draw(e) {
    if (!paint) return 0;
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    context.strokeStyle = "black";
    context.lineWidth = 5;
    context.lineCap = "round";
    context.lineTo(x, y);
    context.stroke();
  }
});

var Sketch = (function () {
  var Sketch = {
    init: function () {
      this.colorSlider = document.getElementById("color");
      this.sizeSlider = document.getElementById("size");
      this.sizeSpan = document.querySelector("label span");
      this.colorbox = document.querySelector(".colorbox");
      this.reset = document.querySelector(".reset");
      this.color =
        this.color || "hsla(180, 50%, 50%, 1)";
      this.canvas = document.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.drawing = false;
      this.radius = this.sizeSlider.value / 2;
      this.resizeCanvas();
      this.binding();
    },
    binding: function () {
      this.colorSlider.addEventListener(
        "change",
        this.colorSliderChange
      );
      this.sizeSlider.addEventListener(
        "change",
        this.sizeSliderChange
      );
      this.reset.addEventListener(
        "click",
        this.resetClick.bind(this)
      );
      this.canvas.onmousedown = this.mouseDown;
      this.canvas.onmousemove = this.mouseMove;
      window.addEventListener(
        "mouseup",
        this.stop.bind(this)
      );
      window.addEventListener(
        "resize",
        this.resizeCanvas.bind(this)
      );
    },
    resizeCanvas: function () {
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;
    },
    clearCanvas: function () {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    },
    resetClick: function () {
      this.clearCanvas();
    },
    mouseDown: function (e) {
      var s = Sketch;
      s.drawing = true;
      var rect = this.getBoundingClientRect();
      var x = e.x - rect.left;
      var y = e.y - rect.top;
      if (s.drawing) {
        s.draw(x, y);
      }
    },
    mouseMove: function (e) {
      var s = Sketch;
      var rect = this.getBoundingClientRect();
      var x = e.x - rect.left;
      var y = e.y - rect.top;
      if (s.drawing) {
        s.draw(x, y);
      }
    },
    stop: function () {
      this.drawing = false;
    },
    draw: function (x, y) {
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.arc(
        x,
        y,
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      this.ctx.fill();
    },
    colorSliderChange: function () {
      var that = Sketch;
      that.color = that.hsla(this.value);
      that.colorbox.style.background = that.color;
    },
    sizeSliderChange: function () {
      var that = Sketch;
      var value = this.value;
      that.radius = value / 2;
      that.sizeSpan.innerHTML = value;
    },
    hsla: function (num) {
      return "hsla(" + num + ", 50%, 50%, 1)";
    },
  };
  Sketch.init();
})();

var classifier;

var request;

// A variable to hold the canvas image we want to classify
var canvas, ctx;

// Two variable to hold the label and confidence of the result
var label;
var confidence;
var button;
const width = 280;
const height = 280;

var pX = null;
var pY = null;
var x = null;
var y = null;

var mouseDown = false;

setup();
async function setup() {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");

  classifier = await ml5.imageClassifier("DoodleNet", onModelReady);

  canvas.addEventListener("mousemove", onMouseUpdate);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);

  button = document.querySelector("#clearBtn");

  button.addEventListener("click", clearCanvas);

  requestAnimationFrame(draw);
}

function onModelReady() {
  console.log("ready!");
}

function onMouseDown(e) {
  mouseDown = true;
  x = e.offsetX;
  y = e.offsetY;
}

function onMouseUp() {
  mouseDown = false;
}

function onMouseUpdate(e) {
  if (!mouseDown) {
    return;
  }
  pX = x;
  pY = y;
  x = e.offsetX;
  y = e.offsetY;
  drawLine();
}

function drawLine() {
  ctx.beginPath();
  ctx.moveTo(pX, pY);
  ctx.lineTo(x, y);
  ctx.stroke();
  guessGlyph();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function guessGlyph() {
  canvas = document.querySelector("#myCanvas");
  label = document.querySelector("#label");
  confidence = document.querySelector("#confidence");
  classifier.classify(canvas, function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    if (results && results.length > 0) {
      label.innerText = `Label: ${results[0].label}`;
      confidence.innerText =
        `Confidence: ${(results[0].confidence * 100).toFixed(2)} %`;
    }
  });
}
