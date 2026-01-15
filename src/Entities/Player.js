const GRAVITY = 0.250;
const UP_FORCE = -0.55;
const MAX_VEL_Y = 3;
const ANIMATION_THRESHOLD = 0.2;

const SUBMARINE_FRAMES = 2;
const BUBBLE_FRAMES = 4;

class Player
{
    constructor()
    {
        this.x = 20;
        this.y = 100;
        this.velY = 0;
        this.width = 18;
        this.height = 10;
        /**/
        this.hitBoxWidth = 16;
        this.hitBoxHeight = 8;
        /**/
        this.bubbleIndex = 0;
        this.textureIndex = 0;
        this.explosionIndex = 0;
        this.collided = false;
    }

    reset()
    {
        this.y = 100;
        this.velY = 0;
        this.textureIndex = 0;
        this.explosionIndex = 0;
        this.collided = false;
    }

    getHit(obstacle)
    {
        return (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.hitBoxWidth > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.hitBoxHeight > obstacle.y
        );
    }

    move(_keys)
    {
        this.velY += UP_FORCE;
    }

    /**
     * @param {number} cycle 
     */
    update(cycle)
    {
        if(this.collided)
        {
            if(this.explosionIndex === 8)
            {
                return;
            }

            if(cycle % 3 === 0)
            {
                this.explosionIndex++;
            }

            return;
        }

        this.velY += GRAVITY;

        if (this.velY > MAX_VEL_Y)    this.velY = MAX_VEL_Y;
        if (this.velY < -MAX_VEL_Y)   this.velY = -MAX_VEL_Y;

        this.y += this.velY;

        if(cycle % 6 === 0)
        {
            this.bubbleIndex = (this.bubbleIndex + 1) % BUBBLE_FRAMES;
            this.textureIndex = this.bubbleIndex % SUBMARINE_FRAMES;
        }
    }

    draw(ctx, images)
    {
        if(this.collided)
        {
            this.drawExplosion(ctx, images);
            return;
        }
        
        let texture;
        let textureBubble;
       
        if(this.velY < -ANIMATION_THRESHOLD)        texture = `submarineUp${this.textureIndex}`;
        else if(this.velY > ANIMATION_THRESHOLD)    texture = `submarineDown${this.textureIndex}`;
        else                                        texture = "submarineCenter";

        textureBubble = `bubble${this.textureIndex}`;

        ctx.drawImage(images[textureBubble], this.x - 10, this.y);
        ctx.drawImage(images[texture], this.x, this.y);
    }

    drawExplosion(ctx, images)
    {
        if(this.explosionIndex === 8)
        {
            return;
        }

        const texture = `subExplosion${this.explosionIndex}`;

        ctx.drawImage(images[texture], this.x, this.y);
    }
}

export default Player;