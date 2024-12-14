import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import LanguageSelector from './LanguageSelector';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('common');

  const navigationItems = [
    { key: 'home', href: '/' },
    { key: 'recipes', href: '/recettes' },
    { key: 'categories', href: '/categories' },
    { key: 'about', href: '/a-propos' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-200">
      <nav className="bg-black border-b border-gray-80 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-white tracking-wider">
                  SALEMENT SUCRÉ
                </Link>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                {navigationItems.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    className="text-gray-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:text-white hover:border-gray-500"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Language Selector & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <div className="sm:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white"
                >
                  <span className="sr-only">{t('nav.menu')}</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden bg-gray-900">
            <div className="pt-2 pb-3 space-y-1">
              {navigationItems.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500"
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-black-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* À propos */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white tracking-wider">À PROPOS</h3>
              <p className="text-gray-400">
                Découvrez mes créations pâtissières et suivez-moi sur Instagram pour plus d&apos;inspiration gourmande.
              </p>
            </div>
            {/* Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white tracking-wider">NAVIGATION</h3>
              <ul className="space-y-2">
                {['RECETTES', 'CATÉGORIES', 'À PROPOS'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                      className="text-gray-400 hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Social */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white tracking-wider">SUIVEZ-MOI</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/salement_sucre"
                  className="text-gray-400 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white-800 pt-8">
            <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} SALEMENT SUCRÉ. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}