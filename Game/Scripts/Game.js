class Game extends Phaser.Scene
{
    constructor()
    {
        super({key: "Game", active: true}); 
    }

    preload()
    {
        this.load.image("Character", "./Sprites/Character.png"); //Va estupendo!
        
    }

    create()
    {
        var numberNPC = Math.floor(Math.random() * (60-40+1) + 40); //NPCs son un número aleatorio entre 40 y 60 (de momento)
	    this.npcs = new Array(numberNPC);
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.InitializeNPCS(); //Se inicializan los NPCs con posiciones aleatorias
        this.player;
        this.player2;
        this.InitializePlayer(); //El jugador también tendrá una posición aleatoria
        this.InitializePlayer2();
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
            console.log(this.npcs[i].body)
        }
    }

    InitializePlayer() //Inicializa al jugador en una posición aleatoria
    {
        var randomX = Math.floor(Math.random() * (1550 - 50 + 1) + 50);
	    var randomY = Math.floor(Math.random() * (850 - 50 + 1) + 50);
	    this.player = new Player(randomX, randomY, "Character", this);
    }

    InitializePlayer2() {
        this.player2 = new Player2(this); // Le paso la escena actual. No pongo num balas todavia
       this.input.on('pointermove',this.player2.UpdatePositionP2,this) //Cada vez que el ratón se mueve le paso la función para cambiar la posición del jugador 2 (que va a ser la del ratón)
       //le paso el contexto con el último this para que lo haga bien
    }

    UpdateCharacters() //Actualiza posiciones de los jugadores y NPCs
    {
        for(var i = 0; i < this.npcs.length; i++)
        {
            this.npcs[i].UpdatePosition();
        }
        this.player.UpdatePosition();
        
    }
}
