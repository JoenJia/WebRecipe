using System.Data.Entity;
using RecipeServiceDomain.Contexts.Models;

namespace RecipeServiceDomain.Contexts
{
    public interface IModelRecipe
    {
        DbSet<Category> Categories { get; set; }
        DbSet<Ingredient> Ingredients { get; set; }
        DbSet<RecipeImage> RecipeImages { get; set; }
        DbSet<Recipe> Recipes { get; set; }
        int SaveChanges();
        System.Data.Entity.Database Database {get;}
        void Dispose();
    }
}