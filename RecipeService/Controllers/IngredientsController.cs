using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RecipeService.Controllers
{
    public class IngredientsController : ApiController
    {
        public IEnumerable<Models.Ingredient> Get()
        {
            using (var db = new Models.ModelRecipe())
            {
                return db.Ingredients.ToList();
            }
        }
        [HttpGet]
        public IEnumerable<Models.Ingredient> GetLatest(DateTime refreshTime)
        {
            refreshTime = refreshTime.AddSeconds(1);
            using (var db = new Models.ModelRecipe())
            {
                return (from r in db.Recipes
                        join i in db.Ingredients
                        on r.recipe_id equals i.recipe_id
                        where r.last_updated >= refreshTime
                        select i).ToList();
            }
        }

        public IEnumerable<Models.Ingredient> Get(int id)
        {
            using (var db = new Models.ModelRecipe())
            {
                return db.Ingredients.Where(x => x.recipe_id == id).ToList();
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
