class CustomizationP1Menu extends Phaser.Scene
{
    constructor()
    {
        super({key: "CustomizationP1Menu", active: true}); 
    }

    preload()
    {
        this.load.image("ArrowButton", "./Sprites/flechas.png");
        this.load.image("ConfirmButton", "./Sprites/confirm.png");
        this.load.spritesheet("SpriteSheet", "./Sprites/SpriteSheet.png", {frameWidth: 250, frameHeight: 450});
        this.load.spritesheet("BanadorRojo", "./Sprites/banador_rojo.png", {frameWidth: 250, frameHeight: 450});
        this.load.spritesheet("BanadorAzul", "./Sprites/banador_azul.png", {frameWidth: 250, frameHeight: 450});
    }

    create()
    {



        //Pintar fondo
        this.cameras.main.setBackgroundColor('#FFFF00')

        //Títulos pantalla
        this.add.text(this.game.config.width/2, (this.game.config.height*(1-0.8))/2, "JUGADOR 1 PERSONALIZA", {font: "35px Courier", fill: "0#000000"}).setOrigin(0.5, 0.5);
        this.add.text(this.game.config.width/2, (this.game.config.height*(1-0.9))/2, "JUGADOR 2 NO MIRA", {font: "35px Courier", fill: "0#000000"}).setOrigin(0.5, 0.5);

        // Crear sprites personaje
        this.spriteChar = this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, 'SpriteSheet')
        this.hatNum = 0;
        this.spriteHat = undefined;
        this.topNum = 0;
        this.spriteTop = undefined;
        this.botNum = 0;
        this.spriteBot = undefined;

        //Arrays con los spritesheets
        this.spritesheetsHat = ["","BanadorRojo"];
        this.spritesheetsTop = ["","BanadorRojo"];
        this.spritesheetsBot = ["","BanadorRojo","BanadorAzul"];

