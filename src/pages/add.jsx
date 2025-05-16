import { useState } from 'react'
import axiosinstance from '../utils/axiosinstance';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

export default function Add() {

  const navigate = useNavigate()

  const [Productinfo, setProductinfo] = useState({
    name: '',
    price: '',
    category: '',
    company: '',
    userId: localStorage.getItem('user'),
  });
  const [error, seterror] = useState({});


  function Updateinformation(e) {
    setProductinfo({ ...Productinfo, [e.target.name]: e.target.value })
  }

  function validationForm() {
    const errors = {};
    if (Productinfo.name == '') {
      errors.name = "Name is Required";
    }
    if (Productinfo.price == '') {
      errors.price = "Price is Required";
    }
    if (Productinfo.category == '') {
      errors.category = "Category is Required";
    }
    if (Productinfo.company == '') {
      errors.company = "Company is Required";
    }
    return errors
  }

  async function save() {
    const newerrors = validationForm();
    if (Object.keys(newerrors).length) {
      seterror(newerrors);
    }
    else {
      const data = await axiosinstance.post("/addproduct", Productinfo);
      if (data.status == 200 && data.data.success) {
        toast.success("Product added successfully!")
        navigate('/view')
      }
      else {
        toast.error("Failed to add product. Please check your input or try again.");
      }
    }
  }
  return (
    <>
      <div class="bg-gray-100 flex h-9/10 items-center justify-center px-4 py-13 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div class="bg-white shadow-md rounded-md p-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
              <div class="mt-1">
                <input name="name" type="text"
                  class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
                {error && <div className="text-red-500">{error.name}</div>}
              </div>
            </div>

            <div>
              <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
              <div class="mt-1">
                <input name="price" type="number"
                  class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
                {error && <div className="text-red-500">{error.price}</div>}
              </div>
            </div>
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
              <div class="mt-1">
                <input name="category" type="text"
                  class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
                {error && <div className="text-red-500">{error.category}</div>}

              </div>
            </div>

            <div>
              <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
              <div class="mt-1">
                <input name="company" type="text"
                  class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
                {error && <div className="text-red-500">{error.company}</div>}
              </div>
            </div>
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 mt-5" onClick={save}>
                Save
              </button>
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </>
  )
}
