using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace RecipeService.Controllers
{
    public class RecipesController : ApiController
    {
        // GET api/values
        public IEnumerable<Models.Recipe> Get()
        {
            using (var db = new Models.ModelRecipe())
            {
                return db.Recipes.ToList();
            }
        }
        [HttpGet]
        public IEnumerable<Models.Recipe> GetLatest(DateTime refreshTime)
        {
            refreshTime = refreshTime.AddSeconds(1);
            using (var db = new Models.ModelRecipe())
            {
                return db.Recipes.Where(x => x.last_updated >= refreshTime).ToList();
            }
        }
        [HttpGet]
        public IEnumerable<Models.Recipe> Search(string terms)
        {
            using (var db = new Models.ModelRecipe())
            {
                return db.Recipes.Where(x => x.recipe_title.Contains(terms)).ToList();
            }
        }

        public Models.Recipe Get(int id)
        {
            using (var db = new Models.ModelRecipe())
            {
                return db.Recipes.Where(x => x.recipe_id == id).FirstOrDefault();
            }
        }

        // POST api/values
        public void Post([FromBody] Models.Recipe recipe)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] Models.Recipe recipe)
        {
        }

        // DELETE api/values/5
        public int Delete(int id)
        {
            using (var db = new Models.ModelRecipe())
            {
                var r = db.Recipes.Where(x => x.recipe_id == id).FirstOrDefault();
                if (r != null)
                {
                    r.is_deleted = true;
                    db.SaveChanges();
                    return 1;
                }
            }
            return 0;
        }

        [HttpPost]
        public void AddExtraTestRecipes()
        {
            using (var db = new Models.ModelRecipe())
            {
                if (db.Recipes.Any(x => x.recipe_id > 920))
                {
                    var sql = "update recipe set is_deleted = 0, last_update=getdate() where recipe_id > 920";
                    db.Database.ExecuteSqlCommand(sql);
                }
                else
                {
                    var sqlFile = HttpContext.Current.Server.MapPath("~/App_Data/TestRecipe2.sql");
                    db.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
                    sqlFile = HttpContext.Current.Server.MapPath("~/App_Data/TestRecipeIngredient2.sql");
                    db.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
                }
            }
        }
        [HttpPost]
        public void DeleteExtraTestRecipes()
        {
            using (var db = new Models.ModelRecipe())
            {
                var sql = "update recipe set is_deleted = 1, last_updated = getdate() where recipe_id > 920";
                db.Database.ExecuteSqlCommand(sql);
            }

        }
    }
}
