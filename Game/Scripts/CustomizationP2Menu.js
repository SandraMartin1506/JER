class CustomizationP2Menu extends Phaser.Scene
{
    constructor()
    {
        super({key: "CustomizationP2Menu"});
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
    }

    create()
    {
        const changeHaaat1 = this.add.image(((this.game.config.width*(1+0.3)/2)),(this.game.config.height*(1-0.3))/2, "buttonPlaceholder");
    }

    update()
    {

    }

}