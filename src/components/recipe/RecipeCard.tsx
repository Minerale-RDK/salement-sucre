// src/components/recipe/RecipeCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import type { RecipeCard as RecipeCardType } from '@/types/recipe.types';

interface RecipeCardProps {
  recipe: RecipeCardType;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { t } = useTranslation('common');
  const {
    id,
    title,
    image,
    prepTime,
    difficulty,
    category,
    description
  } = recipe;

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden group hover:transform hover:scale-[1.02] transition-all duration-300">
      <Link href={`/recettes/${id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover filter group-hover:brightness-110 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-3 py-1 bg-gray-800 text-xs text-gray-300 uppercase tracking-wider rounded-full">
              {category}
            </span>
            <span className="px-3 py-1 bg-gray-800 text-xs text-gray-300 uppercase tracking-wider rounded-full">
              {t(`recipe.difficulty.${difficulty}`)}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2 tracking-wider">{title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center text-sm text-gray-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {prepTime} {t('recipe.time')}
          </div>
        </div>
      </Link>
    </div>
  );
}