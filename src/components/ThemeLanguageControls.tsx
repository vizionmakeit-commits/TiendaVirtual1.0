import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const ThemeLanguageControls: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
      {/* Control de Tema */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-white/80 hover:bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
        aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4 text-gray-600 hover:text-gray-800 transition-colors" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500 hover:text-yellow-600 transition-colors" />
        )}
      </button>

      {/* Control de Idioma */}
      <div className="relative group">
        <button
          className="p-2 rounded-lg bg-white/80 hover:bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm flex items-center space-x-1"
          aria-label="Cambiar idioma"
          title="Cambiar idioma"
        >
          <Globe className="w-4 h-4 text-gray-600 hover:text-gray-800 transition-colors" />
          <span className="text-xs font-medium text-gray-600 uppercase">
            {language}
          </span>
        </button>

        {/* Dropdown de idiomas */}
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[100px]">
          <button
            onClick={() => setLanguage('es')}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg ${
              language === 'es' ? 'bg-gray-50 font-medium text-gray-900' : 'text-gray-700'
            }`}
          >
            🇪🇸 Español
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors last:rounded-b-lg ${
              language === 'en' ? 'bg-gray-50 font-medium text-gray-900' : 'text-gray-700'
            }`}
          >
            🇺🇸 English
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeLanguageControls;