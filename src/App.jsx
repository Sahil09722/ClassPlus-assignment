import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileReady, setIsProfileReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser && localStorage.getItem('userName') && localStorage.getItem('userPic')) {
        setIsProfileReady(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsProfileReady(false); 
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {user && (
        <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <strong className="text-xl font-bold text-indigo-600">Greetings Hub</strong>
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Log Out
          </button>
        </nav>
      )}

      <main className="flex-1 flex items-center justify-center p-6">
        {!user ? (
          <Login onLoginSuccess={(user) => setUser(user)} />
        ) : !isProfileReady ? (
          <ProfileSetup user={user} onComplete={() => setIsProfileReady(true)} />
        ) : (
          <div className="text-center p-10 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl w-full">
            <img 
               src={localStorage.getItem('userPic')} 
               alt="Profile" 
               className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-indigo-50 shadow-sm mb-4" 
            />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome back, {localStorage.getItem('userName')}!
            </h2>
            <p className="text-gray-500"></p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;