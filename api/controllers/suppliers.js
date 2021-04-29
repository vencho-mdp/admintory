const db = require('../db/db');

class SupplierController {
  async createSupplier(req, res) {
    const {
      full_name,
      city,
      address,
      company,
      phone_number,
      userid
    } = req.body;
    try {
      const [id] = await db('supplier')
        .returning('id')
        .insert({
          full_name,
          city,
          address,
          company,
          phone_number,
          userid
        });
      return res.status(201).json({
        message: 'Supplier Created',
        id
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong',
        error
      });
    }
  }
  async updateSupplier(req, res) {
    const { id } = req.params;
    try {
      await db('supplier')
        .update({
          ...req.body
        })
        .where({ id });
      return res.status(200).json({ message: 'Supplier Updated Successfully' });
    } catch (error) {
      return res.status(404).json({
        message: 'Supplier does not exist'
      });
    }
  }
  async deleteSupplier(req, res) {
    const { id } = req.params;
    try {
      await db('supplier')
        .where({ id })
        .del();
      return res.status(202).json({
        message: 'Supplier successfully eliminated'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong',
        error
      });
    }
  }
  async getAllSuppliers(req, res) {
    const { userid } = req.params;
    try {
      const suppliers = await db('supplier').where({ userid });
      res.status(200).json([...suppliers]);
    } catch (error) {
      return res.status(404).json({
        message: 'That user does not have any suppliers'
      });
    }
  }
}
module.exports = new SupplierController();
