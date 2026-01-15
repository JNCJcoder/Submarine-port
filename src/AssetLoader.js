export default class AssetLoader
{
    constructor()
    {
        this.images = {};
        this.sounds = {};
        this.totalAssets = 0;
        this.loadedAssets = 0;
    }

    /**
     * @param {string} key 
     * @param {string} src 
     */
    loadImage(key, src)
    {
        this.totalAssets++;

        return new Promise((resolve, reject) => {
            const img = new Image();

            img.src = src;
            img.onload = () => {
                this.images[key] = img;
                this.loadedAssets++;
                resolve(img);
            };

            img.onerror = (err) => reject(`Erro ao carregar imagem: ${src}`, err);
        });
    }

    /**
     * @param {string} key 
     * @param {string} src 
     */
    loadSound(key, src)
    {
        this.totalAssets++;

        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.src = src;
            audio.onloadeddata = () => {
                this.sounds[key] = audio;
                this.loadedAssets++;
                resolve(audio);
            };
            audio.onerror = (err) => reject(`Erro ao carregar som: ${src}`, err);
        });
    }

    /**
     * @param {object} assets 
     */
    loadAll(assets)
    {
        const promises = [];

        if (assets.images)
        {
            for (const key in assets.images)
            {
                promises.push(this.loadImage(key, assets.images[key]));
            }
        }

        if (assets.sounds)
        {
            for (const key in assets.sounds)
            {
                promises.push(this.loadSound(key, assets.sounds[key]));
            }
        }

        return Promise.all(promises);
    }
}
