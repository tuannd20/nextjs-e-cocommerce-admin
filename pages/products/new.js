import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NewProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [goToProductList, setGoToProductList] = useState(false);
  const router = useRouter();

  const createProducts = async (ev) => {
    ev.preventDefault();
    const payload = { title, description, price };
    await axios.post('/api/products', payload);
    setGoToProductList(true);
  };

  if (goToProductList) {
    router.push('/products');
  }
  return (
    <Layout>
      <form action='' onSubmit={createProducts}>
        <h1>New Product</h1>
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
    </Layout>
  );
};

export default NewProduct;
