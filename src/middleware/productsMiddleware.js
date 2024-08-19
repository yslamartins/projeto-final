const { body, param, validationResult } = require('express-validator');

const validateProductCreation = [
    body('name').notEmpty().withMessage('Nome do produto é obrigatório'),
    body('price').isFloat({ gt: 0 }).withMessage('Preço deve ser um número maior que zero'),
    body('category_name').notEmpty().withMessage('Nome da categoria é obrigatório'),
    body('description').optional().isString(),
    body('stock').optional().isInt({ gt: 0 }).withMessage('Estoque deve ser um número inteiro maior que zero'),
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
    body('category_name').optional().notEmpty().withMessage('Nome da categoria não pode estar vazio'),
    body('description').optional().isString(),
    body('stock').optional().isInt({ gt: 0 }).withMessage('Estoque deve ser um número inteiro maior que zero'),
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
};