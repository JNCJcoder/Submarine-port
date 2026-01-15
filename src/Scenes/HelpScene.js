class HelpScene
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
        ctx.fillStyle = "#CCFFFF";
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        ctx.drawImage(images["helpTitle"], 0, 0);

        ctx.drawImage(images["helpContent"], 5, 45);

        ctx.drawImage(images["sfkBack"], this.game.canvas.width - 40, this.game.canvas.height - 16);
    }
}

export default HelpScene;