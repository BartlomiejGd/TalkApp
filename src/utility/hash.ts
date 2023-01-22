import * as crypto from 'crypto';

//hash function
export const hashPwd = (p: string): string => {
    const hmac = crypto.createHmac('sha512', process.env.HASH_KEY);
    hmac.update(p);
    return hmac.digest('hex');
};
