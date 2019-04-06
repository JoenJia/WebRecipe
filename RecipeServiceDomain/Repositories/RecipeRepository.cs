using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RecipeServiceDomain.Contexts.Models;

namespace RecipeServiceDomain.Repositories
{
    public class RecipeRepository : AbstractRepository, IRecipeRepository
    {
        public RecipeRepository(Contexts.IModelRecipe db) : base(db) { }
        public IEnumerable<Contexts.Models.Recipe> GetAll()
        {
                return db.Recipes.ToList();
        }
        public IEnumerable<Recipe> GetLatest(DateTime refreshTime)
        {
            refreshTime = refreshTime.AddSeconds(1);
                return db.Recipes.Where(x => x.last_updated >= refreshTime).ToList();
        }
        public IEnumerable<Recipe> Search(string terms)
        {
                return db.Recipes.Where(x => x.recipe_title.Contains(terms)).ToList();
        }

        public Recipe Find(int id)
        {
                return db.Recipes.Where(x => x.recipe_id == id).FirstOrDefault();
        }

        // POST api/values
        public void Create(Recipe recipe)
        {
                db.Recipes.Attach(recipe);
                db.SaveChanges();
        }

        // PUT api/values/5
        public void Update(int id, Recipe recipe)
        {
        }

        // DELETE api/values/5
        public int Delete(int id)
        {
                var r = db.Recipes.Where(x => x.recipe_id == id).FirstOrDefault();
                if (r != null)
                {
                    r.is_deleted = true;
                    db.SaveChanges();
                    return 1;
                }
            return 0;
        }

        public void AddExtraTestRecipes()
        {
            if (db.Recipes.Any(x => x.recipe_id > 920))
            {

                //var sql = "update recipe set is_deleted = 0, last_update=getdate() where recipe_id > 920";
                var extraRecipes = db.Recipes.Where(r => r.recipe_id > 920);
                foreach(var r in extraRecipes)
                {
                    r.is_deleted = false;
                    r.last_updated = DateTime.Now;
                }
                db.SaveChanges();
            }
            else
            {
                var sqlFile = "Contests/Initial/TestRecipe2.sql";
                db.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
                sqlFile = "Contests/Initial/TestRecipeIngredient2.sql";
                db.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
            }

        }
        public void DeleteExtraTestRecipes()
        {
            var sql = "update recipe set is_deleted = 1, last_updated = getdate() where recipe_id > 920";
            db.Database.ExecuteSqlCommand(sql);
        }

    }
}
