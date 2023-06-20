import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';

const ProductForm = ({
  _id,
  title: titleItem,
  category: assignedCategory,
  description: descriptionItem,
  price: priceItem,
  images: existingImages,
}) => {
  const [title, setTitle] = useState(titleItem || '');
  const [description, setDescription] = useState(descriptionItem || '');
  const [price, setPrice] = useState(priceItem || '');
  const [images, setImages] = useState(existingImages || []);
  const [goToProductList, setGoToProductList] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState(assignedCategory || '');
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
    });
  }, []);

  const saveProduct = async (ev) => {
    ev.preventDefault();
    const payload = { title, description, price, images, category };
    if (_id) {
      //update product
      await axios.put('/api/products', { ...payload, _id });
    } else {
      //create product
      await axios.post('/api/products', payload);
    }
    setGoToProductList(true);
  };

  if (goToProductList) {
    router.push('/products');
  }

  const uploadImages = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const uploadFiles = await axios.post('/api/upload', data);
      setImages((oldImages) => {
        return [...oldImages, ...uploadFiles.data.links];
      });
      setIsUploading(false);
    }
  };

  function updateImagesOrder(images) {
    setImages(images);
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
      <label htmlFor=''>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value=''>Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.nameCategory}
            </option>
          ))}
      </select>
      <label className='mt-4'>Photos</label>
      <div className='mb-4 flex flex-wrap gap-3 items-center'>
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className='flex flex-wrap gap-2'
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className='h-24'>
                <img src={link} alt='' className='rounded-lg' />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className='h-24 flex items-center bg-gray-200 p-1'>
            <Spinner></Spinner>
          </div>
        )}
        <label className='w-24 h-24 cursor-pointer bg-gray-200 rounded-md mt-2 flex justify-center items-center flex-col text-gray-500 text-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15'
            />
          </svg>
          <div className='mt-2'>Upload</div>
          <input type='file' className='hidden' onChange={uploadImages} />
        </label>
        {/* {!images?.length && (
          <div className='mt-2'>No photos in this product</div>
        )} */}
      </div>
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
