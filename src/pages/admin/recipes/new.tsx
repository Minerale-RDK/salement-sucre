// src/pages/admin/recipes/new.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import BaseLayout from '@/components/layout/BaseLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export default function NewRecipePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [recipeData, setRecipeData] = useState({
    translations: {
      fr: { title: '', description: '', slug: '' },
      en: { title: '', description: '', slug: '' }
    },
    mainImage: '',
    category: '',
    prepTime: 0,
    cookTime: 0,
    servings: 4,
    difficulty: 'INTERMEDIATE',
    ingredients: [] as Array<{
      translations: {
        fr: { name: string; unit: string };
        en: { name: string; unit: string };
      }
    }>,
    steps: [] as Array<{
      image: string;
      translations: {
        fr: { description: string };
        en: { description: string };
      }
    }>,
    images: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Appel API pour créer la recette
      router.push('/admin/recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Nouvelle Recette</h1>
        
        <div className="space-y-8">
          {/* Indicateur d'étapes */}
          <div className="flex justify-center space-x-4 mb-8">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setCurrentStep(step)}
                className={`w-8 h-8 ${
                  currentStep >= step ? 'bg-black border border-white-200' : 'bg-gray-700'
                }`}
              >
                {step}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Informations de base */}
                {currentStep === 1 && (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-white">Informations générales</h2>
    
    {/* Version française */}
    <div className="border border-gray-700 p-4 space-y-4">
      <h3 className="text-lg text-white">Version française</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Titre
        </label>
        <input
          type="text"
          value={recipeData.translations.fr.title}
          onChange={(e) => setRecipeData({
            ...recipeData,
            translations: {
              ...recipeData.translations,
              fr: {
                ...recipeData.translations.fr,
                title: e.target.value,
                slug: e.target.value.toLowerCase()
                  .replace(/[éèê]/g, 'e')
                  .replace(/[àâ]/g, 'a')
                  .replace(/[ùû]/g, 'u')
                  .replace(/[ôö]/g, 'o')
                  .replace(/[ïî]/g, 'i')
                  .replace(/[ç]/g, 'c')
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '')
              }
            }
          })}
          className="w-full bg-gray-800 border-gray-700 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={recipeData.translations.fr.description}
          onChange={(e) => setRecipeData({
            ...recipeData,
            translations: {
              ...recipeData.translations,
              fr: {
                ...recipeData.translations.fr,
                description: e.target.value
              }
            }
          })}
          className="w-full bg-gray-800 border-gray-700 text-white h-24"
          required
        />
      </div>
    </div>

    {/* Version anglaise */}
    <div className="border border-gray-700 p-4 space-y-4">
      <h3 className="text-lg text-white">Version anglaise</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={recipeData.translations.en.title}
          onChange={(e) => setRecipeData({
            ...recipeData,
            translations: {
              ...recipeData.translations,
              en: {
                ...recipeData.translations.en,
                title: e.target.value,
                slug: e.target.value.toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '')
              }
            }
          })}
          className="w-full bg-gray-800 border-gray-700 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={recipeData.translations.en.description}
          onChange={(e) => setRecipeData({
            ...recipeData,
            translations: {
              ...recipeData.translations,
              en: {
                ...recipeData.translations.en,
                description: e.target.value
              }
            }
          })}
          className="w-full bg-gray-800 border-gray-700 text-white h-24"
          required
        />
      </div>
    </div>

    {/* Informations techniques */}
    <div className="border border-gray-700 p-4 space-y-4">
      <h3 className="text-lg text-white">Informations techniques</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Temps de préparation (minutes)
          </label>
          <input
            type="number"
            value={recipeData.prepTime}
            onChange={(e) => setRecipeData({
              ...recipeData,
              prepTime: parseInt(e.target.value)
            })}
            className="w-full bg-gray-800 border-gray-700 text-white"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Temps de cuisson (minutes)
          </label>
          <input
            type="number"
            value={recipeData.cookTime}
            onChange={(e) => setRecipeData({
              ...recipeData,
              cookTime: parseInt(e.target.value)
            })}
            className="w-full bg-gray-800 border-gray-700 text-white"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Nombre de portions
          </label>
          <input
            type="number"
            value={recipeData.servings}
            onChange={(e) => setRecipeData({
              ...recipeData,
              servings: parseInt(e.target.value)
            })}
            className="w-full bg-gray-800 border-gray-700 text-white"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Difficulté
          </label>
          <select
            value={recipeData.difficulty}
            onChange={(e) => setRecipeData({
              ...recipeData,
              difficulty: e.target.value
            })}
            className="w-full bg-gray-800 border-gray-700 text-white"
            required
          >
            <option value="EASY">Facile</option>
            <option value="INTERMEDIATE">Intermédiaire</option>
            <option value="HARD">Difficile</option>
            <option value="EXPERT">Expert</option>
          </select>
        </div>
      </div>

            {/* Image principale */}
