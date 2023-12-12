class GameEndedMenu extends Phaser.Scene
{
    constructor()
    {
        super({key: "GameEndedMenu"});
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
        this.load.audio("Paper","./Sounds/paper.mp3");
    }

    create()
    {
        //Jugadores:
        this.player1 = this.scene.get("Game").player;
        this.player2 = this.scene.get("Game").player2;
        //Panel de transición y panel de background:
        this.panel = this.add.rectangle(0,0,this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(100);
        this.panel.alpha = 0;
        this.background = this.add.rectangle(0,0,this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(-1);
        this.background.alpha = 0.25;
        this.mainMenuPressed = false;
        this.playAgainPressed = false;
        //Audio
        this.clickSound = this.scene.get('Game').clickSound;
        this.paperSound = this.sound.add("Paper");
        var scale = 10;
        //Botón de volver a jugar:
        this.playAgainButton = this.add.image(this.game.config.width/2, this.game.config.height/2 - 50, "buttonPlaceholder");
        this.playAgainButton.setScale(scale);
        this.playAgainButton.setRotation(Phaser.Math.DegToRad(90));
        this.playAgainButton.setInteractive();
        this.add.text(665, 380, "Play again", {font: "35px Courier", fill: "0#000000"});
        this.playAgainButton.on("pointerdown", function()
        {
            this.playAgainPressed = true;
            this.clickSound.play();
            this.panel.alpha = 0.01;
        }.bind(this));
        this.playAgainButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.playAgainButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.playAgainButton.on("pointerout", function(event) 
        {
            this.playAgainButton.setScale(scale);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));
        //Botón de volver al menú:
        this.returnToMenuButton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 150, "buttonPlaceholder");
        this.returnToMenuButton.setScale(scale);
        this.returnToMenuButton.setRotation(Phaser.Math.DegToRad(90));
        this.returnToMenuButton.setInteractive();
        this.add.text(665, 580, "Main menu", {font: "35px Courier", fill: "0#000000"});
        this.returnToMenuButton.on("pointerdown", function()
        {
            this.mainMenuPressed = true;
            this.clickSound.play();
            this.panel.alpha = 0.01;
        }.bind(this));
        this.returnToMenuButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.returnToMenuButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.returnToMenuButton.on("pointerout", function(event) 
        {
            this.returnToMenuButton.setScale(scale);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));
        //Texto de victoria:
        var victoryText;
        if(!this.scene.get("Game").player.killed) victoryText = "Player 1 wins";
        else victoryText = "Player 2 wins";
        this.add.text(425, 50, victoryText, {font: "100px Courier", fill: "0#FFFFFF"});
        if(this.player1.killed)
        {
            this.add.text(220, 200, "Player 1 was brutally shot", {font: "75px Courier", fill: "0#FFFFFF"});
        }
        else if(this.player2.bullets == 0)
        {
            this.add.text(210, 200, "Player 2 can't aim properly", {font: "75px Courier", fill: "0#FFFFFF"});
        }
        else if(this.player1.missionAccomplished)
        {
            this.add.text(60, 200, "Player 1 accomplished his mission", {font: "75px Courier", fill: "0#FFFFFF"});
        }
    }

    update()
    {
        if(this.panel.alpha >= 0.01) this.panel.alpha += 0.01;
        
        if(this.panel.alpha >= 1 && this.playAgainPressed) this.PlayAgain();
        else if(this.panel.alpha >= 1 && this.mainMenuPressed) this.ReturnToMenu();
    }

    PlayAgain()
    {
        this.scene.run("InfoMenu");
        this.scene.remove("Game");
        this.scene.remove("InfoMenu");
        this.scene.remove("PauseMenu");
        this.scene.start("CustomizationP1Menu");
        this.scene.remove("CustomizationP2Menu");
        this.scene.remove("GameEndedMenu");
    }

    ReturnToMenu()
    {
        this.scene.start("MainMenu");
        this.scene.remove("Game");
        this.scene.remove("CustomizationP1Menu");
        this.scene.remove("CustomizationP2Menu");
        this.scene.remove("InfoMenu");
        this.scene.remove("PauseMenu")
        this.scene.remove();
    }
}