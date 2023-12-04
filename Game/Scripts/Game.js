class Game extends Phaser.Scene
{
    constructor()
    {
        super({key: "Game", active: true}); 
    }

    preload()
    {
        this.load.image("Bullet", "./Sprites/bala.png");
        this.load.image("Crosshair", "./Sprites/Mira.png");
        this.load.spritesheet("SpriteSheet", "./Sprites/SpriteSheet.png", {frameWidth: 250, frameHeight: 450});
    }

    create()
    {
        //Jugadores:
        this.player;
        this.player2;
        this.InitializePlayer(); //El jugador también tendrá una posición aleatoria
        this.InitializePlayer2();
        //NPCs:
        var numberNPC = Math.floor(Math.random() * (15-9+1) + 9); //NPCs son un número aleatorio entre 9 y 15 (de momento)
	    this.npcs = new Array(numberNPC);
        this.InitializeNPCS(); //Se inicializan los NPCs con posiciones aleatorias
        //Manejo de input:
        this.player.ManageInput(this); //Se añade la gestión del input al ser pulsada una tecla. Se pasa como parámetro la escena del juego.
        this.player2.ManageBullets(); //Se añade la gestión de las balas. Cada vez que se haga click izquierdo, se pierde una bala
        this.player.StopMovement(this); //Gestión del input: cuando deja de pulsarse la tecla de movimiento el jugador se queda quieto
        this.input.keyboard.on("keydown", this.PauseGame.bind(this)); //Si se presiona ESC se pausa el juego
        //Otros:
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        game.canvas.style.cursor = "crosshair"; //A partir de ahora el cursor será una mira (no la nuestra, una por defecto)
        this.scene.run("InfoMenu"); //La información está siempre disponible mientras se juega
        this.gameEndedMenu = new GameEndedMenu(this.player, this.player2);
    }

    update(time, deltaTime)
    { 
        this.UpdateCharacters();
        this.CheckGameCondition();
    }

    InitializeNPCS() //Inicializa todos los NPCs en posiciones aleatorias
    {
       
        for(var i = 0; i < this.npcs.length; i++)
        {
            var randomX = Math.floor(Math.random() * (1550-50+1) + 50);
            var randomY = Math.floor(Math.random() * (850-50+1) + 50);
            this.npcs[i] = new NPC(randomX, randomY, this, "SpriteSheet");
        }
    }

    InitializePlayer() //Inicializa al jugador en una posición aleatoria
    {
        var randomX = Math.floor(Math.random() * (1550 - 50 + 1) + 50);
	    var randomY = Math.floor(Math.random() * (850 - 50 + 1) + 50);
	    this.player = new Player(randomX, randomY, this, "SpriteSheet");
    }

    InitializePlayer2() {
       this.player2 = new Player2(this, "F", "Bullet", "Crosshair"); // Le paso la escena actual. De momento le paso directamente el arma yo, pero después será una variable que vendrá dada por la escena de personalización
       this.input.on('pointermove',this.player2.UpdatePositionP2.bind(this.player2), this); //Cada vez que el ratón se mueve le paso la función para cambiar la posición del jugador 2 (que va a ser la del ratón)
       //le paso el contexto con el último this para que lo haga bien
       this.player2.InitializeBullets();  //Inicializa las balas del jugador según su arma
    }

    UpdateCharacters() //Actualiza posiciones de los jugadores y NPCs
    {
        for(var i = 0; i < this.npcs.length; i++)
        {
            this.npcs[i].UpdatePosition();
        }
        this.player.UpdatePosition();
    }

    PauseGame(event)
    {
        if(event.key === "Escape")
        {
            this.scene.run("PauseMenu");
            this.scene.pause();
            this.scene.pause("InfoMenu");
        }
    }

    CheckGameCondition()
    {
        if(this.player2.bullets == 0 || this.player.killed) 
        {
            this.scene.add("GameEndedMenu",this.gameEndedMenu);
            this.scene.run("GameEndedMenu");
            this.scene.pause();
            this.scene.pause("InfoMenu");
        }
    }
}
