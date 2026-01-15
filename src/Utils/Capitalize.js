/**
 * Capitalize
 * @param {string} str 
 * @returns string
 */
function capitalize(str)
{
    return str && String(str[0]).toUpperCase() + String(str).slice(1);
}

export default capitalize;