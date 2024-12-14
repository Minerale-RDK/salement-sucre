import { GetStaticProps, GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { Clock, Users, ChefHat } from 'lucide-react';
import BaseLayout from '@/components/layout/BaseLayout';
import type { Recipe } from '@/types/recipe.types';

interface RecipeDetailPageProps {
  recipe: Recipe;
}

export default function RecipeDetailPage({ recipe }: RecipeDetailPageProps) {
  const { t, i18n } = useTranslation('common');
  const translation = recipe.translations[i18n.language as 'fr' | 'en'];

  return (
    <BaseLayout>
      <article className="min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[60vh]">
          <Image
            src={recipe.image}
            alt={translation.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 w-full p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {translation.title}
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                {translation.description}
              </p>
              <div className="flex flex-wrap gap-6 text-gray-200">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{recipe.prepTime + recipe.cookTime} {t('recipe.time')}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{recipe.servings} {t('recipe.servings')}</span>
                </div>
                <div className="flex items-center">
                  <ChefHat className="w-5 h-5 mr-2" />
                  <span>{t(`recipe.difficulty.${recipe.difficulty}`)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Ingredients */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">{t('recipe.ingredients')}</h2>
            <div className="grid gap-4">
              {translation.ingredients.map((ingredient, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-gray-300">{ingredient.name}</span>
                  <span className="text-gray-400">{ingredient.unit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">{t('recipe.steps')}</h2>
            <div className="space-y-8">
              {translation.steps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-8 h-8  bg-black-500 border flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-1">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </BaseLayout>
  );
}

// Mock function to get recipe data - replace with actual API call
async function getRecipe(id: string): Promise<Recipe | null> {
  // Simulating API call
  const recipe: Recipe = {
    id: parseInt(id),
    slug: 'tarte-citron-meringuee',
    image: "/images/placeholder.png",
    prepTime: 45,
    cookTime: 35,
    totalTime: 80,
    servings: 8,
    difficulty: 'intermediate',
    category: 'pies',
    translations: {
      fr: {
        title: 'Tarte au Citron Meringuée',
        description: 'Une tarte au citron classique revisitée avec une meringue française légère et aérienne.',
        ingredients: [
          { name: 'Farine', unit: '250g' },
          { name: 'Beurre', unit: '125g' },
          { name: 'Sucre', unit: '100g' },
          { name: 'Citrons', unit: '4' }
        ],
        steps: [
          { description: 'Préparer la pâte sablée...' },
          { description: 'Réaliser la crème au citron...' },
          { description: 'Monter la meringue...' }
        ]
      },
      en: {
        title: 'Lemon Meringue Pie',
        description: 'A classic lemon tart revisited with a light and airy French meringue.',
        ingredients: [
          { name: 'Flour', unit: '250g' },
          { name: 'Butter', unit: '125g' },
          { name: 'Sugar', unit: '100g' },
          { name: 'Lemons', unit: '4' }
        ],
        steps: [
          { description: 'Prepare the shortcrust pastry...' },
          { description: 'Make the lemon curd...' },
          { description: 'Whip up the meringue...' }
        ]
      }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return recipe;
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  // Dans un vrai projet, vous récupéreriez la liste des IDs depuis votre API
  const paths = [1, 2, 3].flatMap(id => 
    locales.map(locale => ({
      params: { id: id.toString() },
      locale
    }))
  );

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params?.id) {
    return {
      notFound: true
    };
  }

  const recipe = await getRecipe(params.id as string);

  if (!recipe) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      recipe,
      ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
    },
    revalidate: 60 // Revalidate every minute
  };
};