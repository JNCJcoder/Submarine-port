class SaveManager
{
    static #instance;
    static MAX_SCORES = 5;

    constructor()
    {
        if (SaveManager.#instance)
        {
            return SaveManager.#instance;
        }

        this.key = "highscores";
        this.scores = this.load();

        SaveManager.#instance = this;
    }

    load()
    {
        const data = localStorage.getItem(this.key);

        return data ? JSON.parse(data) : [];
    }

    save()
    {
        localStorage.setItem(this.key, JSON.stringify(this.scores));
    }

    /**
     * AddScore
     * @param {number} value 
     */
    addScore(value)
    {
        if (this.scores.length < SaveManager.MAX_SCORES)
        {
            this.insertSorted(value);
            this.save();
            return;
        }

        const last = this.scores[this.scores.length - 1];

        if (value <= last) return;

        this.insertSorted(value);
        this.scores.pop();
        this.save();
    }

    /**
     * InsertSorted
     * @param {number} value 
     */
    insertSorted(value)
    {
        for (let i = 0; i < this.scores.length; i++)
        {
            if (value > this.scores[i])
            {
                this.scores.splice(i, 0, value);
                return;
            }
        }

        this.scores.push(value);
    }

    /**
     * GetScores
     * @returns {number[]}
     */
    getScores()
    {
        return this.scores;
    }
}

export default SaveManager;