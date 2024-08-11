'use client'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle, FaLinkedinIn, FaRegEnvelope, FaUser } from "react-icons/fa";
import { MdLockOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { signInUser, signUpUser } from '../../store/authSlice';
import { useAppDispatch, type RootState } from '../../store/store';

export default function Auth() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user)
  const { data: session } = useSession();
  const [isSignUpTabSelected, setSignUpTabSelected] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);

  const handleSignInSignUpOnClick = () => {
    setSignUpTabSelected(!isSignUpTabSelected);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setErrors({});
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'Name') {
      setFirstName(value);
    } else if (name === 'Last Name') {
      setLastName(value);
    } else if (name === 'Email') {
      setEmail(value);
    } else if (name === 'Password') {
      setPassword(value);
    }
  };

  const handleSignIn = async () => {
    try {
      const action = await dispatch(signInUser({ email, password }));

      if (signInUser.fulfilled.match(action)) {
        const userData = action.payload;
        console.log('Sign in successful:', userData);
      }

      if (signInUser.rejected.match(action)) {
        const errorMessage = action.error.message;
        console.error('Sign in failed:', errorMessage);
      }
    } catch (error) {
      console.error('Error dispatching sign in:', error);
    }
  };

  const handleSignUp = async (username: string) => {
    console.log(username, 'username');

    try {
      const action = await dispatch(signUpUser({ username, email, password }));

      if (signUpUser.fulfilled.match(action)) {
        const userData = action.payload;
        console.log('Sign up successful:', userData);
      }

      if (signUpUser.rejected.match(action)) {
        const errorMessage = action.error.message;
        console.error('Sign up failed:', errorMessage);
      }
    } catch (error) {
      console.error('Error dispatching sign up:', error);
    }
  };

  const handleSubmit = (isSignUpTabSelected: boolean) => {
    setErrors({});

    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim() && isSignUpTabSelected) {
      newErrors['Name'] = 'First name is required';
    }
    if (!lastName.trim() && isSignUpTabSelected) {
      newErrors['Last Name'] = 'Last name is required';
    }
    if (!email.trim()) {
      newErrors['Email'] = 'Email is required';
    }
    if (!password.trim()) {
      newErrors['Password'] = 'Password is required';
    }

    setErrors(newErrors);
    console.log('I am here', Object.keys(newErrors).length === 0 && !isSignUpTabSelected);
    console.log(isSignUpTabSelected);
    console.log(Object.keys(newErrors).length);

    if (Object.keys(newErrors).length === 0 && isSignUpTabSelected) {
      const username = firstName + ' ' + lastName;
      handleSignUp(username);
    }
    else if (Object.keys(newErrors).length === 0 && !isSignUpTabSelected) {
      handleSignIn();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full flex-1 px-20 text-center">
      <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
        <div className="w-3/5 p-5">
          <div className="text-left font-bold">
            <span className="text-green-500">Comm</span>unify
          </div>
          <div className="py-10">
            <h2 className="text-3xl font-bold text-green-500 mb-2">
              {!isSignUpTabSelected ?
                "Sign in to your Account"
                :
                "Please create your Account"
              }
            </h2>
            <div className=" border-2 w-10 border-green-500 inline-block mb-2"></div>
            <div className="flex justify-center my-2">
              <div className="border-2 border-gray-200 rounded-full p-3 mx-1 cursor-pointer" onClick={() => signIn()}>
                <FaGoogle className="text-sm" />
              </div>
              <a href='' className="border-2 border-gray-200 rounded-full p-3 mx-1 cursor-pointer">
                <FaGithub className="text-sm" />
              </a>
              <a href='' className="border-2 border-gray-200 rounded-full p-3 mx-1 cursor-pointer">
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
            <div className="text-gray-400 my-3">or use email account</div>
            <div className="flex flex-col items-center">
              {isSignUpTabSelected && (
                <div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center">
                    <FaUser className="text-gray-400 m-2" />
                    <input
                      type="text"
                      name="Name"
                      placeholder="First Name"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      value={firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex text-start mb-3">
                    {errors['Name'] && <span className="text-red-500 text-xs">{errors['Name']}</span>}
                  </div>
                </div>
              )}

              {isSignUpTabSelected && (
                <div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center">
                    <FaUser className="text-gray-400 m-2" />
                    <input
                      type="text"
                      name="Last Name"
                      placeholder="Last Name"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      value={lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex text-start mb-3">
                    {errors['Last Name'] && <span className="text-red-500 text-xs">{errors['Last Name']}</span>}
                  </div>
                </div>
              )}

              <div>
                <div className="bg-gray-100 w-64 p-2 flex items-center">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex text-start mb-3">
                  {errors['Email'] && <span className="text-red-500 text-xs">{errors['Email']}</span>}
                </div>
              </div>

              <div>
                <div className="bg-gray-100 w-64 p-2 flex items-center relative justify-between">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="Password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1 pr-[35px]"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 mr-2"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </div>
                <div className="flex text-start mb-3">
                  {errors['Password'] && <span className="text-red-500 text-xs">{errors['Password']}</span>}
                </div>
              </div>

              {/* <div className="flex justify-between w-64 mb-5">
                <label className="flex items-center text-xs">
                  <input type='checkbox' name='remember' className="mr-1" />
                  Remember me
                </label>
                <a href='a' className="text-xs">Forget Password</a>
              </div> */}
              <button
                className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
                onClick={() => { handleSubmit(isSignUpTabSelected) }}
              >
                {!isSignUpTabSelected ?
                  "Sign In"
                  :
                  "Sign Up"
                }
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-2">Hello, Friends!</h2>
          <div className=" border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-10">
            {!isSignUpTabSelected ?
              'Fill up your personal information and start your journey with us'
              :
              'Account already exist ?'
            }
          </p>
          <button
            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
            onClick={() => { handleSignInSignUpOnClick() }}
          >
            {!isSignUpTabSelected ?
              "Sign Up"
              :
              "Sign In"
            }
          </button>
        </div>
      </div>
    </div>
  );
}
