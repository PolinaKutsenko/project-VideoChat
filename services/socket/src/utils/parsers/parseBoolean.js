export const parseBoolean = (str, def) => {
    if (!str && str?.length === 0) {
        return def;
    }
    return ['true', '1'].includes(str);
};
