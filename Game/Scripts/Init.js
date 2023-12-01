const config = 
{
    width: 1600,
    height: 900,
    parent: "container",
    type: Phaser.AUTO,
    backgroundColor: '0x0000FF',
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // Puedes establecer esto a true para ver los cuerpos de colisión
        }
    }
}

var game = new Phaser.Game(config);