        //Boton gorro 1
        const changeHat1 = this.add.image(((this.game.config.width*(1+0.3)/2)),(this.game.config.height*(1-0.3))/2, "ArrowButton");
        changeHat1.setInteractive();
        this.ArrowButton(this,changeHat1)
        changeHat1.on("pointerdown", function(event) 
        {
            this.PartChange(1,false);
        }.bind(this));
        //Boton gorro 2
        const changeHat2 = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1-0.3))/2, "ArrowButton");
        changeHat2.setFlipX(1);
        this.ArrowButton(this,changeHat2)
        changeHat2.on("pointerdown", function(event) 
        {
            this.PartChange(1,true);
        }.bind(this));
        //-----------------------------CUERPO
        //Boton cuerpo 1
        const changeTop1 = this.add.image(((this.game.config.width*(1+0.3)/2)),(this.game.config.height*(1-0.1))/2, "ArrowButton");
        this.ArrowButton(this,changeTop1)
        changeTop1.on("pointerdown", function(event) 
        {
            this.PartChange(2,false);
        }.bind(this));
        //Boton cuerpo 2
        const changeTop2 = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1-0.1))/2, "ArrowButton");
        changeTop2.setFlipX(1);
        this.ArrowButton(this,changeTop2)
        changeTop2.on("pointerdown", function(event) 
        {
            this.PartChange(2,true);
        }.bind(this));
        //-----------------------------PIERNAS
        //Boton piernas 1
        const changeBot1 = this.add.image(((this.game.config.width*(1+0.3)/2)),(this.game.config.height*(1+0.1))/2, "ArrowButton");
        this.ArrowButton(this,changeBot1)
        changeBot1.on("pointerdown", function(event) 
        {
            this.PartChange(3,false);
        }.bind(this));

        //Boton piernas 2
        var botPart=0
        const changeBot2 = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1+0.1))/2, "ArrowButton");
        changeBot2.setFlipX(1);
        this.ArrowButton(this,changeBot2)
        changeBot2.on("pointerdown", function(event) 
        {
            this.PartChange(3,true);
        }.bind(this));

        //Boton confirmar

        const confirm = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(1+0.8))/2, "ConfirmButton");
        this.ArrowButton(this,confirm)
        confirm.on("pointerdown", function(event) 
        {
            this.GoToCustomP2();
        }.bind(this));


        
            // Introducir pista falsa
        this.textHint = this.add.text((this.game.config.width*(1-0.9)/2), (this.game.config.height*(1-0.6))/2, "Escribe la pista falsa: ", { fontSize: '24px', fill: '#000000' });

        this.fakeHint = this.add.text((this.game.config.width*(1-0.9)/2), (this.game.config.height*(1-0.5))/2, "", { font: '32px', fill: '#000000' });
        this.input.keyboard.on('keydown', event =>
        {

        if (event.keyCode === 8 && this.fakeHint.text.length > 0)
        {
            this.fakeHint.text = this.fakeHint.text.slice(0,this.fakeHint.text.length-1)
        }
        else if (event.keyCode === 32 || (event.keyCode >= 190 && event.keyCode <= 192) || (event.keyCode >= 48 && event.keyCode <= 90))
        {
            this.fakeHint.text += event.key;
        }
        });

        //Mision
        this.textMission = this.add.text((this.game.config.width*(1-0.9)/2), (this.game.config.height*(1+0.2))/2, "Mission: ", { fontSize: '24px', fill: '#000000' });
        this.numMission = Math.floor(Math.random() * (3-1+1) + 1); 
        const missionDesc = [""]
        this.missionObjective = this.add.text((this.game.config.width*(1-0.9)/2), (this.game.config.height*(1+0.3))/2, this.numMission, { font: '32px', fill: '#000000' });
        

        
    }

    update()
    {

    }

    ArrowButton(scene,button){

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

        //button.on("pointerdown", this.BotAdd.bind(this));
    }

    PartChange(part,add){

        switch(part){

            case 1:
                if (add){
                this.hatNum+=1;
                } else { 
                    this.hatNum-=1; 
                    if (this.hatNum<0) {
                        this.hatNum = Math.abs((this.spritesheetsHat.length) + (this.hatNum))
                    }
                }

                this.hatNum = this.hatNum%(this.spritesheetsHat.length)

                if ((this.hatNum)==0)
                {
                    this.spriteHat.destroy();
                }else {
                    
                    var newsprite = this.spritesheetsHat[this.hatNum]
                    if (this.spriteHat!=undefined){this.spriteHat.destroy();}
                    this.spriteHat= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite);
                }
            break;

            case 2:
                if (add){
                this.topNum+=1;
                } else { 
                    this.topNum-=1; 
                    if (this.topNum<0) {
                        this.topNum = Math.abs((this.spritesheetsTop.length) + (this.topNum))
                    }
                }

                this.topNum = this.topNum%(this.spritesheetsTop.length)

                if ((this.topNum)==0)
                {
                    this.spriteTop.destroy();
                }else {
                    
                    var newsprite = this.spritesheetsTop[this.topNum]
                    if (this.spriteTop!=undefined){this.spriteTop.destroy();}
                    this.spriteTop= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite);
                }
            break;


            case 3:
                if (add){
                this.botNum+=1;
                } else { 
                    this.botNum-=1; 
                    if (this.botNum<0) {
                        this.botNum = Math.abs((this.spritesheetsBot.length) + (this.botNum))
                    }
                }

                this.botNum = this.botNum%(this.spritesheetsBot.length)

                if ((this.botNum)==0)
                {
                    this.spriteBot.destroy();
                }else {
                    
                    var newsprite = this.spritesheetsBot[this.botNum]
                    if (this.spriteBot!=undefined){this.spriteBot.destroy();}
                    this.spriteBot= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite);
                }
            break;

        }
        
    }

    GoToCustomP2()
    {
        this.scene.add("Game", new Game);
        this.scene.start("Game");
        this.scene.stop("CustomizationP1Menu")
        this.scene.remove("CustomizationP1Menu")
    }
}