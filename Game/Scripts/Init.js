const config = 
{
    width: 1600,
    height: 900,
    parent: "container",
    type: Phaser.AUTO,
    backgroundColor: '0x0000FF',
    scene: [Game]
}

var game = new Phaser.Game(config);