using System;
using System.Collections.Generic;
using RecipeServiceDomain.Contexts.Models;

namespace RecipeServiceDomain.Repositories
{
    public interface IRecipeRepository
    {
        void AddExtraTestRecipes();
        int Delete(int id);
        void DeleteExtraTestRecipes();
        IEnumerable<Recipe> GetAll();
        Recipe Find(int id);
        IEnumerable<Recipe> GetLatest(DateTime refreshTime);
        void Create(Recipe recipe);
        void Update(int id, Recipe recipe);
        IEnumerable<Recipe> Search(string terms);
    }
}