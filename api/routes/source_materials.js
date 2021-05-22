const { Router } = require('express');
const {
  getAllSourceMaterials,
  createSourceMaterial,
  updateSourceMaterial,
  deleteSourceMaterial
} = require('../controllers/source_materials');

const router = Router();

router.get('/', getAllSourceMaterials);
router.post('/', createSourceMaterial);
router.patch('/:id', updateSourceMaterial);
router.delete('/:id', deleteSourceMaterial);

module.exports = router;
