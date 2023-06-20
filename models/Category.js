import mongoose, { model, Schema, models } from 'mongoose';

const CategorySchema = new Schema({
  nameCategory: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
});

export const Category = models?.Category || model('Category', CategorySchema);
