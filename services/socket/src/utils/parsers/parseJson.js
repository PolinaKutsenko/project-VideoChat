export const parseJson = (str, def = {}) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return def;
    }
};
