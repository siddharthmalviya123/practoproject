import React, { useState } from 'react';
import Header from './Header';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/userSlice';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        patient {
          p_id,
          p_mob,
          p_name,
          p_username,
          appointments
        }
        token
      }
    }
  `;

  const SIGNUP_USER = gql`
   mutation AddPatient($email: String!, $password: String!, $conformpassword: String!, $mobile: String!, $name: String) {
  addPatient(email: $email, password: $password, conformpassword: $conformpassword, mobile: $mobile, name: $name) {
    p_id,
    p_mob,
    p_name,
    p_username
  }
}
  `;
  const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER);
  const [signup, { loading: signupLoading, error: signupError }] = useMutation(SIGNUP_USER);

  const isLoading = useSelector((store) => store.user.isLoading);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };
  const handleMobile =(e)=>{
    setMobile(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Check if passwords match whenever password changes
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check if passwords match whenever confirm password changes
    setPasswordMatch(e.target.value === password);
  };

  const getInputData = async (e) => {
    e.preventDefault();

    if (!passwordMatch && !isLogin) {
      alert('Passwords do not match.');
      return;
    }
    if (!isLogin && (mobile.length !== 10 || !/^\d+$/.test(mobile))) {
        alert('Mobile number should be numeric and exactly 10 digits long.');
        return;
      }

    dispatch(setLoading(true));

    try {
      if (isLogin) {
        // Perform login
        const { data } = await login({
          variables: {
            email: email,
            password: password,
          },
        });
        console.log('LOGIN RESPONSE', data);
        toast.success('Logged In Successfully');
       
        dispatch(setUser(data?.login.patient));
        localStorage.setItem('token', JSON.stringify(data?.login.token));
        localStorage.setItem('user', JSON.stringify(data?.login.patient));
        navigate('/');
      } else {
        // Perform signup
        const { data } = await signup({
          variables: {
            name: fullName,
            email: email,
            password: password,
            mobile:mobile,
            conformpassword:confirmPassword
          },
        });
        if(data.addPatient)
            {
                alert(`${data.addPatient.p_name} welcome to practo please login to proceed`)
            }
        console.log('SIGNUP RESPONSE', data);
        toast.success('Signed Up Successfully');
       
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
      alert("authentication failed")
      toast.error(error.message);
      
    } finally {
      dispatch(setLoading(false));
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-[100vw] h-[100vh] bg-cover"
          src="https://www.shutterstock.com/image-photo/doctor-uniform-accesses-system-fingerprint-260nw-2258885589.jpg"
          alt="banner"
        />
      </div>
      <form
        onSubmit={getInputData}
        className="flex flex-col w-3/12 p-12 my-36 left-0 right-0  mx-auto items-center justify-center absolute rounded-md bg-black opacity-90"
      >
        <h1 className="text-3xl text-white mb-5 font-bold">{isLogin ? 'Login' : 'Signup'}</h1>
        <div className="flex flex-col">
          {!isLogin && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Fullname"
              className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />
          {!isLogin && (
            <input
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
              placeholder="Confirm Password"
              className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            />
          )}
           {!isLogin && (
            <input
              value={mobile}
              onChange={handleMobile}
              placeholder="Mobile"
              className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            />
          )}
          {/* Add a message for password mismatch */}
          <button
            type="submit"
            className="bg-red-600 mt-6 p-3 text-white rounded-sm font-medium"
          >
            {`${isLoading ? 'Loading...' : isLogin ? 'Login' : 'Signup'}`}
          </button>
          <p className="text-white mt-2">
            {isLogin ? 'New to Netflix?' : 'Already have an account?'}
            <span
              onClick={loginHandler}
              className="ml-1 text-blue-900 font-medium cursor-pointer"
            >
              {isLogin ? 'Signup' : 'Login'}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
