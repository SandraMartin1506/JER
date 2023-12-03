class GameEndedMenu extends Phaser.Scene
{
    constructor(player1, player2)
    {
        super({key: "GameEndedMenu"});
        this.player1 = player1;
        this.player2 = player2;
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
    }

    create()
    {
        var scale = 10;
        //Botón de volver a jugar:
        this.playAgainButton = this.add.image(this.game.config.width/2, this.game.config.height/2 - 50, "buttonPlaceholder");
        this.playAgainButton.setScale(scale);
        this.playAgainButton.setRotation(Phaser.Math.DegToRad(90));
        this.playAgainButton.setInteractive();
        this.add.text(665, 380, "Volver a jugar", {font: "35px Courier", fill: "0#000000"});
        this.playAgainButton.on("pointerdown", this.PlayAgain.bind(this));
        this.playAgainButton.on("pointerover", function(event) 
        {
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
        this.add.text(665, 580, "Salir al menú", {font: "35px Courier", fill: "0#000000"});
        this.returnToMenuButton.on("pointerdown", this.ReturnToMenu.bind(this));
        this.returnToMenuButton.on("pointerover", function(event) 
        {
            this.returnToMenuButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.returnToMenuButton.on("pointerout", function(event) 
        {
            this.returnToMenuButton.setScale(scale);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));
        //Texto de victoria:
        this.add.text(425, 50, "FIN DEL JUEGO", {font: "100px Courier", fill: "0#FFFFFF"});
        if(this.player1.killed)
        {
            this.add.text(80, 200, "Jugador 1 muerto. Gana jugador 2.", {font: "75px Courier", fill: "0#FFFFFF"});
        }
        else if(this.player2.bullets == 0)
        {
            this.add.text(60, 200, "Balas agotadas. Gana el jugador 1.", {font: "75px Courier", fill: "0#FFFFFF"});
        }
    }

    update()
    {

    }

    PlayAgain()
    {
        this.scene.run("InfoMenu");
        this.scene.start("Game");
    }

    ReturnToMenu()
    {
        this.scene.stop("GameEndedMenu");
    }
}