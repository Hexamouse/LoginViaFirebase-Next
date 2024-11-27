'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import Footer from '../../components/Footer';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Visibilitas State Modal

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    if (!email || !password) {
      setAlertMessage('Both email and password are required.');
      setTimeout(() => setAlertMessage(''), 3000);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      setModalOpen(true); // Open Modal
      setTimeout(() => router.push('/Dashboard'), 2000); // Ngedirect ke dashboard
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email format');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (err.code === 'auth/user-not-found') {
        setError('No user found with this email');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid credentials, please try again');
      } else {
        setError('Login failed. Please try again later.');
      }
      console.error('Login error:', err.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      setModalOpen(true);
    //   setTimeout(() => router.push('/Dashboard'), 2000); // Offkan jika error
    } catch (err) {
      setError('Google login failed. Please try again later.');
      console.error('Google login error:', err.message);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-[#E3DFF2]">
      <div className="background-container">
        <div className="line-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="line"></div>
          ))}
        </div>

        <style jsx>{`
          .background-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
          }

          .line-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .line {
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: rgba(0, 0, 0, 0.2);
            animation: moveLine 5s infinite linear;
          }

          @keyframes moveLine {
            0% {
              transform: translateY(-100%);
            }
            50% {
              transform: translateY(100%);
            }
            100% {
              transform: translateY(-100%);
            }
          }

          .line:nth-child(odd) {
            animation-duration: 6s;
          }

          .line:nth-child(even) {
            animation-duration: 4s;
          }
        `}</style>
      </div>

      {/* Form */}
      <div className="w-96 p-8 bg-[#f7f7f7] border-2 border-[black] shadow-xl z-10">
        <h2 className="text-center text-4xl font-bold mb-6 text-[#111111]">Login</h2>

        {alertMessage && <Alert className="mb-4" message={alertMessage} />}
        {error && <Alert className="mb-4" message={error} />}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-[#333333]" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            value={email}
            setValue={setEmail}
            placeholder="Enter your email"
            className="text-[#A388EE]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-[#333333]" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="Enter your password"
            className="text-[#A388EE]"
          />
        </div>

        <Button
          onClick={handleLogin}
          className="w-full py-4 text-white font-semibold rounded-lg"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        {/* Google Button */}
        <div className="mt-4 text-center">
          <Button
            onClick={handleGoogleLogin}
            className="w-full py-4 bg-[#4285F4] text-white font-semibold rounded-lg"
            disabled={loading}
          >
            {loading ? 'Logging in with Google...' : 'Login with Google'}
          </Button>
        </div>

        <div className="text-center mt-4">
          <button
            className="text-[#A388EE] hover:text-[#7a62bd]"
            onClick={() => router.push('/Auth/Register')}
          >
            Don’t have an account? Register here
          </button>
        </div>
      </div>

      {/* Pop Up Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white border-2 border-[black] p-6 shadow-lg text-center">
            <h3 className="text-2xl text-[black] font-normal mb-2">Login Successful!</h3>
            <p className="mb-6 text-[black] font-light">Welcome!</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
