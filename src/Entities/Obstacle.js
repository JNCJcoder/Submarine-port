const OBSTACLE_ANIMATION_SPEED = 5;

export default class Obstacle
{
    constructor(x, y)
    {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.currentFrame = 0;
        this.imagesList = [];
    }

    update(cycle)
    {
        if(cycle % OBSTACLE_ANIMATION_SPEED === 0)
        {
            this.currentFrame = (this.currentFrame + 1) % (this.imagesList.length - 1);
        }

        this.x -= 3;
    }

    draw(ctx, images)
    {
        const texture = this.imagesList[this.currentFrame];

        ctx.drawImage(images[texture], this.x, this.y, this.width, this.height);
    }
}