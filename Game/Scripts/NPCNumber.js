class NPCNumber extends Phaser.Scene
{
    constructor()
    {
        super({key: "NPCNumber"});
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
        this.load.image("Background", "./Sprites/fondohacker.png");
        this.load.image("BackgroundBlack", "./Sprites/fondohackernegro.png");
        this.load.audio("Paper", "./Sounds/paper.mp3");
        this.load.audio("Click", "./Sounds/click.mp3");
    }

    create()
    {
        //Panel y fondo:
        this.panel = this.add.rectangle(0,0,this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(100);
        this.backgroundImage1 = this.add.image(0,0,"Background").setOrigin(0,0);
        this.backgroundImage2 = this.add.image(this.game.config.width,0,"Background").setOrigin(0,0);
        this.backgroundBlack = this.add.image(0,0,"BackgroundBlack").setOrigin(0,0);
        game.canvas.style.cursor = "auto";
        //Máximo y mínimo de NPCs (por defecto en medio)
        this.minNPC = 30;
        this.maxNPC = 40;
        //Audio de los botones:
        this.clickSound = this.sound.add("Click");
        this.paperSound = this.sound.add("Paper");
        //Botones:
        var scale = 10;
        this.buttonBack = this.add.image(200, 200, "buttonPlaceholder").setScale(3).setRotation(Phaser.Math.DegToRad(90)).setInteractive();
        this.buttonLow = this.add.image(this.game.config.width/2, this.game.config.height/2 - 200, "buttonPlaceholder").setScale(scale).setRotation(Phaser.Math.DegToRad(90)).setInteractive();
        this.buttonNormal = this.add.image((this.game.config.width)/2, this.game.config.height/2, "buttonPlaceholder").setScale(scale).setRotation(Phaser.Math.DegToRad(90)).setInteractive();
        this.buttonHigh = this.add.image((this.game.config.width)/2, this.game.config.height/2 + 200, "buttonPlaceholder").setScale(scale).setRotation(Phaser.Math.DegToRad(90)).setInteractive();
        this.buttonNormal.setTint(0x00ffff);
        //Texto:
        this.add.text(665, 230, "Low", {font: "50px Courier", fill: "0#000000"});
        this.add.text(665, 430, "Normal", {font: "50px Courier", fill: "0#000000"});
        this.add.text(665, 630, "High", {font: "50px Courier", fill: "0#000000"});
        this.add.text(170, 190, "Back", {font: "25px Courier", fill: "0#000000"});
        //Manejo input:
        var buttonArray = [this.buttonLow, this.buttonNormal, this.buttonHigh];
        buttonArray.forEach((button) =>
        {
            button.on("pointerover", function()
            {
                this.paperSound.play();
                button.setScale(scale * 1.25);
                game.canvas.style.cursor = "pointer";
            }.bind(this));
            button.on("pointerout", function()
            {
                button.setScale(scale);
                game.canvas.style.cursor = "auto";
            }.bind(this));
        })
        this.buttonBack.on("pointerover", function(){game.canvas.style.cursor = "pointer";}.bind(this));
        this.buttonBack.on("pointerout", function(){game.canvas.style.cursor = "auto";}.bind(this));
        this.buttonBack.on("pointerdown", this.ReturnToMenu.bind(this));
        this.buttonLow.on("pointerdown", this.LowNPC.bind(this));
        this.buttonNormal.on("pointerdown", this.NormalNPC.bind(this));
        this.buttonHigh.on("pointerdown", this.HighNPC.bind(this));
    }

    update(time, deltaTime)
    {
        this.backgroundImage1.setPosition(this.backgroundImage1.x-0.05*deltaTime,0)
        this.backgroundImage2.setPosition(this.backgroundImage2.x-0.05*deltaTime,0)
        if (this.backgroundImage1.x<-this.game.config.width){
            this.backgroundImage1.setPosition(this.backgroundImage2.x+this.game.config.width,0)
        }
        if (this.backgroundImage2.x<-this.game.config.width){
            this.backgroundImage2.setPosition(this.backgroundImage1.x+this.game.config.width,0)
        }
    }

    LowNPC()
    {
        this.clickSound.play();
        this.minNPC = 20;
        this.maxNPC = 30;
        this.buttonLow.setTint(0x00ffff);
        this.buttonNormal.clearTint();
        this.buttonHigh.clearTint();
    }

    NormalNPC()
    {
        this.clickSound.play();
        this.minNPC = 30;
        this.maxNPC = 40;
        this.buttonNormal.setTint(0x00ffff);
        this.buttonLow.clearTint();
        this.buttonHigh.clearTint();
    }

    HighNPC()
    {   
        this.clickSound.play();
        this.minNPC = 40;
        this.maxNPC = 50;
        this.buttonHigh.setTint(0x00ffff);
        this.buttonNormal.clearTint();
        this.buttonLow.clearTint();
    }

    ReturnToMenu()
    {
        this.clickSound.play();
        this.scene.pause();
        this.scene.run("MainMenu");
    }

    ToggleVisibility(sceneVisibility) //Si no se pone el panel en activo se puede ver esta escena en las pantallas de carga
    {
        this.panel.visible = !sceneVisibility;
        //Esta función se llama cada vez que se accede a este menú, por lo que sincronizamos los backgrounds:
        if(sceneVisibility)
        {
            this.backgroundImage1.x = this.scene.get("MainMenu").backgroundImage1.x;
            this.backgroundImage2.x = this.scene.get("MainMenu").backgroundImage2.x;
        }
    }
}