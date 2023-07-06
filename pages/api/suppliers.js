import { mongooseConnect } from '@/lib/mongoose';
import { Supplier } from '@/models/Supplier';

export default async function handleSupplier(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Supplier.findOne({ _id: req.query.id }));
    } else {
      res.json(await Supplier.find());
    }
  }

  if (method === 'POST') {
    const { supplierName, address, accessoryOptions } = req.body;
    const supplierDoc = await Supplier.create({
      name: supplierName,
      address: address,
      accessory: accessoryOptions,
    });
    res.json(supplierDoc);
  }
}
