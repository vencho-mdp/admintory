const db = require('../db/db');

class SourceMaterialsController {
  async createSourceMaterial(req, res) {
    try {
      await db('source_material').insert(req.body);
      res.status(201).json({
        message: 'Source Material Created'
      });
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong',
        error
      });
    }
  }
  async deleteSourceMaterial(req, res) {
    const { id } = req.params;
    try {
      await db('source_material')
        .where({ id })
        .del();
      res
        .status(202)
        .json({ message: 'Source Material successfully eliminated' });
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong',
        error
      });
    }
  }
  async getAllSourceMaterials(req, res) {
    const { userid } = req.body;
    try {
      const source_materials = await db('source_material').where({ userid });

      const source_materials_with_supplier_name = await Promise.all(
        source_materials.map(
          async ({ supplierid, ...source_material_characteristics }) => {
            const supplier_name = await db('supplier')
              .where('id', supplierid)
              .select('full_name');
            return {
              ...source_material_characteristics,
              supplier_name: supplier_name[0].full_name,
              supplierid
            };
          }
        )
      );

      res.status(200).json(source_materials_with_supplier_name);
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        message: 'Invalid user id'
      });
    }
  }
  async updateSourceMaterial(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
      await db('source_material')
        .update(req.body)
        .where({ id });
      res.status(200).json({ message: 'Source Material Updated Successfully' });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: 'Source Material does not exist',
        error
      });
    }
  }
}

module.exports = new SourceMaterialsController();
