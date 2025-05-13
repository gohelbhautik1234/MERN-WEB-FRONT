import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
export default function Edit() {
    const navigate = useNavigate()
    const [Logiinfo, setLogininfo] = useState({
        email: '',
        password: ''
    });
    const [error, seterror] = useState({});

    function Updateinformation(e) {
        setLogininfo({ ...Logiinfo, [e.target.name]: e.target.value })
    }

    function validationForm() {
        const errors = {};
        if (Logiinfo.email == '') {
            errors.email = "Email is Required";
        }
        if (Logiinfo.password == '') {
            errors.pass = "Password is Required";
        }
        if (Logiinfo.email != '' && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(Logiinfo.email)) {
            errors.email = "Invalid email address";
        }
        return errors
    }
    async function handlesubmit() {
        const newerrors = validationForm();
        console.log(newerrors)
        if (Object.keys(newerrors).length) {
            seterror(newerrors);
        }
        else {
            console.log("Logiinfo", Logiinfo);
            let data = await axios.post("http://localhost:5000/login", Logiinfo);
            console.log(data);
            if (data.data == false) {
                navigate("/Signup")
            }
            else {
                localStorage.setItem('user', data.data.data._id);
                localStorage.setItem('token', data.data.auth);
                navigate("/");
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
                            Login for an account
                        </h2>

                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Email</label>
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
                                {error && <div className="text-red-500">{error.pass}</div>}
                            </div>
                        </div>
                        <div>
                            <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 mt-5" onClick={handlesubmit}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
