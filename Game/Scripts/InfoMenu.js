class InfoMenu extends Phaser.Scene
{
    constructor()
    {
        super({key:"InfoMenu"});
    }

    preload()
    {
        this.load.image("Info", "./Sprites/Info.png");
    }

    create()
    {
        this.infoButton = this.add.image(1535, 50, "Info").setScale(0.15).setInteractive(); //Botón de pistas del jugador
        this.info = this.add.image(1535, 200, "Info").setScale(0.4).setInteractive();
        this.info.setVisible(false);
        this.infoOpened = false;
        this.infoButton.on("pointerdown", this.ToggleInfo.bind(this));
        this.infoButton.on("pointerover", function(pointer)
        {
            game.canvas.style.cursor = "pointer";
        });
        this.infoButton.on("pointerout", function(pointer)
        {
            game.canvas.style.cursor = "crosshair";
        });
    }

    update()
    {
        
    }

    ToggleInfo()
    {
        if(this.infoOpened)
        {
            this.info.setVisible(false);
            this.infoOpened = false;
        }
        else
        {
            this.info.setVisible(true);
            this.infoOpened = true;
        }
        
    }
}