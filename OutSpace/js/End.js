class End extends Phaser.Scene {
    constructor() {
        super({
            key: "End" });
    }

    // loads in the ending screen background image
    preload() {
        this.load.image('gameOver', "assets/images/youwin.png");
    }
    
    
    create() {
        this.load.image('gameOver', "assets/images/youwin.png");
        // displays the end scene text
        let endingText = this.add.text(500, 560, "Refresh to play again!", {
            fontFamily: "Arial",
            fontSize: 30, 
            color: "#FFFFFF"
        });
    }
}