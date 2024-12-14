// src/pages/recettes/index.tsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, AnimatePresence, stagger } from 'framer-motion';
import { Search, ChevronDown, Check } from 'lucide-react';
import BaseLayout from '@/components/layout/BaseLayout';
import RecipeCard from '@/components/recipe/RecipeCard';
import type { RecipeCard as RecipeCardType } from '@/types/recipe.types';


type SortOption = 'recent' | 'popular' | 'prepTime';
type CategoryKey = 'all' | 'desserts' | 'viennoiseries' | 'cakes' | 'pies';

const CATEGORY_KEYS: CategoryKey[] = ['all', 'desserts', 'viennoiseries', 'cakes', 'pies'];
const SORT_OPTIONS: { value: SortOption; translationKey: string }[] = [
  { value: 'recent', translationKey: 'recipes.sortOptions.recent' },
  { value: 'popular', translationKey: 'recipes.sortOptions.popular' },
  { value: 'prepTime', translationKey: 'recipes.sortOptions.prepTime' }
];

const FilterButton = ({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm transition-colors ${
      active 
        ? 'bg-purple-500 text-white' 
        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
    }`}
  >
    {children}
  </button>
);

interface DropdownProps {
  labelKey: string;
  options: { value: string; labelKey: string }[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown = ({ labelKey, options, value, onChange }: DropdownProps) => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
<button
  onClick={() => setIsOpen(!isOpen)}
  className="min-w-[160px] flex items-center justify-between px-1 py-2 bg-transparent border-b border-gray-700 text-gray-400 hover:border-purple-500 transition-colors"
>
  <span className="mr-2 text-sm">
    {selectedOption ? t(selectedOption.labelKey) : t(labelKey)}
  </span>
  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
</button>
      
      {isOpen && (
  <div className="absolute z-50 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
  {/* Avant: className="w-full" */}
  <div className="py-1 min-w-full whitespace-nowrap"> {/* min-w-full assure que la largeur minimale est celle du bouton */}
    {options.map((option) => (
      <button
        key={option.value}
        onClick={() => {
          onChange(option.value);
          setIsOpen(false);
        }}
        className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
      >
        <span className="flex-grow text-left">{t(option.labelKey)}</span>
        {value === option.value && (
          <Check className="w-4 h-4 text-purple-500 ml-2 flex-shrink-0" />
        )}
      </button>
    ))}
  </div>
</div>
)}
    </div>
  );
};

// Fonction fetchRecipes (reste inchangée)
const fetchRecipes = async (
    page: number,
    searchQuery: string = '',
    category: CategoryKey = 'all',
    sortBy: SortOption = 'recent',
    limit: number = 12
  ): Promise<{ recipes: RecipeCardType[]; hasMore: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const allRecipes: RecipeCardType[] = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Recipe ${i + 1}`,
      image: "/images/placeholder.png",
      prepTime: 30 + Math.floor(Math.random() * 90),
      difficulty: ["easy", "intermediate", "hard", "expert"][Math.floor(Math.random() * 4)] as RecipeCardType['difficulty'],
      category: CATEGORY_KEYS[Math.floor(Math.random() * CATEGORY_KEYS.length)],
      description: `Description de la recette ${i + 1}...`
    }));
  
    let filteredRecipes = allRecipes;
  
    if (searchQuery) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    if (category !== 'all') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
    }
  
    filteredRecipes.sort((a, b) => {
      switch (sortBy) {
        case 'prepTime':
          return a.prepTime - b.prepTime;
        case 'popular':
          return Math.random() - 0.5;
        case 'recent':
        default:
          return b.id - a.id;
      }
    });
  
    const paginatedRecipes = filteredRecipes.slice(
      (page - 1) * limit,
      page * limit
    );
  
    return {
      recipes: paginatedRecipes,
      hasMore: page * limit < filteredRecipes.length
    };
  };
  

  export default function RecipesPage() {
    const { t } = useTranslation('common');
    const [recipes, setRecipes] = useState<RecipeCardType[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
    const [sortBy, setSortBy] = useState<SortOption>('recent');
    const [page, setPage] = useState(1);
    const observer = useRef<IntersectionObserver | null>(null);
  
    // Préparer les options pour les dropdowns avec les clés de traduction
    const categoryOptions = CATEGORY_KEYS.map(key => ({
      value: key,
      labelKey: `recipes.filters.categories.${key}`
    }));
    
    const sortOptions = SORT_OPTIONS.map(({ value, translationKey }) => ({
      value,
      labelKey: translationKey
    }));

  const lastRecipeElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1);
      setRecipes([]);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
    setRecipes([]);
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        const { recipes: newRecipes, hasMore: more } = await fetchRecipes(
          page,
          debouncedSearchQuery,
          selectedCategory,
          sortBy
        );
        
        setRecipes(prev => page === 1 ? newRecipes : [...prev, ...newRecipes]);
        setHasMore(more);
      } catch (error) {
        console.error('Erreur lors du chargement des recettes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [page, debouncedSearchQuery, selectedCategory, sortBy]);

  return (
    <BaseLayout>
      <div className="min-h-[calc(100vh-24rem)] max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-8">{t('recipes.title')}</h1>
          
          <div className="relative mb-6">
  <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder={t('recipes.searchPlaceholder')}
    className="w-full bg-transparent pl-8 pr-4 py-2 text-gray-300 border-b border-gray-700 focus:border-purple-500 focus:outline-none transition-colors"
  />
</div>

          {/* Filtres Mobile */}
          <div className="md:hidden space-y-4">
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(({ value, labelKey }) => (
                <FilterButton
                  key={value}
                  active={selectedCategory === value}
                  onClick={() => setSelectedCategory(value as CategoryKey)}
                >
                  {t(labelKey)}
                </FilterButton>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map(({ value, labelKey }) => (
                <FilterButton
                  key={value}
                  active={sortBy === value}
                  onClick={() => setSortBy(value as SortOption)}
                >
                  {t(labelKey)}
                </FilterButton>
              ))}
            </div>
          </div>

          {/* Filtres Desktop */}
          <div className="hidden md:flex gap-4">
            <Dropdown
              labelKey="recipes.filters.category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value as CategoryKey)}
            />
            <Dropdown
              labelKey="recipes.filters.sortBy"
              options={sortOptions}
              value={sortBy}
              onChange={(value) => setSortBy(value as SortOption)}
            />
          </div>
        </div>

        {/* Grille de recettes */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[50vh]"
        >
          <AnimatePresence mode="popLayout">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                ref={index === recipes.length - 1 ? lastRecipeElementRef : null}
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {t('recipes.noResults')}
            </p>
          </div>
        )}
      </div>
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