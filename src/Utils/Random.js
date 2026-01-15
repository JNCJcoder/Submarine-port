/**
 * Random
 * @param {number} min 
 * @param {number} max 
 * @returns number
 */
function Random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Random;