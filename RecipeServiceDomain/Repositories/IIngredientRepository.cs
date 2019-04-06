using System;
using System.Collections.Generic;
using RecipeServiceDomain.Contexts.Models;

namespace RecipeServiceDomain.Repositories
{
    public interface IIngredientRepository
    {
        void Create(Ingredient ingredient);
        int Delete(int id);
        Ingredient Find(int id);
        IEnumerable<Ingredient> GetByRecipeId(int recipeId);
        IEnumerable<Ingredient> GetAll();
        IEnumerable<Ingredient> GetLatest(DateTime refreshTime);
        void Update(int id, Ingredient ingredient);
    }
}