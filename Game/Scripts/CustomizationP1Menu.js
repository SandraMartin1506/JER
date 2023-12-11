class CustomizationP1Menu extends Phaser.Scene
{
    constructor()
    {
        super({key: "CustomizationP1Menu", active: true}); 
    }

    preload()
    {
        this.load.image("Player1Customizes", "./Sprites/player1customizes.png");
        this.load.image("ArrowButton", "./Sprites/flechas.png");
        this.load.image("ConfirmButton", "./Sprites/confirm.png");
        this.load.image("RandomButton", "./Sprites/dado.png");
        this.load.image("PostIt", "./Sprites/postit.png");
        this.load.image("HojaCuaderno", "./Sprites/hojacuaderno.png");
        this.load.spritesheet("SpriteSheet", "./Sprites/SpriteSheet.png", {frameWidth: 250, frameHeight: 450});
        this.load.spritesheet("BanadorRojo", "./Sprites/banador_rojo.png", {frameWidth: 250, frameHeight: 450});
        this.load.spritesheet("BanadorAzul", "./Sprites/banador_azul.png", {frameWidth: 250, frameHeight: 450});
        this.load.spritesheet("VaquerosAzul", "./Sprites/vaqueros.png", {frameWidth: 250, frameHeight: 450});
        this.load.spritesheet("GorroLana1", "./Sprites/gorro_lana_1.png", {frameWidth: 250, frameHeight: 450});
        this.load.spritesheet("Camisa1", "./Sprites/camisa_1.png", {frameWidth: 250, frameHeight: 450});
    }

    create()
    {
        //Decoración fondo
        this.cameras.main.setBackgroundColor('#FFFFFF')
        const hoja2 = this.add.image(((this.game.config.width*(0.2)/2)),(this.game.config.height*(0.3))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja2.setScale(1.7).setAngle(30);
        const hoja3 = this.add.image(((this.game.config.width*(1.7)/2)),(this.game.config.height*(0.3))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja3.setScale(1.7).setAngle(-10);
        const hoja1 = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(1))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja1.setScale(1.7).setFlipX(1).setAngle(-20);
        const hojaIzq1 = this.add.image(((this.game.config.width*(1.6)/2)),(this.game.config.height*(1.5))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hojaIzq1.setScale(1.5).setAngle(-4);
        const hojaDer1 = this.add.image(((this.game.config.width*(0.3)/2)),(this.game.config.height*(1.5))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hojaDer1.setScale(1.7).setAngle(3);
        
        // Crear sprites personaje
        this.spriteChar = this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, 'SpriteSheet')
        this.hatNum = 0;
        this.spriteHat = undefined;
        this.topNum = 0;
        this.spriteTop = undefined;
        this.botNum = 0;
        this.spriteBot = undefined;

        //Arrays con los spritesheets
        this.spritesheetsHat = [undefined,"GorroLana1"];
        this.spritesheetsTop = [undefined,"Camisa1"];
        this.spritesheetsBot = [undefined,"BanadorRojo","BanadorAzul","VaquerosAzul"];

        //Boton gorro 1
        const changeHat1 = this.add.image(((this.game.config.width*(1+0.3)/2)),(this.game.config.height*(1-0.3))/2, "ArrowButton");
        this.InteractButton(changeHat1)
        changeHat1.on("pointerdown", function(event) 
        {
            this.PartChange(1,false);
        }.bind(this));
        //Boton gorro 2
        const changeHat2 = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1-0.3))/2, "ArrowButton");
        changeHat2.setFlipX(1);
        this.InteractButton(changeHat2)
        changeHat2.on("pointerdown", function(event) 
        {
            this.PartChange(1,true);
        }.bind(this));
        //-----------------------------CUERPO
        //Boton cuerpo 1
        const changeTop1 = this.add.image(((this.game.config.width*(1+0.3)/2)),(this.game.config.height*(1-0.1))/2, "ArrowButton");
        this.InteractButton(changeTop1)
        changeTop1.on("pointerdown", function(event) 
        {
            this.PartChange(2,false);
        }.bind(this));
        //Boton cuerpo 2
        const changeTop2 = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1-0.1))/2, "ArrowButton");
        changeTop2.setFlipX(1);
        this.InteractButton(changeTop2)
        changeTop2.on("pointerdown", function(event) 
        {
            this.PartChange(2,true);
        }.bind(this));
        //-----------------------------PIERNAS
        //Boton piernas 1
        const changeBot1 = this.add.image(((this.game.config.width*(1+0.3)/2)),(this.game.config.height*(1+0.1))/2, "ArrowButton");
        this.InteractButton(changeBot1)
        changeBot1.on("pointerdown", function(event) 
        {
            this.PartChange(3,false);
        }.bind(this));
        //Boton piernas 2
        const changeBot2 = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1+0.1))/2, "ArrowButton");
        changeBot2.setFlipX(1);
        this.InteractButton(changeBot2)
        changeBot2.on("pointerdown", function(event) 
        {
            this.PartChange(3,true);
        }.bind(this));
        //Boton randomizador
        const changeRandom = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1+0.4))/2, "RandomButton");
        this.InteractButton(changeRandom)
        changeRandom.on("pointerdown", function(event) 
        {
            this.ChangeRandom();
        }.bind(this));

        
        //Asignar y mostrar mision
        this.textMission = this.add.text((this.game.config.width*(1-0.75)/2), (this.game.config.height*(1+0.20))/2, "YOUR MISSION ! ! ", { font: '30px cursive', fill: '#ff0000' }).setAngle(-2);
        this.numMission = Math.floor(Math.random() * (8-1+1) + 1); 
        const missionDesc = ["Your objective is to visit every corner of the screen.",
        "Shit2.","Shit3.","Shit4.","Shit5.","Shit6.","Shit7.","Shit8.",];
        this.missionObjective = this.add.text((this.game.config.width*(1-0.85)/2), (this.game.config.height*(1+0.30))/2, missionDesc[this.numMission-1], { font: '32px cursive', fill: '#000000', wordWrap: { width: 500 }  });
        
        //Decorar
        const hojaDer = this.add.image(((this.game.config.width*(1.6)/2)),(this.game.config.height*(1.5))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hojaDer.setScale(1.5).setAngle(-4).setDepth(52);
        const hojaIzq = this.add.image(((this.game.config.width*(0.3)/2)),(this.game.config.height*(1.5))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hojaIzq.setScale(1.7).setAngle(3);
        hojaDer.setBlendMode(Phaser.BlendModes.MULTIPLY);
        hojaIzq.setBlendMode(Phaser.BlendModes.MULTIPLY);
        
        //Boton confirmar
        const confirm = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(1+0.8))/2, "ConfirmButton").setDepth(53);
        this.InteractButton(confirm)
        confirm.on("pointerdown", function(event) 
        {
            if (this.alertText.alpha==0){
            this.GoToCustomP2();
            }
        }.bind(this));

        const postit = this.add.image(((this.game.config.width*(0.43)/2)),(this.game.config.height*(0.70))/2, "PostIt").setOrigin(0.5,0.5);
        postit.setScale(2.5,2).setAngle(0);

        // Introducir pista falsa
        this.textHint = this.add.text((this.game.config.width*(1-0.75)/2), (this.game.config.height*(1-0.45))/2, "LIE ABOUT YOURSELF :", { font: '24px cursive', fill: '#ff0000' });
        this.textHint.setAngle(2)
        this.writeHint = this.add.text((this.game.config.width*(1-0.80)/2), (this.game.config.height*(1-0.3))/2, "Write a fake hint here...", { font: '30px cursive', fill: '#000000', wordWrap: { width: 400 } }).setAlpha(0.4);
        this.fakeHint = this.add.text((this.game.config.width*(1-0.80)/2), (this.game.config.height*(1-0.3))/2, "", { font: '30px cursive', fill: '#000000', wordWrap: { width: 400 } });
        this.input.keyboard.on('keydown', event =>
        {
            if (event.keyCode === 8 && this.fakeHint.text.length > 0)
            {
                this.fakeHint.text = this.fakeHint.text.slice(0,this.fakeHint.text.length-1)
                if (this.fakeHint.text.length == 0){
                    this.writeHint.setAlpha(0.4);
                }
            }
            else if (event.keyCode === 32 || (event.keyCode >= 190 && event.keyCode <= 192) || (event.keyCode >= 48 && event.keyCode <= 90))
            {
            if (this.fakeHint.width < 370){
                this.fakeHint.text += event.key;
                this.writeHint.setAlpha(0);
            }
            }
        });

        const title = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(0.17))/2, "Player1Customizes").setOrigin(0.5,0.5);
        title.setScale(1);

        //alerta inicial
        this.alertTime = 1;
        this.alertBox = this.add.rectangle(0,0, this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(59);
        this.alertText = this.add.text((this.game.config.width*(1)/2), (this.game.config.height*(1))/2, "PLAYER 2 DON'T LOOK", { font: '120px Arial', fill: '#ffffff',wordWrap: { width: 800 }}).setOrigin(0.5,0.5).setDepth(60);
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

    ChangeRandom(){
        //Hat
        var randomHat = Math.floor(Math.random()*(this.spritesheetsHat.length));
        this.hatNum = randomHat;
        if (this.spriteHat!=undefined){this.spriteHat.destroy();}
        if ((this.hatNum)!=0)
                {
                    var newsprite = this.spritesheetsHat[this.hatNum]
                    this.spriteHat= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite).setDepth(50);
                }

        //Top
        var randomTop = Math.floor(Math.random()*(this.spritesheetsTop.length));
        this.topNum = randomTop;
        if (this.spriteTop!=undefined){this.spriteTop.destroy();}
        if ((this.topNum)!=0)
                {
                    var newsprite2 = this.spritesheetsTop[this.topNum]
                    this.spriteTop= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite2).setDepth(49);
                }
                
        //Bot
        var randomBot = Math.floor(Math.random()*(this.spritesheetsBot.length));
        this.botNum = randomBot;
        if (this.spriteBot!=undefined){this.spriteBot.destroy();}
        if ((this.botNum)!=0)
                {
                    var newsprite3 = this.spritesheetsBot[this.botNum]
                    this.spriteBot= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite3).setDepth(51);
                }
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
                    this.spriteHat= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite).setDepth(50);
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
                    this.spriteTop= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite).setDepth(49);
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
                    this.spriteBot= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite).setDepth(51);
                }
            break;

        
    }
    }

    GoToCustomP2()
    {
        this.scene.add("CustomizationP2Menu", new CustomizationP2Menu(this.numMission,this.hatNum,this.topNum,this.botNum,this.fakeHint.text));
        this.scene.stop("CustomizationP1Menu");
        this.scene.start("CustomizationP2Menu");
        //this.scene.remove("CustomizationP1Menu");
    }
}