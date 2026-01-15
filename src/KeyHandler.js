import capitalize from "./Utils/Capitalize.js";

class KeyHandler
{
    constructor()
    {
        this.keys = {};
		this.supportedKeys = {
		  ArrowUp: true,
		  ArrowDown: true,
		  Enter: true,
		  P: true,
		};

        window.addEventListener('keyup', (event) => {
			const key = capitalize(event.key);
			if (!this.supportedKeys[key]) return;
			event.preventDefault();

			this.keys[key] = false;
		});

		window.addEventListener('keydown', (event) => {
			const key = capitalize(event.key);
			if (!this.supportedKeys[key]) return;
			if (event.repeat) return;
			event.preventDefault();

			this.keys[key] = true;
		});


		window.addEventListener("touchstart", (event) => {
			event.preventDefault();

			this.keys["Enter"] = true;

		}, { passive: false });

		window.addEventListener("touchend", (event) => {
			event.preventDefault();

			this.keys["Enter"] = false;

		}, { passive: false });
    }

	/**
	 * IsPressed
	 * @param {string} key
	 * @returns {boolean}
	 */
	isPressed(key)
	{
		return this.keys[key];
	}

	/**
	 * IsDown
	 * @param {string} key
	 * @returns {boolean}
	 */
	isDown(key)
	{
		const status = this.keys[key];
		this.keys[key] = false;
		return status;
	}

	/**
	 * Release
	 * @param {string} key 
	 */
	release(key)
	{
		this.keys[key] = false;
	}
}

export default KeyHandler;