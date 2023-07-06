import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Suppliers() {
  const [supplierName, setSupplierName] = useState('');
  const [address, setAddress] = useState('');
  const [accessoryOptions, setAccessoryOptions] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setAccessoryOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(value)) {
        return prevSelectedOptions.filter((option) => option !== value);
      } else {
        return [...prevSelectedOptions, value];
      }
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('/api/suppliers').then((result) => {
      setSuppliers(result.data);
    });
  };

  const saveSupplier = async (ev) => {
    ev.preventDefault();
    const payload = { supplierName, address, accessoryOptions };
    await axios.post('/api/suppliers', payload);
  };

  return (
    <Layout>
      <div>
        <form action='' onSubmit={saveSupplier}>
          <label htmlFor=''>Supplier name</label>
          <input
            type='text'
            placeholder='supplier name'
            value={supplierName}
            onChange={(ev) => setSupplierName(ev.target.value)}
          />
          <label htmlFor=''>Address</label>
          <input
            type='text'
            placeholder='address'
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          <label htmlFor=''>Accessory</label>
          <input
            type='text'
            placeholder='accessory'
            value={accessoryOptions}
            onChange={handleCheckboxChange}
            readOnly
          />
          <div>
            <label>
              <input
                type='checkbox'
                value='accessory1'
                checked={accessoryOptions.includes('accessory1')}
                onChange={handleCheckboxChange}
              />
              Accessory 1
            </label>
            <label>
              <input
                type='checkbox'
                value='accessory2'
                checked={accessoryOptions.includes('accessory2')}
                onChange={handleCheckboxChange}
              />
              Accessory 2
            </label>
            <label>
              <input
                type='checkbox'
                value='accessory3'
                checked={accessoryOptions.includes('accessory3')}
                onChange={handleCheckboxChange}
              />
              Accessory 3
            </label>
            <label>
              <input
                type='checkbox'
                value='accessory4'
                checked={accessoryOptions.includes('accessory4')}
                onChange={handleCheckboxChange}
              />
              Accessory 4
            </label>
          </div>
          <button type='submit' className='btn-primary'>
            Save
          </button>
        </form>
      </div>
      <div>
        <table className='basic-table mt-4'>
          <thead>
            <tr>
              <td>Supplier name</td>
              <td>Accessory</td>
              <td>Address</td>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 &&
              suppliers.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.accessory}</td>
                  <td>{item.address}</td>
                  {/* <td className='flex gap-2 items-center justify-center'>
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
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Suppliers;
