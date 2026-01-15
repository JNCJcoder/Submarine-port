/**
 * DrawScore
 * @param {CanvasRenderingContext2D} ctx 
 * @param {string[]} images 
 * @param {number} x 
 * @param {number} y 
 * @param {number} score 
 * @param {number} pad 
 */
function drawScore(ctx, images, x, y, score, pad = 8)
{
    const _score = String(score).padStart(pad, '0').split('').reverse().join('');
    const numberDistance = 8;
    let _x = x + (pad * numberDistance) - numberDistance;

    for (let index = 0; index < pad; index++)
    {
        const scoreNumber = "num0" + _score[index];
        ctx.drawImage(images[scoreNumber], _x, y);
        _x -= 8;
    }
}

export default drawScore;