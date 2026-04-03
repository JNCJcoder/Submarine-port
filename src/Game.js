import GameScene from "./Scenes/GameScene.js";
import HelpScene from "./Scenes/HelpScene.js";
import KeyScene from "./Scenes/KeyScene.js";
import MenuScene from "./Scenes/MenuScene.js";
import ScoreScene from "./Scenes/ScoreScene.js";
import StartScene from "./Scenes/StartScene.js";

export default class Game
{
    /**
    * @param {HTMLCanvasElement} canvas
    */
    constructor(canvas, assetLoader, input)
    {
        this.canvas = canvas;
        this.assets = assetLoader;
        this.input = input;
        this.ctx = canvas.getContext('2d');
        this.actualScene = 0;
        this.scenes = [
            new StartScene(this),
            new MenuScene(this),
            new ScoreScene(this),
            new HelpScene(this),
            new KeyScene(this),
            new GameScene(this)
        ];
        /**/
        this.fps = 60;
        this.fpsInterval = 1000 / this.fps;
        this.currentTime = 0;
        this.lastTime = 0;
        this.elapsed = 0;
        this.cycle = 0;
    }

    update()
    {
        this.scenes[this.actualScene].update(this.input);
        this.cycle = (this.cycle + 1) % this.fps;
    }

    draw()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.scenes[this.actualScene].draw(this.ctx, this.assets.images);
    }

    /**
     * ChangeScene
     * @param {number} sceneNumber 
     */
    changeScene(sceneNumber)
    {
        this.scenes[this.actualScene].exit();
        this.actualScene = sceneNumber;
        this.scenes[this.actualScene].enter();
    }

    loop = () => {
        requestAnimationFrame(this.loop);

        this.currentTime = performance.now();
        this.elapsed = this.currentTime - this.lastTime;

        if (this.elapsed > this.fpsInterval)
        {
            this.lastTime = this.currentTime - (this.elapsed % this.fpsInterval);

            this.update();
            this.draw();
        }
    };

    start()
    {
        this.lastTime = performance.now();
        this.loop();
    }
}
