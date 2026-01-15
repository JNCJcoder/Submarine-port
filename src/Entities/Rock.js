import Obstacle from './Obstacle.js';

export default class Rock extends Obstacle
{
    constructor(x, y)
    {
        super(x, y);
        this.width = 16;
        this.height = 30;
        this.imagesList.push("rock00");
        this.imagesList.push("rock01");
        this.imagesList.push("rock02");
    }
}