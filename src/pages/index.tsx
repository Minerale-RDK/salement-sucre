// src/pages/index.tsx
import { useState } from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import BaseLayout from '@/components/layout/BaseLayout';
import RecipeCard from '@/components/recipe/RecipeCard';
import type { RecipeCard as RecipeCardType } from '@/types/recipe.types';

// À remplacer par un appel API réel
const MOCK_RECIPES: RecipeCardType[] = [
  {
    id: 1,
    title: "Tarte au Citron Meringuée",
    image: "/images/placeholder.png",
    prepTime: 60,
    difficulty: "intermediate",
    category: "desserts",
    description: "Une tarte au citron classique revisitée avec une meringue française légère et aérienne."
  },
  {
    id: 2,
    title: "Mille-feuille Vanille",
    image: "/images/placeholder.png",
    prepTime: 120,
    difficulty: "expert",
    category: "viennoiseries",
    description: "Un classique de la pâtisserie française avec une crème vanille onctueuse."
  },
  {
    id: 3,
    title: "Éclair au Chocolat",
    image: "/images/placeholder.png",
    prepTime: 90,
    difficulty: "intermediate",
    category: "desserts",
    description: "Des éclairs croustillants garnis d'une crème pâtissière au chocolat noir."
  }
];

export default function HomePage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const { t } = useTranslation('common');

  return (
    <BaseLayout>
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-5rem)]">
  <div className="absolute inset-0 bg-black">
    {/* Image de fallback en arrière-plan */}
    
    
    {/* Vidéo au premier plan */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-60 z-10"
    >

<Image
      src="/images/hero-fallback.png"
      alt={t('hero.title')}
      fill
      className="object-cover opacity-40 z-0"
      priority
    />
      <source src="/images/hero-video.mp4" type="video/mp4" />
    </video>
  </div>
        
        {/* Contenu Hero */}
        <div className="relative h-full flex items-center justify-center text-center px-4 z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 tracking-wide">
              {t('hero.subtitle')}
            </p>
            <Link 
              href="/recettes"
              className="inline-block bg-white text-black px-8 py-4 text-lg font-semibold tracking-wider hover:bg-gray-200 transition-colors"
            >
              {t('hero.cta')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Latest Recipes Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-wider">
            {t('recipes.latest')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {MOCK_RECIPES.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/recettes"
              className="inline-block border border-gray-600 text-gray-300 px-6 py-3 hover:bg-gray-800 hover:border-gray-500 transition-colors tracking-wider"
            >
              {t('recipes.viewAll')}
            </Link>
          </div>
        </div>
      </section>

    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
    },
  };
};