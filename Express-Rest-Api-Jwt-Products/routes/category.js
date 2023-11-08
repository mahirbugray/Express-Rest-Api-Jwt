const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories')

router.get('/', categoriesController.getCategories);

router.post('/', categoriesController.postCategory);

router.get('/:id', categoriesController.getCategoryById);

router.put('/', categoriesController.putCategoryById);

router.delete('/:id', categoriesController.deleteCategoryById);

module.exports = router;