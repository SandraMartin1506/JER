class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super({key:"MainMenu", active: true});
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
        this.load.image("Background", "./Sprites/fondohacker.png");
        this.load.image("BackgroundBlack", "./Sprites/fondohackernegro.png");
        this.load.audio("Paper", "./Sounds/paper.mp3");
        this.load.audio("Click", "./Sounds/click.mp3");

                //Ropa
                this.load.spritesheet("BanadorRojo", "./Sprites/Clothing/banador_rojo.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("BanadorAzul", "./Sprites/Clothing/banador_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("BanadorAmarillo", "./Sprites/Clothing/banador_amarillo.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("VaquerosAzul", "./Sprites/Clothing/vaqueros_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("VaquerosNegros", "./Sprites/Clothing/vaqueros_negros.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("VaquerosRojos", "./Sprites/Clothing/vaqueros_rojos.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("FaldaRoja", "./Sprites/Clothing/falda_roja.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("FaldaNaranja", "./Sprites/Clothing/falda_naranja.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("FaldaVerde", "./Sprites/Clothing/falda_verde.png", {frameWidth: 250, frameHeight: 450});
        
                this.load.spritesheet("GorrolanaAzul", "./Sprites/Clothing/gorrolana_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("GorrolanaRojo", "./Sprites/Clothing/gorrolana_rojo.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("GorrolanaAmarillo", "./Sprites/Clothing/gorrolana_amarillo.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("GorraAzul", "./Sprites/Clothing/gorra_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("GorraRoja", "./Sprites/Clothing/gorra_roja.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("GorraVerde", "./Sprites/Clothing/gorra_verde.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("SombreroMarron", "./Sprites/Clothing/sombrero_marron.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("SombreroAzul", "./Sprites/Clothing/sombrero_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("SombreroNegro", "./Sprites/Clothing/sombrero_negro.png", {frameWidth: 250, frameHeight: 450});
        
                this.load.spritesheet("CamisaAzul", "./Sprites/Clothing/camisa_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("CamisaBlanca", "./Sprites/Clothing/camisa_blanca.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("CamisaRoja", "./Sprites/Clothing/camisa_roja.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("CamisetaRosa", "./Sprites/Clothing/camiseta_rosa.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("CamisetaVerde", "./Sprites/Clothing/camiseta_verde.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("CamisetaAmarilla", "./Sprites/Clothing/camiseta_amarilla.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("TanktopAmarillo", "./Sprites/Clothing/tanktop_amarillo.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("TanktopAzul", "./Sprites/Clothing/tanktop_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("TanktopRojo", "./Sprites/Clothing/tanktop_rojo.png", {frameWidth: 250, frameHeight: 450});
    }

    create()
    {

        this.backgroundImage1 = this.add.image(0,0,"Background").setOrigin(0,0);
        this.backgroundImage2 = this.add.image(this.game.config.width,0,"Background").setOrigin(0,0);
        this.backgroundBlack = this.add.image(0,0,"BackgroundBlack").setOrigin(0,0);
        //Audio de los botones
        this.clickSound = this.sound.add("Click");
        this.paperSound = this.sound.add("Paper");
        //Variables de escalado:
        var scale = 10;
        this.StartButton = this.add.image(this.game.config.width/2, this.game.config.height/2 - 100, "buttonPlaceholder");
        this.StartButton.setScale(scale);
        this.StartButton.setRotation(Phaser.Math.DegToRad(90));
        this.StartButton.setInteractive();
        this.add.text(665, 330, "New Game", {font: "50px Courier", fill: "0#000000"});
        this.StartButton.on("pointerdown", this.StartGame.bind(this));
        this.StartButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.StartButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.StartButton.on("pointerout", function(event) 
        {
            this.StartButton.setScale(scale);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));
        //Botón para los créditos:
        this.creditsButton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 100, "buttonPlaceholder");
        this.creditsButton.setScale(scale);
        this.creditsButton.setRotation(Phaser.Math.DegToRad(90));
        this.creditsButton.setInteractive();
        this.add.text(665, 530, "Credits", {font: "50px Courier", fill: "0#000000"});
        this.creditsButton.on("pointerdown", this.PlayCredits.bind(this));
        this.creditsButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.creditsButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.creditsButton.on("pointerout", function(event) 
        {
            this.creditsButton.setScale(scale);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));


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

    StartGame()
    {
        this.clickSound.play();
        this.scene.add("CustomizationP1Menu",new CustomizationP1Menu);
        this.scene.stop("MainMenu");
        this.scene.start("CustomizationP1Menu");
    }

    PlayCredits()
    {
        this.clickSound.play();
    }
}