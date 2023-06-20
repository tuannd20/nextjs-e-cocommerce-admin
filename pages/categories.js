/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { withSwal } from 'react-sweetalert2';

const Categories = ({ swal }) => {
  const [editedCategory, setEditedCategory] = useState(null);
  const [nameCategory, setNameCategory] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
    });
  };

  const saveCategory = async (ev) => {
    ev.preventDefault();
    const payload = { nameCategory, parentCategory };
    if (editedCategory) {
      payload._id = editedCategory._id;
      console.log(payload);
      await axios.put('/api/categories', payload);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', payload);
    }
    setNameCategory('');
    setParentCategory('');
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setNameCategory(category.nameCategory);
    setParentCategory(category.parent?._id);
  };

  const deleteCategory = (category) => {
    swal
      .fire({
        title: 'Are you sure?',
        text: `Do you want to delete "${category.nameCategory}"?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, Delete!',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete('/api/categories?_id=' + _id);
          fetchCategories();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label htmlFor=''>
        {editedCategory
          ? `Edit category "${editedCategory.nameCategory}"`
          : 'Create new category'}
      </label>
      <form onSubmit={saveCategory} className='flex gap-1 items-center'>
        <input
          className='mb-0'
          type='text'
          placeholder={'Category name'}
          value={nameCategory}
          onChange={(ev) => setNameCategory(ev.target.value)}
        />
        <select
          className='mb-0'
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
          <option value='0'>No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.nameCategory}
              </option>
            ))}
        </select>
        <button type='submit' className='btn-primary px-4 text-center'>
          Save
        </button>
      </form>
      <div>
        <table className='basic-table mt-4'>
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.nameCategory}</td>
                  <td>{category?.parent?.nameCategory}</td>
                  <td className='flex gap-2 items-center justify-center'>
                    <button
                      className='btn-edit'
                      onClick={() => editCategory(category)}
                    >
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
                          d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      className='btn-delete'
                      onClick={() => deleteCategory(category)}
                    >
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
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
