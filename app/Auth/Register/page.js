'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import Footer from '../../components/Footer';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    if (!email || !password) {
      setAlertMessage('Both email and password are required.');
      setTimeout(() => setAlertMessage(''), 3000);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/Dashboard');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already in use');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else {
        setError('Registration failed. Please try again later.');
      }
      console.error('Register error:', err.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/Dashboard');
    } catch (err) {
      setError('Google login failed. Please try again later.');
      console.error('Google login error:', err.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E3DFF2]">
      <div className="flex justify-center items-center flex-grow py-12">
        <div className="w-96 p-8 bg-[#f7f7f7] border-2 border-[black] shadow-xl">
          <h2 className="text-center text-4xl font-bold mb-6 text-[#111111]">Register</h2>

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
            onClick={handleRegister}
            className="w-full py-4 text-white font-semibold rounded-lg"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
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
              onClick={() => router.push('/Auth/Login')}
            >
              Already have an account? Login here
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
