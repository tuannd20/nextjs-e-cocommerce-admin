import { Inter } from 'next/font/google';
import { useSession, signIn, signOut } from 'next-auth/react';
import Nav from '@/components/Nav';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        {/* Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button> */}
        <div className='bg-blue-600 w-screen h-screen flex items-center'>
          <div className='text-center w-full'>
            <button
              onClick={() => signIn('google')}
              className='bg-white p-2 rounded-lg px-4 font-bold'
            >
              Login with Google
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='bg-blue-700 min-h-screen flex'>
      <Nav></Nav>
      <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
        {/* <h1>Logged in {session.user.email}</h1>
        <button onClick={() => signOut()}>Sign out</button> */}
        {children}
      </div>
    </div>
  );
}
