class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`
    });
  }

  preload() {
    // Load images
    this.load.image(`avatar`, `assets/images/guy.png`);
    this.load.image(`thumbs-down`, `assets/images/mochi.png`);
    this.load.image(`thumbs-up`, `assets/images/starboy.png`);
    this.load.image('yeet', 'assets/images/yakult.png');
  }
  create() {
    // Add title text
    const titleText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 4,
      'OUTSPACE',
      { fontSize: '64px', fill: '#ff0000' }
    ).setOrigin(0.5);
  
    // Create play button
    const playButton = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Play',
      { fontSize: '32px', fill: '#fff' }
    ).setOrigin(0.5);
  
    // Enable interactive behavior for the button
    playButton.setInteractive();
  
    // When the button is clicked, start the play scene
    playButton.on('pointerdown', () => {
      this.scene.start('play');
    });
 // Listen for a custom event emitted from the 'play' scene
 this.events.on('gameOver', () => {
  // Prompt the user to play again
  const playAgain = confirm("Congratulations! You reached 5 points. Do you want to play again?");

  if (playAgain) {
    // Restart the play scene
    this.scene.restart();
  } else {
    // Go back to the boot scene
    this.scene.start('boot');
  }
});
}

update() {}
}