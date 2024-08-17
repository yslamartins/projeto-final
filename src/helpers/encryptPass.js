const bcrypt = require('bcrypt');
const saltRounds = 10;

async function encryptPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erro ao criptografar a senha.');
    }
}

async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Erro ao comparar a senha.');
    }
}

module.exports = {
    encryptPassword,
    comparePassword
};