const { body, param, validationResult } = require('express-validator');

const validateProductCreation = [
    body('name').notEmpty().withMessage('Nome do produto é obrigatório'),
    body('price').isFloat({ gt: 0 }).withMessage('Preço deve ser um número maior que zero'),
    body('categorie_name').notEmpty().withMessage('Nome da categoria é obrigatório'),
    body('description').optional().isString(),
    body('stock').notEmpty().isInt({ gt: 0 }).withMessage('Estoque deve ser um número inteiro maior que zero'),
    body('image').notEmpty().withMessage('Imagem do produto é obrigatória')
                .isURL().withMessage('Imagem do produto deve ser uma URL'),
    body('enabled').optional().isBoolean().withMessage('O campo habilitado deve ser um booleano'),
    body('discount_percentage').optional().isFloat({ min: 0, max: 100 }).withMessage('Porcentagem de desconto deve estar entre 0 e 100'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateProductUpdate = [
    body('name').optional().notEmpty().withMessage('Nome do produto não pode estar vazio'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Preço deve ser um número maior que zero'),
    body('categorie_name').optional().notEmpty().withMessage('Nome da categoria não pode estar vazio'),
    body('description').optional().isString(),
    body('stock').optional().isInt({ gt: 0 }).withMessage('Estoque deve ser um número inteiro maior que zero'),
    body('image').optional().isURL().withMessage('Imagem do produto deve ser uma URL'),
    body('enabled').optional().isBoolean().withMessage('O campo habilitado deve ser um booleano'),
    body('discount_percentage').optional().isFloat({ min: 0, max: 100 }).withMessage('Porcentagem de desconto deve estar entre 0 e 100'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateProductId = [
    param('id').isInt().withMessage('ID do produto deve ser um número inteiro'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateProductCreation,
    validateProductUpdate,
    validateProductId
}