import Random from "./Utils/Random.js";

class AudioManager
{
    static #instance;

    /**
     * AudioManager
     * @param {Object.<string, HTMLAudioElement>} sounds 
     */
    constructor(sounds)
    {
        if (AudioManager.#instance)
        {
            return AudioManager.#instance;
        }

        this.sounds = sounds;
        this.soundIndex = 1;
        this.currentSound = sounds[`bgm${this.soundIndex}`];
        /**/
        this.sounds[`bgm1`].volume = 0.25;
        this.sounds[`bgm2`].volume = 0.25;
        this.sounds[`bgm3`].volume = 0.25;
        /**/
        this.sounds[`bgm1`].addEventListener("ended", () => { this.playBGM(); });
        this.sounds[`bgm2`].addEventListener("ended", () => { this.playBGM(); });
        this.sounds[`bgm3`].addEventListener("ended", () => { this.playBGM(); });

        AudioManager.#instance = this;
    }

    initSound()
    {
        this.soundIndex = 1;
        this.currentSound = this.sounds[`bgm${this.soundIndex}`];
        this.currentSound.currentTime = 0;
        this.playSound();
    }

    playSound()
    {
        this.currentSound.loop = false;
        this.currentSound.play();
    }
    
    stopSound()
    {
        this.currentSound.pause();
        this.currentSound.currentTime = 0;
    }

    toggleSound()
    {
        if (this.currentSound.paused)
        {
            this.currentSound.play();
        }
        else
        {
            this.currentSound.pause();
        }
    }
            
    playBGM()
    {
        this.stopSound();
        let newSoundIndex = Random(1, 3);
        while(this.soundIndex == newSoundIndex)
        {
            newSoundIndex = Random(1, 3);
        }

        this.soundIndex = newSoundIndex;
        this.currentSound = this.sounds[`bgm${this.soundIndex}`];
        this.playSound();
    }
        
    playSFX()
    {
        this.stopSound();
        this.currentSound = this.sounds["explosion"];
        this.playSound();
    }
}

export default AudioManager;