export const schemeValidator = (scheme) => (
    async (socket, data) => {
        const result = scheme.validate(data);

        if (result.error) {
            throw result.error;
        }
    }
);
