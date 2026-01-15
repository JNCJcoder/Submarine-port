import Random from "../Utils/Random.js";

const WALL_HEIGHT_MIN = 5;
const WALL_HEIGHT_MAX = 25;

export default class Walls
{
    constructor(width)
    {
        this.wallsMax = 8;
        this.wallsNum = Math.ceil(width / this.wallsMax);
        this.wallsMaxX = Math.floor(this.wallsNum * this.wallsMax);
        this.wallsMax++;

        this.topWalls = [];
        this.botWalls = [];

        for (let index = 0; index < this.wallsMax; index++)
        {
            const x = this.wallsNum * index;
            this.createOne(x, this.wallsNum);
        }
    }

    reset()
    {
        this.topWalls = [];
        this.botWalls = [];

        for (let index = 0; index < this.wallsMax; index++)
        {
            const x = this.wallsNum * index;
            this.createOne(x, this.wallsNum);
        }
    }

    createOne(x, width)
    {
        const heightTop = Random(WALL_HEIGHT_MIN, WALL_HEIGHT_MAX);
        const heightBot = Random(WALL_HEIGHT_MIN, WALL_HEIGHT_MAX);

        this.topWalls.push({
            x,
            y: 0,
            width: width,
            height: heightTop
        });

        this.botWalls.push({
            x,
            y: 194 - heightBot,
            width: width,
            height: heightBot
        });
    }

    resetOne(index)
    {
        const heightTop = Random(WALL_HEIGHT_MIN, WALL_HEIGHT_MAX);
        const heightBot = Random(WALL_HEIGHT_MIN, WALL_HEIGHT_MAX);

        this.topWalls[index].x = this.wallsMaxX + this.topWalls[index].x;
        this.topWalls[index].height = heightTop;

        this.botWalls[index].y += this.botWalls[index].height;
        this.botWalls[index].x = this.wallsMaxX + this.botWalls[index].x;
        this.botWalls[index].height = heightBot;
        this.botWalls[index].y -= heightBot;
    }
    
    update(index)
    {
        this.topWalls[index].x -= 3;
        this.botWalls[index].x -= 3;

        const location = this.topWalls[index].x + this.topWalls[index].width;

        if(location <= 0)
        {
            this.resetOne(index);
        }
    }
    
    getHit(index, player)
    {
        return (player.getHit(this.topWalls[index]) || player.getHit(this.botWalls[index]));
    }

    updateAndGetHit(player)
    {
        let status = false;
        for (let index = 0; index < this.wallsMax; index++)
        {
            this.update(index);
            if(this.getHit(index, player))
            {
                status = true;
            }
        }

        return status;
    }
    
    drawOne(ctx, colorTop, colorBot, index)
    {
        ctx.fillStyle = colorTop;
        ctx.fillRect(
            this.topWalls[index].x,
            this.topWalls[index].y,
            this.topWalls[index].width,
            this.topWalls[index].height
        );

        ctx.fillStyle = colorBot;
        ctx.fillRect(
            this.botWalls[index].x,
            this.botWalls[index].y,
            this.botWalls[index].width,
            this.botWalls[index].height
        );
    }

    draw(ctx, colorTop, colorBot)
    {
        for (let index = 0; index < this.wallsMax; index++)
        {
            this.drawOne(ctx, colorTop, colorBot, index);
        }
    }
}