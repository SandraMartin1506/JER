class CustomizationP2Menu extends Phaser.Scene
{
    constructor()
    {
        super({key: "CustomizationP2Menu"});
    }

    preload()
    {
        this.load.image("ConfirmButton", "./Sprites/confirm.png");
        this.load.image("Player1Customizes", "./Sprites/player1customizes.png");
        this.load.image("HojaCuaderno", "./Sprites/hojacuaderno.png");
    }

    create()
    {
        var customizationP1 = this.scene.get("CustomizationP1Menu");
        this.numHat = customizationP1.numHat;
        this.numTop = customizationP1.numTop;
        this.numBot = customizationP1.numBot;
        this.fakeHint = customizationP1.fakeHint;

        this.cameras.main.setBackgroundColor('#FFFFFF')
        const hoja = this.add.image(((this.game.config.width*(0.2)/2)),(this.game.config.height*(0.3))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja.setScale(1.7).setAngle(30);
        const hoja2 = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(1))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja2.setScale(2).setAngle(-3);
        const title = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(0.17))/2, "Player1Customizes").setOrigin(0.5,0.5);
        title.setScale(1);
        const hoja3 = this.add.image(((this.game.config.width*(0.2)/2)),(this.game.config.height*(2.4))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja3.setScale(1.7).setAngle(-60);

        //Boton confirmar
        const confirm = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(1+0.8))/2, "ConfirmButton").setDepth(53);
        this.InteractButton(confirm)
        confirm.on("pointerdown", function(event) 
        {
            this.GoToGame();
        }.bind(this));

        const firstHint = "He looks old";
        const secondHint = "He looks weird";
        const falseHint = this.fakeHint;

        this.hints = [firstHint, secondHint, falseHint]

        ///Random orden
        for(var i=0; i<this.hints.length; i++){
            var rep = this.hints[i];
            var otheri = Math.floor(Math.random()*this.hints.length);
            this.hints[i]= this.hints[otheri]
            this.hints[otheri] = rep;
        }
        this.Hint1 = this.add.text((this.game.config.width*(1-0.85)/2), (this.game.config.height*(1+0.30))/2, this.hints[0], { font: '32px cursive', fill: '#000000', wordWrap: { width: 500 }  });
        this.Hint2 = this.add.text((this.game.config.width*(1-0.85)/2), (this.game.config.height*(1+0.40))/2, this.hints[1], { font: '32px cursive', fill: '#000000', wordWrap: { width: 500 }  });
        this.Hint3 = this.add.text((this.game.config.width*(1-0.85)/2), (this.game.config.height*(1+0.50))/2, this.hints[2], { font: '32px cursive', fill: '#000000', wordWrap: { width: 500 }  });

        //alerta inicial
        this.alertTime = 1;
        this.alertBox = this.add.rectangle(0,0, this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(59);
        this.alertText = this.add.text((this.game.config.width*(1)/2), (this.game.config.height*(1))/2, "PLAYER 1 DON'T LOOK", { font: '120px Arial', fill: '#ffffff',wordWrap: { width: 800 }}).setOrigin(0.5,0.5).setDepth(60);
    }

    update()
    {
        if (this.alertTime>0) {this.alertTime-=1}
        if (this.alertTime<=0){
            if (this.alertBox.alpha>0){this.alertBox.alpha-=0.01}
            if (this.alertText.alpha>0){this.alertText.alpha-=0.05}
        }
    }

    InteractButton(button){

        button.setInteractive();

        button.on("pointerover", function(event) 
        {
            button.setTint(0xffff1c00);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        button.on("pointerout", function(event) 
        {
            button.clearTint();
            game.canvas.style.cursor = "default";
        }.bind(this));
    }

    GoToGame()
    {
        this.scene.stop("CustomizationP2Menu");
        this.scene.start("Game");
        this.scene.run("InfoMenu");
    }

}