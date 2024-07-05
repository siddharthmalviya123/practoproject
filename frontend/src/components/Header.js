import React from 'react';
// import { IoIosArrowDropdown } from "react-icons/io";
// import SearchBar from './Search';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
const Header = () => { 
    const user = useSelector((state)=>state.user)
    const dispatch= useDispatch();
    const Navigate= useNavigate();
    console.log(user);


    const logoutHandler = async () => {
        try {
            dispatch(setUser(null));
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            Navigate("/");

        } catch (error) {
            console.log(error);
        }
    }
    const appointmentHandler =()=>{
        Navigate('/appointments')
    }
    const homeHandler=()=>{
        Navigate('/');
    }

    return (
        <div>
            <div className='z-10 h-30 flex w-full items-center justify-between px-6 border border-slate-200 '>
                <img className='w-56 h-20' src="https://blog.practo.com/wp-content/uploads/2017/04/1.png" alt="practo-logo" />

                {user.user ? (
                    <div className='flex items-center'>
                        {/* <IoIosArrowDropdown size="24px" color='black' /> */}
                        <h1 className='text-lg font-medium text-black'>{user.user.p_name}</h1>
                        <div className='ml-4'>
                            <button onClick={logoutHandler}className='border border-slate-600 rounded-lg text-slate-600 px-4 py-2 hover:border-blue-900 hover:text-blue-900'>Logout</button>
                        </div>
                        <div className='ml-4'>
                            <button onClick={appointmentHandler}className='border border-slate-600 rounded-lg text-slate-600 px-4 py-2 hover:border-blue-900 hover:text-blue-900'>Your Appointments</button>
                        </div>
                        <div className='ml-4'>
                            <button onClick={homeHandler}className='border border-slate-600 rounded-lg text-slate-600 px-4 py-2 hover:border-blue-900 hover:text-blue-900'>Home Page</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button onClick={()=>Navigate('/login')} className='border border-slate-600 rounded-lg text-slate-600 px-4 py-2 hover:border-blue-900 hover:text-blue-900 '>
                            Login/signin
                        </button>
                    </div>
                )}
            </div>
            {/* <SearchBar /> */}
        </div>
    );
}

export default Header;
