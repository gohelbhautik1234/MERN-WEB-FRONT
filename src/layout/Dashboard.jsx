import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Link } from 'react-router'
export default function Dashboard() {

    const location = useLocation();
    const [user, setuser] = useState();
    useEffect(() => {
        setuser(localStorage.getItem('user'));
    }, [location])

    return (
        <>
            <header class="bg-blue-900 text-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div class="flex items-center justify-between">
                        {/* Logo Section  */}
                        <div class="flex-shrink-0">
                            <a href="#" class="text-2xl font-bold">Products</a>
                        </div>

                        {/* Navigation Menu */}
                        {
                            user == null || user == undefined ?
                                <>
                                    <nav class="hidden md:flex space-x-10 text-lg">
                                        <Link to="/" class="hover:text-gray-300 transition-all">Home</Link>
                                        <Link to="/view" class="hover:text-gray-300 transition-all">View Products</Link>
                                        <Link to="/Signup" class="hover:text-gray-300 transition-all">SignUp</Link>
                                        <Link to="/Login" class="hover:text-gray-300 transition-all">Login</Link>
                                    </nav>
                                </>
                                :
                                <>
                                    <nav class="hidden md:flex space-x-10 text-lg">
                                        <Link to="/" class="hover:text-gray-300 transition-all">Home</Link>
                                        <Link to="/add" class="hover:text-gray-300 transition-all">Add Product</Link>
                                        <Link to="/view" class="hover:text-gray-300 transition-all">View Products</Link>
                                        <Link to="/profile" class="hover:text-gray-300 transition-all">Profile</Link>
                                        <Link to="/Signup" onClick={() => (localStorage.clear())} className="nav-link">Logout</Link>
                                    </nav>
                                </>
                        }

                        {/* Mobile Menu Button (for smaller screens)  */}
                        <div class="md:hidden flex items-center">
                            <button id="menu-button" class="text-white focus:outline-none">
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {
                        user == null || user == undefined ?
                            <>
                                <div id="mobile-menu" class="md:hidden mt-5 hidden space-y-4">
                                    <Link to="/" class="block text-lg hover:text-gray-300 transition-all">Home</Link>
                                    <Link to="/view" class="block text-lg hover:text-gray-300 transition-all">View Products</Link>
                                    <Link to="/Signup" class="block text-lg hover:text-gray-300 transition-all">SignUp</Link>
                                    <Link to="/Login" class="block text-lg hover:text-gray-300 transition-all">Login</Link>
                                </div>
                            </>
                            :
                            <>
                                <div id="mobile-menu" class="md:hidden mt-5 hidden space-y-4">
                                    <Link to="/" class="block text-lg hover:text-gray-300 transition-all">Home</Link>
                                    <Link to="/view" class="block text-lg hover:text-gray-300 transition-all">View Products</Link>
                                    <Link to="/add" class="block text-lg hover:text-gray-300 transition-all">Add Product</Link>
                                    <Link to="/profile" class="block text-lg hover:text-gray-300 transition-all">Profile</Link>
                                    <Link to="/Signup" onClick={() => (localStorage.clear())} class="block text-lg hover:text-gray-300 transition-all">Logout</Link>
                                </div>
                            </>
                    }
                </div>
            </header>
            <Outlet />
        </>
    )
}
