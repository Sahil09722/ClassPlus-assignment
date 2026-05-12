import { useState } from 'react';
import { templates, categories } from '../data/templates';
import GreetingPreview from './GreetingPreview';

export default function Home({ userName, userProfilePic }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  const handleTemplateClick = (template) => {
    if (template.isPremium) {
      setShowPremiumModal(true);
    } else {
      setSelectedTemplate(template);
    }
  };

  if (selectedTemplate) {
    return (
      <GreetingPreview 
        template={selectedTemplate} 
        userName={userName} 
        userProfilePic={userProfilePic} 
        onBack={() => setSelectedTemplate(null)} 
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {userName}!</h1>
        <p className="text-gray-500">Choose a template to create your custom greeting.</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTemplates.map((template) => (
          <div 
            key={template.id} 
            onClick={() => handleTemplateClick(template)}
            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-gray-50"
          >
            <img 
              src={template.imageUrl} 
              alt={`${template.category} template`} 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {template.isPremium && (
              <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow">
                ⭐ PRO
              </div>
            )}

            <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-opacity flex items-center justify-center">
               <span className="opacity-0 group-hover:opacity-100 text-white font-bold drop-shadow-md">
                 {template.isPremium ? 'Unlock Pro' : 'Select Template'}
               </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No templates found for this category yet.
        </div>
      )}

      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
            <div className="text-4xl mb-4">⭐</div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Premium Template</h2>
            <p className="text-gray-600 mb-6">
              Unlock this design and hundreds more by upgrading to our Pro plan!
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="bg-yellow-400 text-yellow-900 font-bold py-2 rounded-lg hover:bg-yellow-500 transition"
              >
                Upgrade to Pro
              </button>
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="text-gray-500 font-medium hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}