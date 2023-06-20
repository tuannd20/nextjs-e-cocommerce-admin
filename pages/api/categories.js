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

  if (method === 'PUT') {
    const { nameCategory, parentCategory, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        nameCategory,
        parent: parentCategory,
      }
    );
    res.json(categoryDoc);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json('Delete success');
  }
}
