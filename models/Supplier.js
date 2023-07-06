import mongoose, { model, Schema, models } from 'mongoose';

const SupplierSchema = new Schema({
  name: { type: String, required: true },
  address: String,
  accessory: { type: String },
});

export const Supplier = models.Product || model('Supplier', SupplierSchema);
