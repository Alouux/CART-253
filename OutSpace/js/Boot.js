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
    this.load.image("gameOver", "assets/images/youwin.png"); // game over screen (not working properly yet)
    this.load.image("restart", "assets/images/restart.png"); // restart button
    this.load.audio('backgroundmusic', [ "assets/sounds/Space Ambient Music for relaxing or study  New Planet (Short Version).mp3" ]);


    
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

    //MUSIC
    let background = this.sound.add("backgroundmusic");
    background.loop = true;
    background.play();

    // When the button is clicked, start the play scene with the current level
    playButton.on("pointerdown", () => {
      this.scene.start("play", { level: this.currentLevel });
    });
    this.events.on("gameOver", () => {
  
      this.scene.start("end");
  });
    this.events.on("VIDEO_COMPLETE", () => {
      this.video.destroy();
    });
  }
}