<div className="border border-gray-700  p-4 space-y-4">
  <h3 className="text-lg text-white">Image principale</h3>
  
  <div className="aspect-[16/9] bg-gray-800  overflow-hidden relative">
    {recipeData.mainImage ? (
      <>
        <img
          src={recipeData.mainImage}
          alt="Image principale de la recette"
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={() => setRecipeData({
            ...recipeData,
            mainImage: ''
          })}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2  text-white"
        >
          <span className="sr-only">Supprimer l'image</span>
          ✕
        </button>
      </>
    ) : (
      <label className="w-full h-full flex items-center justify-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            if (e.target.files?.[0]) {
              const formData = new FormData();
              formData.append('image', e.target.files[0]);
              
              try {
                const response = await fetch('/api/upload', {
                  method: 'POST',
                  body: formData,
                });
                const data = await response.json();
                
                setRecipeData({
                  ...recipeData,
                  mainImage: data.url
                });
              } catch (error) {
                console.error('Upload failed:', error);
                // TODO: Ajouter une notification d'erreur
              }
            }
          }}
        />
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-gray-400">
            + Ajouter une image principale
          </span>
          <p className="text-gray-500 text-sm mt-1">
            Format recommandé : 16:9
          </p>
        </div>
      </label>
    )}
  </div>
