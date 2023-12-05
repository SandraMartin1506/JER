class InfoMenu extends Phaser.Scene
{
    constructor()
    {
        super({key:"InfoMenu"});
    }

    preload()
    {
        this.load.image("Info", "./Sprites/Info.png");
        this.load.image("Paper", "./Sprites/hoja1.png");
    }

    create()
    {
        this.infoButton = this.add.image(1535, 50, "Info").setScale(0.15).setInteractive(); //Botón de pistas del jugador
        this.info = this.add.image(1435, 375, "Paper").setScale(0.35);
        this.info.alpha = 0.5;
        this.info.setVisible(false);
        this.infoButton.on("pointerdown", this.ToggleInfo.bind(this));
        this.infoButton.on("pointerover", function(pointer)
        {
            game.canvas.style.cursor = "pointer";
        });
        this.infoButton.on("pointerout", function(pointer)
        {
            game.canvas.style.cursor = "crosshair";
        });
        //Texto:
        var textStyle = 
        {
            fontFamily: "Arial",
            fontStyle: "bold",
            color: "#000000",
            wordWrap: {width: 240, height: 50, useAdvancedWrap: true}
        }
        this.hint1 = this.add.text(1330, 150, "-> El jugador 1 se encuentra desnudo", textStyle).setVisible(false);
        this.hint2 = this.add.text(1330, 225, "-> Realmente todos los personajes están desnudos", textStyle).setVisible(false);
        this.hint3 = this.add.text(1330, 300, "-> PlaceHolder 3 ", textStyle).setVisible(false);
    }

    update()
    {
        
    }

    ToggleInfo()
    {
        this.info.setVisible(!this.info.visible);
        this.hint1.setVisible(!this.hint1.visible);
        this.hint2.setVisible(!this.hint2.visible);
        this.hint3.setVisible(!this.hint3.visible);
    }
}