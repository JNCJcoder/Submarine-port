import Obstacle from './Obstacle.js';

export default class Octopus extends Obstacle
{
    constructor(x, y)
    {
        super(x, y);
        this.width = 10;
        this.height = 42;
        this.imagesList.push("octopus00");
        this.imagesList.push("octopus01");
        this.imagesList.push("octopus02");
    }
}