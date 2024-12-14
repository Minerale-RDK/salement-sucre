// src/config/routes.ts
type RouteConfig = {
    [key: string]: {
      fr: string;
      en: string;
    };
  };
  
  export const routes: RouteConfig = {
    recipes: {
      fr: 'recettes',
      en: 'recipes'
    },
    categories: {
      fr: 'categories',
      en: 'categories'
    },
    about: {
      fr: 'a-propos',
      en: 'about'
    }
  };
  
  export function getLocalizedPath(path: string, locale: string): string {
    const segments = path.split('/').filter(Boolean);
    const localizedSegments = segments.map(segment => {
      // Cherche une traduction pour ce segment
      const route = Object.entries(routes).find(([_, translations]) => 
        Object.values(translations).includes(segment)
      );
      
      // Si une traduction existe, utilise-la, sinon garde le segment original
      return route ? routes[route[0]][locale as 'fr' | 'en'] : segment;
    });
  
    return `/${localizedSegments.join('/')}`;
  }