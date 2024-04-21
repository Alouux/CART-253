const levelsConfig = [
  {
    id: 0,
    itemSprite: "yakult",
    stars: 5,
  },
  {
    id: 1,
    itemSprite: "leg",
    stars: 10,
  },
  {
    id: 2,
    itemSprite: "body",
    stars: 15,
  },
];

class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`,
    });
  }

  init(data) {
    this.level = data.level || 0; // Get the current level from the data passed to the scene
    this.enemies = []; // Initialize the enemies array
    this.score = data.level || 0;
  }

  create() {
    // Set the background color to dark blue
    this.cameras.main.setBackgroundColor("#303091");

    this.add.image(200,300 , 'score');

    // Listen for changes in the score
    this.events.on("scoreChanged", () => {
      // Check if the score reaches 5
      if (this.score >= 5) {
        this.events.emit("gameOver");
      }
    });

    // Avatar setup with wall collision
    this.avatar = this.physics.add.sprite(400, 400, "avatar");
    this.avatar.setCollideWorldBounds(true);

    // Random placement of mochi ball
    this.mochi = this.physics.add.sprite(0, 0, "mochi");
    Phaser.Actions.RandomRectangle([this.mochi], this.physics.world.bounds);

    // Random placement of mochi ball
    this.levelItem = this.physics.add.sprite(
      0,
      0,
      levelsConfig[this.level].itemSprite
    );
    Phaser.Actions.RandomRectangle([this.levelItem], this.physics.world.bounds);

    // Group of star sprites with physics configuration
    this.obstacle = this.physics.add.group({
      key: "star",
      quantity: levelsConfig[this.level].stars,
      collideWorldBounds: true,
      bounceX: 0.9,
      bounceY: 0.9,
      dragX: 50,
      dragY: 50,
    });
    Phaser.Actions.RandomRectangle(
      this.obstacle.getChildren(),
      this.physics.world.bounds
    );

    // Avatar collides with mochi ball (bonus 
    this.physics.add.overlap(
      this.avatar,
      this.mochi,
      this.getMochi,
      null,
      this
    );

    // Avatar collides with collect level item
    this.physics.add.overlap(
      this.avatar,
      this.levelItem,
      this.collectLevelItem,
      null,
      this
    );

    // Colliders setup
    this.physics.add.collider(this.avatar, this.obstacle);
    this.physics.add.collider(this.obstacle, this.obstacle);

    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Score initialization
    this.scoreText = this.add.text(16, 16, "Score: " + this.score, {
      fontSize: "20px",
      fill: "#fff",
    });

    // Spawn enemies based off the level
    for (let i = 0; i <= this.level; i++) {
      this.enemies.push(this.spawnEnemy(i));
    }
  }

  // Function to spawn an enemy
  spawnEnemy(count) {
    // Create the enemy sprite
    const enemy = this.physics.add.sprite(
      Phaser.Math.Between(0, this.physics.world.bounds.width),
      Phaser.Math.Between(0, this.physics.world.bounds.height),
      count <= 0 ? "meanie" : "damn"
    );

    // Avatar collides with enemy
    this.physics.add.collider(
      this.avatar,
      enemy,
      this.handleEnemyCollision,
      null,
      this
    );

    return enemy;
  }

  // Function for mochi ball collision
  getMochi(avatar, mochi) {
    // Destroy the mochi sprite
    mochi.destroy();

    // Increase score
    this.score++;
    this.scoreText.setText("Score: " + this.score);
  }

  collectLevelItem(avatar, levelItem) {
    // Destroy the level item sprite
    levelItem.destroy();

    this.obstacle.clear(true, true);

    if (this.level == 2) {
      this.scene.start("Winner", { score: this.score });
    } else {
      this.scene.restart({ level: this.level + 1, score: this.score + 1 });
    }
  }

  update() {
    // Handle avatar movement
    this.handleInput();

    // Make the enemy follow the avatar
    this.enemies.forEach((enemy) => {
      this.physics.moveToObject(enemy, this.avatar, 100);
    });
  }

  // Handle avatar movement
  handleInput() {
    if (this.cursors.left.isDown) {
      this.avatar.setAngularVelocity(-100);
    } else if (this.cursors.right.isDown) {
      this.avatar.setAngularVelocity(100);
    } else {
      this.avatar.setAngularVelocity(0);
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.avatar.rotation,
        200,
        this.avatar.body.acceleration
      );
    } else {
      this.avatar.setAcceleration(0);
    }
  }
}
