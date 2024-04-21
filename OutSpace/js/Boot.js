class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`,
    });

    this.currentLevel = 0; // Initialize the current level to 0
  }

  preload() {
    // Load images
    this.load.image(`avatar`, `assets/images/avatar.png`);
    this.load.image(`mochi`, `assets/images/moon.png`); // thumbs down
    this.load.image(`star`, `assets/images/starboy.png`); //thumbs up
    this.load.image("yakult", "assets/images/window.png"); //Window of ship
    this.load.image("meanie", "assets/images/meanie.png"); // The Cosmic Critters
    this.load.image("heart", "assets/images/heart.png");
    this.load.image("damn", "assets/images/damned.png"); // The Damned (mob evol)
    this.load.video('video', "assets/videos/outspacevid.mp4"); // intro video
    this.load.image("score", "assets/images/spaceship.png"); //item sheet
    this.load.image("body", "assets/images/body.png"); //Body of ship
    this.load.image("leg", "assets/images/leg.png"); //Leg of ship
    this.load.image('gameOver', "assets/images/meanie.png");


    
  }

  create() { // PSSSST! Don't forget to click the screen so the cute animation can play! 
    this.video = this.add.video(400, 300, 'video');
    this.video.play();

    // OUTSPACE TITLE
    const titleText = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 4,
        "OUTSPACE",
        { fontSize: "64px", fill: "#ff0000" }
      )
      .setOrigin(0.5);

    // Play button creation
    const playButton = this.add
      .text(this.cameras.main.width / 2, this.cameras.main.height / 2, "Play", {
        fontSize: "32px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    // Enable interactive behavior for the button
    playButton.setInteractive();

    // When the button is clicked, start the play scene with the current level
    playButton.on("pointerdown", () => {
      this.scene.start("play", { level: this.currentLevel });
    });
    this.events.on("gameOver", () => {
      // Prompt the user to play again
      const playAgain = confirm(
          "Congratulations! You reached 5 points. Do you want to play again?"
      );
  
      if (playAgain) {
          this.currentLevel++; // Move to the next level
          this.scene.restart({ level: this.currentLevel });
      } else {
          // Go back to the boot scene
          this.scene.start("boot");
      }
  
      // Show game over image
      let gameOverImage = this.add.image(400, 300, 'gameOver').setOrigin(0.5);
      gameOverImage.setDepth(1); // Ensure it's on top
  });
    this.events.on("VIDEO_COMPLETE", () => {
      this.video.destroy();
    });
  }
}
