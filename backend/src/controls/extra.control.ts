export const tokenGenerator = (length: number) => {
    let result: string = '';
    let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength: number = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const normalizeResult = (result: any) => {
    return JSON.parse(JSON.stringify(result).replace(/(\[|\])/g, ''));
};

export const checkIfArray = (data: any) => {
    return data.length > 0;
};
