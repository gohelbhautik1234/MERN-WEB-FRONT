import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
export default function Edit() {

    const [Signupinfo, setSignupinfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [error, seterror] = useState({});

    function Updateinformation(e) {
        setSignupinfo({ ...Signupinfo, [e.target.name]: e.target.value })
    }

    function validationForm() {
        const errors = {};
        if (Signupinfo.name == '') {
            errors.name = "Full Name is Required";
        }
        if (Signupinfo.email == '') {
            errors.email = "Email is Required";
        }
        if (Signupinfo.email != '' && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(Signupinfo.email)) {
            errors.email = "Invalid email address";
        }
        if (Signupinfo.password == '') {
            errors.password = "Password is Required";
        }

        return errors
    }
    async function handlesubmit() {
        const newerrors = validationForm();
        if (Object.keys(newerrors).length) {
            seterror(newerrors);
        }
        else {
            let data = await axios.post("http://localhost:5000/register", Signupinfo);
            console.log(data);
            localStorage.setItem('token', data.auth);
            localStorage.setItem('user', data.data._id);
            if (data.status == 200) {
                navigate("/")
            }
        }
    }
    return (
        <>
            <div class="bg-gray-100 flex h-9/10 items-center justify-center px-4 py-13 sm:px-6 lg:px-8">
                <div class="w-full max-w-md space-y-8">
                    <div class="bg-white shadow-md rounded-md p-6">

                        <img class="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

                        <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign up for an account
                        </h2>
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                            <div class="mt-1">
                                <input name="name" type="text"
                                    class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
                                {error && <div className="text-red-500">{error.name}</div>}

                            </div>
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <div class="mt-1">
                                <input name="email" type="email"
                                    class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
                                {error && <div className="text-red-500">{error.email}</div>}
                            </div>
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <div class="mt-1">
                                <input name="password" type="password"
                                    class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e) => Updateinformation(e)} />
                                {error && <div className="text-red-500">{error.password}</div>}
                            </div>
                        </div>
                        <div>
                            <button type="submit"
                                class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 mt-5" onClick={handlesubmit}>Register
                                Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
