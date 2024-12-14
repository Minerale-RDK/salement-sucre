// src/components/layout/LanguageSelector.tsx
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LanguageSelector() {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  return (
    <div className="flex items-center space-x-4">
      <Link
        href={{ pathname, query }}
        as={asPath}
        locale="fr"
        className={`text-sm ${
          router.locale === 'fr'
            ? 'text-white font-semibold'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        FR
      </Link>
      <span className="text-gray-600">|</span>
      <Link
        href={{ pathname, query }}
        as={asPath}
        locale="en"
        className={`text-sm ${
          router.locale === 'en'
            ? 'text-white font-semibold'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </Link>
    </div>
  );
}