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
    const { nome, enabled } = req.body;
    
    
    if(!nome || enabled){
        return res.status(400).send('Dados da categoria incompletos')
    }

    const categoria = await categoriasModel.get



    next();
}















module.exports={
    middlewareGetCategoryByI,
    middlewareInsertCategoryModel,

}