class StartScene
{
    constructor(game)
    {
        this.game = game;
    }

    update(keys)
    {
        
        if(keys.isDown("Enter"))
        {
            this.game.changeScene(1);
        }
    }

    draw(ctx, images)
    {
        ctx.fillStyle = ctx.createPattern(images["menuBackGround"], 'repeat');
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        ctx.drawImage(images["openingTitle"], 5, 3);
        ctx.drawImage(images["openingSubmarine"], 9, 85);

        ctx.drawImage(images["jikeLogo"], this.game.canvas.width - 121, this.game.canvas.height - 53);
    }
}

export default StartScene;