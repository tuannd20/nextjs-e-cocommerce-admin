import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProductForm = ({
  _id,
  title: titleItem,
  description: descriptionItem,
  price: priceItem,
}) => {
  console.log('pass data: ', _id);
  const [title, setTitle] = useState(titleItem || '');
  const [description, setDescription] = useState(descriptionItem || '');
  const [price, setPrice] = useState(priceItem || '');
  const [goToProductList, setGoToProductList] = useState(false);
  const router = useRouter();

  const saveProduct = async (ev) => {
    ev.preventDefault();
    const payload = { title, description, price };
    if (_id) {
      //update product
      await axios.put('api/products', { ...payload, _id });
    } else {
      //create product
      await axios.post('/api/products', payload);
    }
    setGoToProductList(true);
  };

  if (goToProductList) {
    router.push('/products');
  }
  return (
    <form action='' onSubmit={saveProduct}>
      <label htmlFor=''>Product name</label>
      <input
        type='text'
        placeholder='product name'
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label htmlFor=''>Description</label>
      <textarea
        placeholder='Description'
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label htmlFor=''>Price (in USD)</label>
      <input
        type='number'
        placeholder='price'
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type='submit' className='btn-primary'>
        Save
      </button>
    </form>
  );
};

export default ProductForm;
