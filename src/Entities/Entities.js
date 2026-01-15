import Octopus from "./Octopus.js";
import Rock from "./Rock.js";

import Random from "../Utils/Random.js";

const ENTITY_MIN_Y = 40;
const ENTITY_MAX_Y = 140;

export default class Entities
{
    constructor()
    {
        this.obstacles = [];
    }

    reset()
    {
        while(this.obstacles.length !== 0)
        {
            this.obstacles.pop();
        }
    }

    createOne()
    {
        if(this.obstacles.length > 0) return;

        const y = Random(ENTITY_MIN_Y, ENTITY_MAX_Y);
        
        const ObstacleClass = Random(0, 1) ? Rock : Octopus;

        this.obstacles.push(new ObstacleClass(128, y));
    }

    updateAndGetHit(cycle, player)
    {
        let status = false;

        for (const obstacle of this.obstacles)
        {
            obstacle.update(cycle);
            if(player.getHit(obstacle))
            {
                status = true;
            }

            if(obstacle.x + obstacle.width <= 0)
            {
                this.obstacles.pop();
            }
        }

        return status;
    }

    draw(ctx, images)
    {
        for (const obstacle of this.obstacles)
        {
            obstacle.draw(ctx, images);
        }
    }
}