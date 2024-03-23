class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`
    });

    this.angryCollision = false; // Flag to track angry sprite collision
  }

  create() {
    // Set the background color to dark blue
    this.cameras.main.setBackgroundColor('#303091');
  }
  
  create() {
  

    // Listen for changes in the score
    this.events.on('scoreChanged', () => {
      // Check if the score reaches 5
      if (this.score >= 5) {
        // Emit a custom event to inform the boot scene that the game is over
        this.events.emit('gameOver');
      }
    });
  }
  create() {
    // Avatar setup with wall collision
    this.avatar = this.physics.add.sprite(400, 400, `avatar`);
    this.avatar.setCollideWorldBounds(true);

    // Random placement of mochi ball
    this.sadness = this.physics.add.sprite(0, 0, `thumbs-down`);
    Phaser.Actions.RandomRectangle([this.sadness], this.physics.world.bounds);

    // Random placement of angry sprite
    this.angry = this.physics.add.sprite(0, 0, `yeet`);
    Phaser.Actions.RandomRectangle([this.angry], this.physics.world.bounds);

    // Group of happiness sprites with physics configuration
    this.happiness = this.physics.add.group({
      key: `thumbs-up`,
      quantity: 10,
      collideWorldBounds: true,
      bounceX: 0.9,
      bounceY: 0.9,
      dragX: 50,
      dragY: 50
    });
    Phaser.Actions.RandomRectangle(this.happiness.getChildren(), this.physics.world.bounds);

    // Avatar collides with mochi ball
    this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this);
    
    // Avatar collides with angry sprite
    this.physics.add.overlap(this.avatar, this.angry, this.getAngry, null, this);

    // Colliders setup
    this.physics.add.collider(this.avatar, this.happiness);
    this.physics.add.collider(this.happiness, this.happiness);

    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Score initialization
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
  }

  // Function for mochi ball collision
  getSad(avatar, sadness) {
    Phaser.Actions.RandomRectangle([sadness], this.physics.world.bounds);
    // Increase score
    this.score++;
    this.scoreText.setText('Score: ' + this.score);
  }

  // Function for angry sprite collision
  getAngry(avatar, angry) {
    // Check if the avatar has already collided with the angry sprite
    if (!this.angryCollision) {
      // Increase score
      this.score++;
      this.scoreText.setText('Score: ' + this.score);
      
      // Reposition angry sprite
      Phaser.Actions.RandomRectangle([angry], this.physics.world.bounds);
      
      // Set the collision flag to true to prevent repeated repositioning
      this.angryCollision = true;
    }
  }

  update() {
    this.handleInput();
  }

  // Handle avatar movement
  handleInput() {
    if (this.cursors.left.isDown) {
      this.avatar.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown) {
      this.avatar.setAngularVelocity(150);
    } else {
      this.avatar.setAngularVelocity(0);
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.avatar.rotation, 200, this.avatar.body.acceleration);
    } else {
      this.avatar.setAcceleration(0);
    }
  }
}
