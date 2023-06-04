import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EditProductPage = () => {
  const [productInfor, setProductInfor] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get('/api/products?id=' + id).then((response) => {
      console.log(response.data);
      setProductInfor(response.data);
    });
  }, [id]);

  return (
    <div>
      <Layout>
        <h1>Update Product</h1>
        {productInfor && <ProductForm {...productInfor} />}
      </Layout>
    </div>
  );
};

export default EditProductPage;
