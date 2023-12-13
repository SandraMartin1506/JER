class Credits extends Phaser.Scene
{
    constructor()
    {
        super({key:"Credits"});
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
        this.load.image("Background", "./Sprites/credits.png");
        this.load.audio("Click", "./Sounds/click.mp3");
        this.load.audio("Paper", "./Sounds/paper.mp3");
    }

    create()
    {
        this.backgroundImage1 = this.add.image(0,0,"Background").setOrigin(0,0);
        this.clickSound = this.sound.add("Click");
        this.paperSound = this.sound.add("Paper");
        var scale = 10;
        this.backButton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 300, "buttonPlaceholder");
        this.backButton.setScale(scale);
        this.backButton.setRotation(Phaser.Math.DegToRad(90));
        this.backButton.setInteractive();
        this.add.text(665, 730, "Back", {font: "50px Courier", fill: "0#000000"});
        this.backButton.on("pointerdown", function(){this.clickSound.play(); this.ReturnToMenu();}.bind(this));
        this.backButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.NPCButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.NPCButton.on("pointerout", function(event) 
        {
            this.NPCButton.setScale(scale);
            game.canvas.style.cursor = "auto";
        }.bind(this));
    }

    update()
    {
    }

    ReturnToMenu()
    {
        this.clickSound.play();
        this.scene.pause();
        this.scene.run("MainMenu");
    }
}