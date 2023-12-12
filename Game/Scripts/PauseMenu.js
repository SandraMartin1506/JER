class PauseMenu extends Phaser.Scene
{
    constructor()
    {
        super({key:"PauseMenu"});
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
        this.load.audio("Paper", "./Sounds/paper.mp3");
    }

    create()
    {
        //Audio de los botones
        this.clickSound = this.scene.get('Game').clickSound;
        this.paperSound = this.sound.add("Paper");
        //Variables de escalado:
        var scale = 10;
        //Texto del menú de pausa:
        this.add.text(200, 100, "Game has been paused", {font: "100px Courier", fill: "0#FFFFFF"});
        //Botón de continuar:
        this.continueButton = this.add.image(this.game.config.width/2, this.game.config.height/2 - 100, "buttonPlaceholder");
        this.continueButton.setScale(scale);
        this.continueButton.setRotation(Phaser.Math.DegToRad(90));
        this.continueButton.setInteractive();
        this.add.text(665, 330, "Resume", {font: "50px Courier", fill: "0#000000"});
        this.continueButton.on("pointerdown", this.ContinueGame.bind(this));
        this.continueButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.continueButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.continueButton.on("pointerout", function(event) 
        {
            this.continueButton.setScale(scale);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));
        //Botón de salir:
        this.exitButton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 100, "buttonPlaceholder");
        this.exitButton.setScale(scale);
        this.exitButton.setRotation(Phaser.Math.DegToRad(90));
        this.exitButton.setInteractive();
        this.add.text(665, 530, "Main menu", {font: "50px Courier", fill: "0#000000"});
        this.exitButton.on("pointerdown", this.GoToMainMenu.bind(this));
        this.exitButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.exitButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.exitButton.on("pointerout", function(event) 
        {
            this.exitButton.setScale(scale);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));
        //Si se pulsa escape se considera que la acción que se quería hacer era continuar el juego:
        this.input.keyboard.on("keydown", function(event) 
        {
            if(event.key === "Escape") this.ContinueGame();
        }.bind(this));
    }

    update()
    {
    }

    ContinueGame()
    {
        this.clickSound.play();
        this.scene.resume("Game");
        this.scene.get("Game").gameSound.resume();
        game.canvas.style.cursor = "crosshair";
        this.scene.resume("InfoMenu");
        this.scene.stop();
    }

    GoToMainMenu()
    {
        console.log("Saliendo del juego...");
        this.clickSound.play();
        this.scene.start("MainMenu");
        this.scene.remove("Game");
        this.scene.remove("CustomizationP1Menu");
        this.scene.remove("CustomizationP2Menu");
        this.scene.remove("InfoMenu");
        this.scene.remove("PauseMenu")
        this.scene.remove();
    }
}