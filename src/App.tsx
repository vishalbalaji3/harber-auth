import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in environment variables');
}

type AuthMode = 'sign-in' | 'sign-up';

function App() {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');
    if (urlMode === 'sign-up') {
      setMode('sign-up');
    }
  }, []);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Harber
          </h1>
          <p className="text-gray-600 mt-2">Sign in to continue to the Form Filler</p>
        </div>

        <SignedOut>
          <div className="bg-white rounded-xl shadow-xl p-2">
            {mode === 'sign-in' ? (
              <SignIn 
                routing="hash"
                signUpUrl="?mode=sign-up"
                afterSignInUrl="?success=true"
              />
            ) : (
              <SignUp 
                routing="hash"
                signInUrl="?mode=sign-in"
                afterSignUpUrl="?success=true"
              />
            )}
          </div>
        </SignedOut>

        <SignedIn>
          <SuccessMessage onClose={() => setShowSuccess(false)} />
        </SignedIn>
      </div>
    </ClerkProvider>
  );
}

function SuccessMessage({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // Check if we just signed in
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      // Clear the URL parameter
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-md">
      <div className="mb-4">
        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">You're signed in!</h2>
      <p className="text-gray-600 mb-6">
        You can now close this tab and return to the Harber extension. Your session will sync automatically.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => window.close()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Close This Tab
        </button>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Signed in as</span>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}

export default App;
