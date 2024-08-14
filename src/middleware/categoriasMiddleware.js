const categoriasModel = require('../models/CategoriasModel')

async function middlewareGetCategoryByI(req,res,next){
    const {id} = req.params;
    const categoria = await categoriasModel.getCategoryById(id);

    if (!categoria) {
        return res.status(404).send('Categoria não encontrado');
    }

    next();
}

async function middlewareInsertCategoryModel(req,res,next) {
    const { nome} = req.body;
    
    
    if(!nome){
        return res.status(400).send('Dados da categoria incompletos')
    }
    next();
}

const categoria = await categoriasModel.getCategoria













module.exports={

}