</div>

    </div>
  </div>
)}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Ingrédients */}
                {currentStep === 2 && (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-white">Ingrédients</h2>

    <div className="space-y-4">
      {recipeData.ingredients.map((ingredient, index) => (
        <div key={index} className="border border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-white">Ingrédient {index + 1}</h3>
            <button
              type="button"
              onClick={() => {
                const newIngredients = [...recipeData.ingredients];
                newIngredients.splice(index, 1);
                setRecipeData({
                  ...recipeData,
                  ingredients: newIngredients
                });
              }}
              className="text-red-500 hover:text-red-400"
            >
              Supprimer
            </button>
          </div>

          {/* Version française */}
          <div className="mb-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nom (FR)
              </label>
              <input
                type="text"
                value={ingredient.translations.fr.name}
                onChange={(e) => {
                  const newIngredients = [...recipeData.ingredients];
                  newIngredients[index] = {
                    ...newIngredients[index],
                    translations: {
                      ...newIngredients[index].translations,
                      fr: {
                        ...newIngredients[index].translations.fr,
                        name: e.target.value
                      }
                    }
                  };
                  setRecipeData({
                    ...recipeData,
                    ingredients: newIngredients
                  });
                }}
                className="w-full bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Quantité (FR)
              </label>
              <input
                type="text"
                value={ingredient.translations.fr.unit}
                onChange={(e) => {
                  const newIngredients = [...recipeData.ingredients];
                  newIngredients[index] = {
                    ...newIngredients[index],
                    translations: {
                      ...newIngredients[index].translations,
                      fr: {
                        ...newIngredients[index].translations.fr,
                        unit: e.target.value
                      }
                    }
                  };
                  setRecipeData({
                    ...recipeData,
                    ingredients: newIngredients
                  });
                }}
                className="w-full bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
          </div>

          {/* Version anglaise */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name (EN)
              </label>
              <input
                type="text"
                value={ingredient.translations.en.name}
                onChange={(e) => {
                  const newIngredients = [...recipeData.ingredients];
                  newIngredients[index] = {
                    ...newIngredients[index],
                    translations: {
                      ...newIngredients[index].translations,
                      en: {
                        ...newIngredients[index].translations.en,
                        name: e.target.value
                      }
                    }
                  };
                  setRecipeData({
                    ...recipeData,
                    ingredients: newIngredients
                  });
                }}
                className="w-full bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Quantity (EN)
              </label>
              <input
                type="text"
                value={ingredient.translations.en.unit}
                onChange={(e) => {
                  const newIngredients = [...recipeData.ingredients];
                  newIngredients[index] = {
                    ...newIngredients[index],
                    translations: {
                      ...newIngredients[index].translations,
                      en: {
                        ...newIngredients[index].translations.en,
                        unit: e.target.value
                      }
                    }
                  };
                  setRecipeData({
                    ...recipeData,
                    ingredients: newIngredients
                  });
                }}
                className="w-full bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          setRecipeData({
            ...recipeData,
            ingredients: [
              ...recipeData.ingredients,
              {
                translations: {
                  fr: { name: '', unit: '' },
                  en: { name: '', unit: '' }
                }
              }
            ]
          });
        }}
        className="w-full py-3 border-2 border-dashed border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300 transition-colors"
      >
        + Ajouter un ingrédient
      </button>
    </div>
  </div>
)}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Étapes */}
                {currentStep === 3 && (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-white">Étapes de préparation</h2>

    <div className="space-y-4">
      {recipeData.steps.map((step, index) => (
        <div key={index} className="border border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-white">Étape {index + 1}</h3>
            <button
              type="button"
              onClick={() => {
                const newSteps = [...recipeData.steps];
                newSteps.splice(index, 1);
                setRecipeData({
                  ...recipeData,
                  steps: newSteps
                });
              }}
              className="text-red-500 hover:text-red-400"
            >
              Supprimer
            </button>
          </div>

          {/* Image upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image de l'étape
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video bg-gray-800 overflow-hidden relative">
                {step.image ? (
                  <>
                    <img
                      src={step.image}
                      alt={`Étape ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newSteps = [...recipeData.steps];
                        newSteps[index] = {
                          ...newSteps[index],
                          image: ''
                        };
                        setRecipeData({
                          ...recipeData,
                          steps: newSteps
                        });
                      }}
                      className="absolute top-2 right-2 bg-red-500 p-1"
                    >
                      <span className="sr-only">Supprimer l'image</span>
                      ✕
                    </button>
                  </>
                ) : (
                  <label className="w-full h-full flex items-center justify-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          const formData = new FormData();
                          formData.append('image', e.target.files[0]);
                          
                          try {
                            const response = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData,
                            });
                            const data = await response.json();
                            
                            const newSteps = [...recipeData.steps];
                            newSteps[index] = {
                              ...newSteps[index],
                              image: data.url
                            };
                            setRecipeData({
                              ...recipeData,
                              steps: newSteps
                            });
                          } catch (error) {
                            console.error('Upload failed:', error);
                            // TODO: Gérer l'erreur
                          }
                        }
                      }}
                    />
                    <span className="text-gray-400">+ Ajouter une image</span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Instructions FR */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Instructions (FR)
            </label>
            <textarea
              value={step.translations.fr.description}
              onChange={(e) => {
                const newSteps = [...recipeData.steps];
                newSteps[index] = {
                  ...newSteps[index],
                  translations: {
                    ...newSteps[index].translations,
                    fr: {
                      ...newSteps[index].translations.fr,
                      description: e.target.value
                    }
                  }
                };
                setRecipeData({
                  ...recipeData,
                  steps: newSteps
                });
              }}
              className="w-full bg-gray-800 border-gray-700 text-white h-24"
              required
            />
          </div>

          {/* Instructions EN */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Instructions (EN)
            </label>
            <textarea
              value={step.translations.en.description}
              onChange={(e) => {
                const newSteps = [...recipeData.steps];
                newSteps[index] = {
                  ...newSteps[index],
                  translations: {
                    ...newSteps[index].translations,
                    en: {
                      ...newSteps[index].translations.en,
                      description: e.target.value
                    }
                  }
                };
                setRecipeData({
                  ...recipeData,
                  steps: newSteps
                });
              }}
              className="w-full bg-gray-800 border-gray-700 text-white h-24"
              required
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          setRecipeData({
            ...recipeData,
            steps: [
              ...recipeData.steps,
              {
                image: '',
                translations: {
                  fr: { description: '' },
                  en: { description: '' }
                }
              }
            ]
          });
        }}
        className="w-full py-3 border-2 border-dashed border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300 transition-colors"
      >
        + Ajouter une étape
      </button>
    </div>
  </div>
)}
              </div>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-gray-800 text-white px-4 py-2"
                >
                  Précédent
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-purple-600 text-white px-4 py-2"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2"
                  disabled={loading}
                >
                  {loading ? 'Création...' : 'Créer la recette'}
                </button>
              )}
            </div>
          </form>
        </div>
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