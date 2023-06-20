import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';

export default async function handleCategories(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    const getAllCategories = await Category.find().populate('parent');
    res.json(getAllCategories);
  }

  if (method === 'POST') {
    console.log(req.body);
    const { nameCategory, parentCategory } = req.body;
    const category = await Category.create({
      nameCategory,
      parent: parentCategory,
    });
    res.json(category);
  }
}
