const usersModel = require("../models/usersModel");

async function insertUserMiddleware(req, res, next) {
    const {firstname, surname, email, password} = req.body

    if(!firstname || !surname || !email || !password){
        return res.status(400).send("Dados incompletos")
    }
    if(password.length < 6){
        return res.status(400).send("A senha deve ter mais de 6 caracteres")
    }
    if(!email.includes('@') || !email.includes('.')){
        return res.status(400).send("Email inválido");
    }
    next();
}
async function middlewareGetUserById(req, res, next) {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send("Dados inválidos");
    }
  
    next();
}

async function middlewareDeleteUser(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send("Dados incompletos");
    }

    const user = await usersModel.getUserByIdModel(id);

    if (!user) {
        return res.status(404).send("Usuário não encontrado");
    }

    next();
}

module.exports ={
    insertUserMiddleware,
    middlewareGetUserById,
    middlewareDeleteUser
}