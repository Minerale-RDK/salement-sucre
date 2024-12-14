export type Difficulty = 'easy' | 'intermediate' | 'hard' | 'expert';
export type Locale = 'fr' | 'en';

export interface RecipeTranslation {
  title: string;
  description: string;
  ingredients: {
    name: string;
    unit: string;
  }[];
  steps: {
    description: string;
  }[];
}

export interface Recipe {
  id: number;
  slug: string;
  image: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  difficulty: Difficulty;
  category: string;
  translations: {
    [key in Locale]: RecipeTranslation;
  };
  createdAt: string;
  updatedAt: string;
}

export type RecipeCard = Pick<Recipe, 'id' | 'image' | 'prepTime' | 'difficulty' | 'category'> & {
  title: string;
  description: string;
};