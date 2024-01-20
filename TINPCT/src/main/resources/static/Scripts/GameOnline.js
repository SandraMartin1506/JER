class GameOnline extends Phaser.Scene
{
    constructor()
    {
        super({key: "GameOnline"}); 
    }

    preload()
    {
        //IMÁGENES
        this.load.image("BackgroundP", "./Sprites/fondo.png")
        this.load.image("Bullet", "./Sprites/bala1.png");
        this.load.image("Crosshair", "./Sprites/Mira.png");
        this.load.image("DeadBody", "./Sprites/Sprite_morto.png");
        this.load.spritesheet("Character", "./Sprites/SpriteSheet.png", {frameWidth: 250, frameHeight: 450});
        this.load.spritesheet("Explosion", "./Sprites/explosionspritesheet.png", {frameWidth: 400, frameHeight: 550});
        //AUDIO
        this.load.audio("Crowd","./Sounds/crowd.mp3");
        this.load.audio("Click","./Sounds/click.mp3");
        this.load.audio("Grenade","./Sounds/grenade.mp3");
        this.load.audio("Sniper","./Sounds/sniper.mp3");
    }

    create()
    {
        this.cameras.main.setBackgroundColor('#181818')
        this.backgroundImage1 = this.add.image(0,0,"BackgroundP").setOrigin(0,0).setAlpha(0.4);;
        this.backgroundImage1.depth = -1;
        //Panel de fade in:
        this.panel = this.add.rectangle(0,0,this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(1000);
        //Audio
        this.clickSound = this.sound.add("Click");
        this.gameSound = this.sound.add("Crowd");
        this.gameSound.play({loop: true});
        //Ropa:
        this.hats = this.scene.get("MainMenu").spritesheetsHat;
        this.tops = this.scene.get("MainMenu").spritesheetsTop;
        this.bottoms = this.scene.get("MainMenu").spritesheetsBot;
        //Jugadores:
        this.player;
        this.player2;
		window.socket.onmessage = (event) => {
			var content = event.data.split(";");
			console.log(content[0]);
			if(content[0] === "p1") this.InitializePlayer(event);
			else if(content[0] === "p2") this.InitializePlayer2(event);
			else if(content[0] === "movePlayer")
			{
				console.log("moviendo al jugador");
				console.log(content[2]);
				console.log(content[1]);
				if(content[2] == "move") this.player.MovePlayer(content[1]);
				else this.player.StopPlayer(content[1]);
			}
		}
		var msg = {type: "GetP1Info"};
		window.socket.send(JSON.stringify(msg));
		if(window.player === "Player2")
		{
			var msg = {type: "GetP2Info"};
			window.socket.send(JSON.stringify(msg));
		}
        /*/NPCs:
        var minNPC = this.scene.get("NPCNumber").minNPC;
        var maxNPC = this.scene.get("NPCNumber").maxNPC;
        var numberNPC = Math.floor(Math.random() * (maxNPC-minNPC+1) + minNPC); //NPCs son un número aleatorio entre 9 y 15 (de momento)
	    this.npcs = new Array(numberNPC);
        //this.InitializeNPCS(); //Se inicializan los NPCs con posiciones aleatorias
        //Animaciones:*/
        this.GenerateAnimations();
       	//Otros:
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        if(window.player === "Player1") game.canvas.style.cursor = "none"; //A partir de ahora el cursor será una mira (no la nuestra, una por defecto)
        else game.canvas.style.cursor = "crosshair";
        //this.gameEndedMenu = new GameEndedMenu(this.player, this.player2);
    }

    update(time, deltaTime)
    { 
        if(this.panel.alpha > 0) this.panel.alpha -= deltaTime/500;
        if(window.player === "Player1" && this.mission !== undefined) this.mission.CheckMission();
        this.UpdateCharacters(deltaTime);
        //this.CheckGameCondition();
    }

    InitializeNPCS() //Inicializa todos los NPCs en posiciones aleatorias
    {
        for(var i = 0; i < this.npcs.length; i++)
        {
            var randomX = Math.floor(Math.random() * (1550-50+1) + 50);
            var randomY = Math.floor(Math.random() * (850-50+1) + 50);
            var randomHat = Math.floor(Math.random() * this.hats.length);
            var randomTop = Math.floor(Math.random() * this.tops.length);
            var randomBotton = Math.floor(Math.random() * this.bottoms.length);
            this.npcs[i] = new NPC(randomX, randomY, this, "Character", this.hats[randomHat], this.tops[randomTop], this.bottoms[randomBotton], "DeadBody");
        }
    }

    InitializePlayer(event) //Inicializa al jugador en una posición aleatoria
    {
	    var components = event.data.split(";");
        var hatNum = parseInt(components[2]);
        var topNum = parseInt(components[3]);
        var botNum = parseInt(components[4]);
        var initialX = parseInt(components[5]);
        var initialY = parseInt(components[6]);
	    this.player = new PlayerOnline(initialX, initialY, this, "Character", this.hats[hatNum], this.tops[topNum], this.bottoms[botNum], "DeadBody");
    	var numMission = parseInt(components[1]);
        this.mission = new Missions(numMission, this.player, this);
        if(window.player === "Player1") {
			this.player.ManageInput(this); //Se añade la gestión del input al ser pulsada una tecla. Se pasa como parámetro la escena del juego.
        	this.player.StopMovement(this); //Gestión del input: cuando deja de pulsarse la tecla de movimiento el jugador se queda quieto
        	console.log("Jugador 1 inicializado");
        }
        else{
        	this.scene.add("InfoMenuOnline", new InfoMenuOnline(hatNum, topNum, botNum, components[7]));
        	this.scene.run("InfoMenuOnline"); //La información está siempre disponible mientras se juega
		}
        
    }

    InitializePlayer2(event) 
    {
       var components = event.data.split(";");
       var weaponT = components[1];
       this.player2 = new Player2Online(this, weaponT, "Bullet", "Crosshair", this.gameSound, "Explosion"); // Le paso la escena actual. De momento le paso directamente el arma yo, pero después será una variable que vendrá dada por la escena de personalización
       this.input.on('pointermove',this.player2.UpdatePositionP2.bind(this.player2), this); //Cada vez que el ratón se mueve le paso la función para cambiar la posición del jugador 2 (que va a ser la del ratón)
       //le paso el contexto con el último this para que lo haga bien
       this.player2.InitializeBullets();  //Inicializa las balas del jugador según su arma
       this.player2.ManageBullets(); //Se añade la gestión de las balas. Cada vez que se haga click izquierdo, se pierde una bala
       console.log("Jugador 2 inicializado");
    }

    UpdateCharacters(deltaTime) //Actualiza posiciones de los jugadores y NPCs
    {
        /*for(var i = 0; i < this.npcs.length; i++)
        {
            this.npcs[i].UpdatePosition(deltaTime);
        }*/
        if(this.player !== undefined) this.player.UpdatePosition(deltaTime);
        if(window.player === "Player2"){
			console.log("Obteniendo datos");
			var msg = {type: "ObtainP1Input"}
			window.socket.send(JSON.stringify(msg));
		} 
        //Si el jugador 2 ha disparado se para momentáneamente el sonido del juego con esta función
        //if(window.player === "Player2") this.player2.StopGameSound();
    }
/*
    CheckGameCondition()
    {
        if(this.player2.bullets == 0 || this.player.killed || this.player.missionAccomplished) 
        {
            this.gameSound.stop();
            this.scene.add("GameEndedMenu",this.gameEndedMenu);
            this.scene.run("GameEndedMenu");
            this.scene.pause();
            this.scene.pause("InfoMenu");
        }
    }*/

    GenerateAnimations()
    {
        this.GenerateCustomAnimation("Character");
        this.hats.forEach(hat => 
            {
                this.GenerateCustomAnimation(hat);
            });
        this.tops.forEach(top => 
            {
                this.GenerateCustomAnimation(top);
            });
        this.bottoms.forEach(bottom =>
            {
                this.GenerateCustomAnimation(bottom);
            });
    }

    GenerateCustomAnimation(spriteSheet)
    {
        if(spriteSheet !== undefined)
        {   
            var newKey = spriteSheet + "_idle_front";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [0]
                        }),
                    repeat: -1,
                    frameRate: 1
                }
            );
            newKey = spriteSheet + "_idle_back";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [10]
                        }),
                    repeat: -1,
                    frameRate: 1
                }
            );
            newKey = spriteSheet + "_idle_left";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [15]
                        }),
                    repeat: -1,
                    frameRate: 1
                }
            );
            newKey = spriteSheet + "_idle_right";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [1]
                        }),
                    repeat: -1,
                    frameRate: 1
                }
            );
            newKey = spriteSheet + "_front_walk";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [6, 7, 8, 9, 0]
                        }),
                    repeat: -1,
                    frameRate: 6
                }
            );
            newKey = spriteSheet + "_back_walk";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [11, 12, 13, 14, 10]
                        }),
                    repeat: -1,
                    frameRate: 6
                }
            );
            newKey = spriteSheet + "_left_walk";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [16, 17, 18, 19, 15]
                        }),
                    repeat: -1,
                    frameRate: 6
                }
            );
            newKey = spriteSheet + "_right_walk"
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [2, 3, 4, 5, 1]
                        }),
                    repeat: -1,
                    frameRate: 6
                }
            );
        }
    }
}

