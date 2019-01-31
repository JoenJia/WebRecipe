using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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

        public Models.Recipe Get(int id)
        {
            using (var db = new Models.ModelRecipe())
            {
                return db.Recipes.Where(x => x.recipe_id == id).FirstOrDefault();
            }
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
