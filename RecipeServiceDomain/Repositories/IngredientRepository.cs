using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RecipeServiceDomain.Contexts.Models;

namespace RecipeServiceDomain.Repositories
{
    public class IngredientRepository : AbstractRepository, IIngredientRepository
    {
        public IngredientRepository(Contexts.IModelRecipe db) : base(db) { }
        public IEnumerable<Contexts.Models.Ingredient> GetAll()
        {
                return db.Ingredients.ToList();
        }
        public IEnumerable<Ingredient> GetLatest(DateTime refreshTime)
        {
            refreshTime = refreshTime.AddSeconds(1);
            return (from r in db.Recipes
                    join i in db.Ingredients
                    on r.recipe_id equals i.recipe_id
                    where r.last_updated >= refreshTime
                    select i).ToList();
        }
        public IEnumerable<Ingredient> GetByRecipeId(int recipeId)
        {
            return db.Ingredients.Where(x => x.recipe_id == recipeId).ToList();
        }
        public Ingredient Find(int id)
        {
                return db.Ingredients.Where(x => x.ingredient_id == id).FirstOrDefault();
        }

        public void Create(Ingredient ingredient)
        {
                db.Ingredients.Attach(ingredient);
                db.SaveChanges();
        }

        public void Update(int id, Ingredient ingredient)
        {
        }

        public int Delete(int id)
        {
            //    var r = db.Ingredients.Where(x => x.ingredient_id == id).FirstOrDefault();
            //    if (r != null)
            //    {
            //        r.is_deleted = true;
            //        db.SaveChanges();
            //        return 1;
            //    }
            return 0;
        }

    }
}
