
let imgOffset = 0;
let verticalOffset = 0;
let rightKey = false;
let leftKey = false;
let upKey = false;
let downKey = false;


setInterval(movingImg, 20);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
function play() {
  var audio = new Audio('https://www.youtube.com/watch?v=cYz6BEu5qqc&t=3s');
  audio.play();
}
function keyDown(event) {
  //press shift
  if (event.keyCode == 16) {
    //window.alert("You have pressed SHIFT");
    console.log("WARNING! This button does nothing. ");
    let array = document.getElementsByClassName("content");
    // array[1].style.rotate="50deg";

    let i=0;
    while(i < array.length){
      array[i].style.rotate=i*20+10+"deg";
      i++;
    }
  }
  if (event.keyCode == 68) {
    rightKey = true;
  }
  if (event.keyCode == 65) {
    leftKey = true;
  }
  if (event.keyCode == 87) {
    upKey = true;
  }
  if (event.keyCode == 83) {
    downKey = true;
  }


}

function keyUp(event) {
  if (event.keyCode == 68) {
    rightKey = false;
  }
  if (event.keyCode == 65) {
    leftKey = false;
  } 
  if (event.keyCode == 87) upKey = false;
  if (event.keyCode == 83) downKey = false;
}

//function use to change image and div color and text
function myFunction(){
  let tempHTML = document.getElementById("Paragraph").innerHTML;
  let tempImg = document.getElementById("anotherImage").src;
  
  document.getElementById("Paragraph").innerHTML=initialHTML;
  initialHTML=tempHTML;

  document.getElementById("anotherImage").src=initialImage;
  initialImage=tempImg;

  document.getElementById("Paragraph").style.backgroundColor="rgba(235, 174, 222)";
  document.getElementById("Paragraph").style.color='#3b0c0a';
}

//this function will play a sound
function playSound() {
    soundFile.play();
    console.log("sound played!");
  }

//This function will moved the image 
function movingImg() {
  if (rightKey) {
    if (imgOffset >= 200) {
      console.log("end of the line!");
    } else {
      imgOffset += 3;
    }
  }
  if(leftKey) {

    imgOffset -= 3;
  }
  if (upKey) {
    verticalOffset -= 3;
  }
  if (downKey) {
    verticalOffset += 3;
  }

  document.getElementById("movingImg").style.left = imgOffset + "px";
  document.getElementById("movingImg").style.top = verticalOffset + "px";
  }

$(document).ready(function() {

  var magic8Ball = {};
  magic8Ball.listOfAnswers = ["Duh!", "As I see it, a sweet surprise is in your near future.", "Totally...Not a weird question at all.", "Concentrate and ask again after a marshmallow moment", "I don't want to candy crush your dreams...", "In your dreams."];

  $("#answer").hide();

  magic8Ball.askQuestion = function(question) {
    $("#8ball").effect("shake");

    $("#8ball").attr("src", "the manoo.png");

    $("#answer").fadeIn(4000);

    var randomNumber = Math.random();

    var randomNumberForListOfAnswers = randomNumber * this.listOfAnswers.length;

    var randomIndex = Math.floor(randomNumberForListOfAnswers);

    var answer = this.listOfAnswers[randomIndex];

    $("#answer").text(answer);

    console.log(question);
    console.log(answer);
  };

  var onClick = function() {

    $("#answer").hide();

    $("#8ball").attr("src", "the manoo.png");


    setTimeout(function(){
      var question = prompt("ASK A YES/NO QUESTION!");
      magic8Ball.askQuestion(question);
    }, 500);


  };

  $("#questionButton").click(onClick);
  function playsound() {
    var mysound = document.getElementById("mysound");
    mysound.autoplay = 'true';
    mysound.load();
  }
  var imgs = [
    "https://static.vecteezy.com/system/resources/thumbnails/018/803/116/small_2x/candy-cartoon-icon-png.png",
    "https://static.wikia.nocookie.net/core-keeper/images/5/5b/Evil_Eye_Candy.png/revision/latest/thumbnail/width/360/height/360?cb=20221025150302",
    "https://static.vecteezy.com/system/resources/thumbnails/018/800/795/small/candy-cartoon-icon-png.png",
    "https://i.pinimg.com/originals/d0/b2/af/d0b2af13221261c6c2bdbca6c3b281b8.png",
    "https://i.pinimg.com/originals/d0/b2/af/d0b2af13221261c6c2bdbca6c3b281b8.png"
  ];
  var showImageName = 2;
  
  function changeIMG(dir) {
    var img = document.getElementById("myIMG");
    img.src = imgs[dir];
    img.alt = dir;
  }
  
  var keyPressed = false;
  
  function f(e, str) {
    switch (str) {
      case "up":
        if (e.keyCode == 37) {
          changeIMG(2);
        } else if (e.keyCode == 39) {
          changeIMG(4);
        }
        break;
      case "down":
        if (e.keyCode == 37) {
          changeIMG(1);
        } else if (e.keyCode == 39) {
          changeIMG(3);
        }
        break;
    }
  }
  
  $(document)
    .keydown(function(e) {
      if (!keyPressed) {
        keyPressed = true;
        f(e, "down");
      }
    })
    .keyup(function(e) {
      if (keyPressed) {
        keyPressed = false;
        f(e, "up");
      }
    });
  
  changeIMG(0);
  
});
