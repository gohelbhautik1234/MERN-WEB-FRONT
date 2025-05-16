import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import axiosinstance from '../utils/axiosinstance';
import axios from 'axios';
export default function View() {

    const location = useLocation();
    const navigate = useNavigate();
    const [productlist, setProductlist] = useState([]);
    const [searchinput, setsearchinput] = useState();
    const [user, setuser] = useState();
    useEffect(() => {
        setuser(localStorage.getItem('user'));
    }, [location])

    const getProduct = async () => {
        const data = await axios.get("https://mern-web-backend.vercel.app/getproduct");
        setProductlist(data.data);
    }

    useEffect(() => {
        getProduct();
    }, [])

    useEffect(() => {
        if (searchinput == '') {
            getProduct()
        }
        else {
            searchproduct();
        }
    }, [searchinput])

    const searchproduct = async () => {
        const data = await axios.get(`https://mern-web-backend.vercel.app/searchproduct/${searchinput}`);
        console.log("seachinput", searchinput);
        if (searchinput == '') {
            setProductlist(products);
        }
        else {
            console.log(data.data);
            setProductlist(data.data);
        }
    }

    useEffect(() => {
        getProduct();
    }, [location])

    const Updateproduct = async (id) => {
        navigate(`/edit/${id}`)
    }

    const deleteproduct = async (id) => {
        const data = await axiosinstance.delete(`/deleteproduct/${id}`);
        getProduct();
    }

    return (
        <>
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-3xl font-bold text-center mb-8"> Product Listing</h1>
                <div class="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div class="w-full mb-4 md:mb-0">
                        <input type="text" onChange={(e) => (setsearchinput(e.target.value))} placeholder="Search Product..." class="w-full px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div class="overflow-x-auto bg-white rounded-lg shadow">
                    <table class="w-full table-auto">
                        <thead>
                            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-left">Name</th>
                                <th class="py-3 px-6 text-left">Price</th>
                                <th class="py-3 px-6 text-left">Company</th>
                                <th class="py-3 px-6 text-left">Category</th>
                                <th class="py-3 px-6 text-left">UserId</th>
                                {user != null && user != undefined && <th class="py-3 px-6 text-center">Actions</th>}
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 text-sm">
                            {
                                productlist.length > 0 && productlist.map((ele) => (
                                    <>
                                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                                            <td class="py-3 px-6 text-left">{ele.name}</td>
                                            <td class="py-3 px-6 text-left">{ele.price}</td>
                                            <td class="py-3 px-6 text-left">{ele.company}</td>
                                            <td class="py-3 px-6 text-left">{ele.category}</td>
                                            <td class="py-3 px-6 text-left">{ele.userId}</td>
                                            {
                                                user != null && user != undefined &&
                                                <td class="py-3 px-6 text-center">
                                                    <div class="flex item-center justify-center">
                                                        <button class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" onClick={() => (Updateproduct(ele._id))}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                        <button class="w-4 mr-2 transform hover:text-red-500 hover:scale-110" onClick={() => (deleteproduct(ele._id))}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            }
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
