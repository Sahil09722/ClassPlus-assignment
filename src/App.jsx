import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import Home from './components/Home';

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
   <div>
      {user && (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', background: '#ffffff', borderBottom: '1px solid #eee' }}>
          <strong style={{ fontSize: '1.2rem', color: '#333' }}>Custom Greetings</strong>
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ff4757', cursor: 'pointer', fontWeight: 'bold' }}>
            Log Out
          </button>
        </nav>
      )}

      {!user ? (
        <Login onLoginSuccess={(user) => setUser(user)} />
      ) : !isProfileReady ? (
        <ProfileSetup user={user} onComplete={() => setIsProfileReady(true)} />
      ) : (
        <Home userName={localStorage.getItem('userName')} userProfilePic={localStorage.getItem('userPic')} />
      )}
    </div>
  );
}

export default App;