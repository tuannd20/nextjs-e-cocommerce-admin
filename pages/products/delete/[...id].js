import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DeleteProductPage = () => {
  const router = useRouter();
  const [productInfor, setProductInfor] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id=' + id).then((response) => {
      setProductInfor(response.data);
    });
  }, [id]);

  const goBack = () => {
    router.push('/products');
  };

  const handleDeleteProduct = async () => {
    await axios.delete('/api/products?id=' + id);
    goBack();
  };

  return (
    <Layout>
      <h1> Do dou want to delete &nbsp;`{productInfor?.title}`?</h1>
      <div className='flex gap-2'>
        <button className='btn-red' onClick={handleDeleteProduct}>
          Yes
        </button>
        <button className='btn-default' onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
};

export default DeleteProductPage;
