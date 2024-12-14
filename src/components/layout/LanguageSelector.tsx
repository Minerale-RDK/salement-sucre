import { useRouter } from 'next/router';
import { useState } from 'react';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const router = useRouter();
  const { pathname, query, asPath } = router;
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' }
  ];

  const handleLanguageChange = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-300">
          {router.locale?.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu déroulant */}
          <div className="absolute right-0 mt-2 py-1 w-32 bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors
                  ${router.locale === code 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{label}</span>
                  {router.locale === code && (
                    <span className="ml-auto text-purple-400">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;