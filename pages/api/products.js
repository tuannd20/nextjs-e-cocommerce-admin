import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {
    const { title, description, price, images } = req.body;
    const productDOc = await Product.create({
      title,
      description,
      price,
      images,
    });
    res.json(productDOc);
  }

  // if (method === 'PUT') {
  //   const { title, description, price, _id } = req.body;
  //   const product = await Product.findById(_id);

  //   if (!product) {
  //     return res.status(404).json({ message: 'Product not found' });
  //   }

  //   const result = await Product.updateOne(
  //     { _id: req.query?.id },
  //     { title, description, price }
  //   );

  //   res.status(200).json({ message: 'Product updated successfully', result });
  // }

  if (method === 'PUT') {
    const { title, description, price, images, _id } = req.body;
    await Product.updateOne({ _id }, { title, description, price, images });
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
