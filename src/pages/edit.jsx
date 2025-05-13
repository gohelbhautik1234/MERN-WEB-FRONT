import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import axiosinstance from '../utils/axiosinstance';
export default function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.id);

  const [Productinfo, setProductinfo] = useState({
    name: '',
    price: '',
    category: '',
    company: '',
  });
  const [error, seterror] = useState({});

  async function getproduct() {
    const data = await axiosinstance.get(`/getproduct/${params.id}`);
    if (data && data.data) {
      setProductinfo((item) => ({ ...item, ...data.data }));
    }
  }

  useEffect(() => {
    getproduct();
  }, []);

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
      const product = { ...Productinfo, userId: localStorage.getItem('user'), Id: params.id }
      const data = await axiosinstance.put("/updateproduct", product);

      if (data?.data?.modifiedCount == 1) {
        toast.success("Product Update successfully!");
        navigate("/")

      }
      else {
        toast.error("Failed to Update product. Please check your input or try again.");
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
                <input name="name" type="text" value={Productinfo.name}
                  class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
              </div>
            </div>

            <div>
              <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
              <div class="mt-1">
                <input name="price" type="number" value={Productinfo.price}
                  class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
              </div>
            </div>
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
              <div class="mt-1">
                <input name="category" type="text" value={Productinfo.category}
                  class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
              </div>
            </div>

            <div>
              <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
              <div class="mt-1">
                <input name="company" type="text" value={Productinfo.company}
                  class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
              </div>
            </div>
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 mt-5" onClick={save}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
