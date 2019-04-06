using System.Collections.Generic;
using RecipeServiceDomain.Contexts.Models;

namespace RecipeServiceDomain.Repositories
{
    public interface IRecipeImageRepository
    {
        void Create(RecipeImage recipeImage);
        int Delete(string name);
        RecipeImage Find(string name);
        IEnumerable<RecipeImage> GetAll();
        void Update(int id, RecipeImage recipeImage);
    }
}