const OPTION_HEIGHT = 20;
const OPTION_START_Y = 28;

const RUN_FRAMES = 4;
const RUN_ANIMATION_SPEED = 6;

const SELECTION_SCENES = [ 5, 2, 3, 4, 0 ];

class MenuScene
{
    constructor(game)
    {
        this.game = game;
        this.selectNumber = 0;
        this.runFrame = 0;
    }

    update(keys)
    {
        if(keys.isDown("ArrowDown"))
        {
            if(this.selectNumber === 4) return;
            this.selectNumber++;
        }
        else if(keys.isDown("ArrowUp"))
        {
            if(this.selectNumber === 0) return;
            this.selectNumber--;
        }
        else if(keys.isDown("Enter"))
        {
            this.game.changeScene(SELECTION_SCENES[this.selectNumber]);
        }

        if(this.game.cycle % RUN_ANIMATION_SPEED === 0)
        {
            this.runFrame = (this.runFrame + 1) % RUN_FRAMES;
        }
    }

    draw(ctx, images)
    {
        ctx.fillStyle = ctx.createPattern(images["menuBackGround"], 'repeat');
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        ctx.drawImage(images["title"], 0, 0);
        
        const optionY = OPTION_START_Y + (this.selectNumber * OPTION_HEIGHT);

        ctx.drawImage(images[`run${this.runFrame}`], 5, optionY);

        ctx.fillStyle = "black";
        ctx.fillRect(25, optionY, 95, 20);

        ctx.fillStyle = "white";
        ctx.font = "bold 16px Arial";

        ctx.fillText("New Game", 29, 45);
        ctx.fillText("Hi Score", 29, 65);
        ctx.fillText("Instructions", 29, 85);
        ctx.fillText("Key Info", 29, 105);
        ctx.fillText("Exit", 29, 125);
    }
}

export default MenuScene;