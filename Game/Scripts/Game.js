class Game extends Phaser.Scene
{
    constructor()
    {
        super({key: "Game", active: true}); 
    }

    preload()
    {
        this.load.image("Character", "./Sprites/Character.png"); //Imagen de placeholder. De momento no funciona. 
        //SOLUCIONAR.
    }

    create()
    {
        var numberNPC = Math.floor(Math.random() * (60-40+1) + 40); //NPCs son un número aleatorio entre 40 y 60 (de momento)
	    this.npcs = new Array(numberNPC);
        this.InitializeNPCS(); //Se inicializan los NPCs con posiciones aleatorias
        this.player;
        this.InitializePlayer(); //El jugador también tendrá una posición aleatoria
        this.player.ManageInput(this); //Se añade la gestión del input al ser pulsada una tecla. Se pasa como parámetro la escena del juego.
        this.player.StopMovement(this); //Gestión del input: cuando deja de pulsarse la tecla de movimiento el jugador se queda quieto
    }

    update(time, deltaTime)
    {
        this.UpdateCharacters();
    }

    InitializeNPCS() //Inicializa todos los NPCs en posiciones aleatorias
    {
        for(var i = 0; i < this.npcs.length; i++)
        {
            var randomX = Math.floor(Math.random() * (1550-50+1) + 50);
            var randomY = Math.floor(Math.random() * (850-50+1) + 50);
            this.npcs[i] = new NPC(randomX, randomY, "Character", this);
        }
    }

    InitializePlayer() //Inicializa al jugador en una posición aleatoria
    {
        var randomX = Math.floor(Math.random() * (1550 - 50 + 1) + 50);
	    var randomY = Math.floor(Math.random() * (850 - 50 + 1) + 50);
	    this.player = new Player(randomX, randomY, "Character", this);
    }

    UpdateCharacters() //Actualiza posiciones del jugador y NPCs
    {
        for(var i = 0; i < this.npcs.length; i++)
        {
            this.npcs[i].UpdatePosition();
        }
        this.player.UpdatePosition();
    }
}
