import SaveManager from "../SaveManager.js";
import drawScore from "../Utils/DrawScore.js";

const SCORE_START_Y = 35;
const SCORE_HEIGHT = 15;

class ScoreScene
{
    constructor(game)
    {
        this.game = game;
        this.saveManager = new SaveManager();
    }

    enter()
    {

    }

    exit()
    {

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
        
        const scores = this.saveManager.getScores();

        function drawScoreInList(num)
        {
            const positionY = SCORE_START_Y + (num * SCORE_HEIGHT);
            const numberRank = `num0${num + 1}`;
            
            ctx.drawImage(images[numberRank], 21, positionY);
            ctx.drawImage(images["num10"], 31, positionY);

            drawScore(ctx, images, 41, positionY, scores[num] ?? 0);
        }

        ctx.fillStyle = ctx.createPattern(images["menuBackGround"], 'repeat');
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        ctx.drawImage(images["hiScores"], 32, 10);

        for (let index = 0; index < SaveManager.MAX_SCORES; index++)
        {
            drawScoreInList(index);
        }

        ctx.drawImage(images["sfkBack"], this.game.canvas.width - 40, this.game.canvas.height - 16);
    }
}

export default ScoreScene;