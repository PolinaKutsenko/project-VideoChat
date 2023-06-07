export const parseNumber = (str, def) => {
    const num = Number(str) || def;
    return Number.isNaN(num) ? def : num;
};
