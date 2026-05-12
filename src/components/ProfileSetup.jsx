import { useState, useEffect } from 'react';

export default function ProfileSetup({ user, onComplete }) {
  const [name, setName] = useState(user?.displayName || '');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedPic = localStorage.getItem('userPic');
    if (savedName) setName(savedName);
    if (savedPic) setImagePreview(savedPic);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !imagePreview) {
      alert("Please provide both a name and a profile picture!");
      return;
    }
    
    localStorage.setItem('userName', name);
    localStorage.setItem('userPic', imagePreview);
    onComplete(); 
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Set Up Your Profile</h3>
        <p className="text-gray-500">This information will be used to personalize your greetings.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center overflow-hidden transition-all ${imagePreview ? 'border-indigo-600' : 'border-dashed border-gray-300 bg-gray-50'}`}>
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 shadow-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                required={!imagePreview} 
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
          <input 
            type="text" 
            placeholder="e.g. Jane Doe" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-gray-900"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md transition-colors mt-2"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}