
using System;
namespace RecipeServiceDomain.Repositories
{
    public interface IContextRepositories : IDisposable
    {
        IRecipeRepository RecipeRepository { get; }
        IIngredientRepository IngredientRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        IRecipeImageRepository RecipeImageRepository { get; }
        void Save();
    }
}
