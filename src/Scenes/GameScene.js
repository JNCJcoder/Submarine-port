import Player from "../Entities/Player.js";
import SaveManager from "../SaveManager.js";
import drawScore from "../Utils/DrawScore.js";
import Random from "../Utils/Random.js";

import Entities from "../Entities/Entities.js";
import Walls from "../Entities/Walls.js";

const OBSTACLE_START_SCORE = 10;

const GAME_OVER_START_X = 128;
const GAME_OVER_WIDTH = 55;
const GAME_OVER_Y_MIN = 40;
const GAME_OVER_Y_MAX = 140;

const COLOR_COUNT = 5;
const COLOR_CYCLE_MAX = 100;

const RIGHT_PANEL_FRAMES = 3;

class GameScene
{
    constructor(game)
    {
        this.game = game;
        this.saveManager = new SaveManager();
        this.score = 0;
        this.gameOver = false;
        this.paused = false;
        /**/
        this.rightPanelAnimation = 1;
        this.gameOverInfo = { x: GAME_OVER_START_X, y: GAME_OVER_Y_MIN }
        /**/
        this.colorCycle = 1;
        this.colorIndex = 0;
        this.topColor =         ["#3F7EFF", "#803FBF", "#BE1F3F", "#3EBF40", "#7F3F3F"];
        this.backgroundColor =  ["#1FBEFF", "#FF9FFF", "#FFBEFE", "#80FF40", "#FF9FFF"];
        this.botColor =         ["#1F1F7F", "#5F1F7F", "#9F203E", "#405F3F", "#BF3F3E"];
        /**/
        this.walls = new Walls(this.game.canvas.width);
        /**/
        this.player = new Player();
        this.entities = new Entities();
    }

    reset()
    {
        this.saveManager.addScore(this.score);
        this.score = 0;
        this.gameOver = false;
        this.gameOverInfo.x = GAME_OVER_START_X;
        this.gameOverInfo.y = GAME_OVER_Y_MIN;
        
        this.player.reset();
        this.walls.reset();
    }

    update(keys)
    {
        if(keys.isDown("P"))
        {
            keys.release("Enter");
            this.paused = !this.paused;
        }

        if(this.paused)
        {
            if(keys.isPressed("Enter"))
            {
                this.reset();
                this.entities.reset();
                this.paused = false;
                this.game.changeScene(0);
            }
            return;
        }

        if(this.game.cycle % 3 === 0)
        {
            if(!this.gameOver)
            {
                this.score++;
            }

            this.colorCycle = (this.colorCycle + 1) % COLOR_CYCLE_MAX;

            if(this.colorCycle === 0)
            {
                this.colorIndex = (this.colorIndex + 1) % COLOR_COUNT;
            }
 
            this.rightPanelAnimation = (this.rightPanelAnimation + 1) % RIGHT_PANEL_FRAMES;
        }

        this.player.update(this.game.cycle);

        if(!this.gameOver)
        {
            if(this.walls.updateAndGetHit(this.player))
            {
                this.player.collided = true;
                this.gameOver = true;
                keys.release("Enter");
            }
        }

        if(this.score > OBSTACLE_START_SCORE)
        {
            if(this.entities.updateAndGetHit(this.game.cycle, this.player))
            {
                this.player.collided = true;
                this.gameOver = true;
                keys.release("Enter");
            }

            if(!this.gameOver)
            {
                this.entities.createOne();
            }
        }

        if(this.gameOver)
        {
            if(this.gameOverInfo.x + GAME_OVER_WIDTH <= 0)
            {
                this.gameOverInfo.x = GAME_OVER_START_X;
                this.gameOverInfo.y = Random(GAME_OVER_Y_MIN, GAME_OVER_Y_MAX);
            }
            this.gameOverInfo.x -= 3;
        }

        if(keys.isPressed("Enter"))
        {
            if(this.gameOver && this.entities.obstacles.length === 0)
            {
                this.reset();
                return;
            }
            this.player.move(keys);
        }
    }

    draw(ctx, images)
    {
        ctx.fillStyle = this.backgroundColor[this.colorIndex];
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.walls.draw(ctx, this.topColor[this.colorIndex], this.botColor[this.colorIndex]);

        const hiScore = this.saveManager.getScores()[0] ?? 0;

        drawScore(ctx, images, 2, 3, this.score, 6);
        
        ctx.drawImage(images["hi"], 62, 2);
        drawScore(ctx, images, 78, 3, hiScore, 6);

        this.player.draw(ctx, images);
        
        this.entities.draw(ctx, images);

        if(this.gameOver)
        {
            ctx.drawImage(images["gameOver"], this.gameOverInfo.x, this.gameOverInfo.y);
        }

        if(this.paused)
        {
            ctx.drawImage(images["paused"], 36, 40);
        }

        ctx.drawImage(images["leftPanel"], 0, 194);
        ctx.drawImage(images[`rightPanel${this.rightPanelAnimation}`], 68, 194);
    }
}

export default GameScene;