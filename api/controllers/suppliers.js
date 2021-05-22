const db = require('../db/db');
class SupplierController {
  async createSupplier(req, res) {
    try {
      await db('supplier').insert(req.body);
      res.status(201).json({
        message: 'Supplier Created'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Something went wrong',
        error
      });
    }
  }
  async updateSupplier(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
      await db('supplier')
        .update(req.body)
        .where({ id });
      res.status(200).json({ message: 'Supplier Updated Successfully' });
    } catch (error) {
      res.status(404).json({
        message: 'Supplier does not exist'
      });
    }
  }
  async deleteSupplier(req, res) {
    const { id } = req.params;
    try {
      const res = await db('supplier')
        .where({ id })
        .del();
      res.status(202).json({
        message: 'Supplier successfully eliminated'
      });
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong',
        error
      });
    }
  }
  async getAllSuppliers(req, res) {
    const { userid } = req.body;
    try {
      const suppliers = await db('supplier').where({ userid });
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(404).json({
        message: 'Invalid user id'
      });
    }
  }
}
module.exports = new SupplierController();
