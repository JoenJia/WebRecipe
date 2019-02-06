using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RecipeService.Controllers
{
    public class CategoriesController : ApiController
    {
        // GET api/values
        public IEnumerable<Models.Category> Get()
        {
            using (var db = new Models.ModelRecipe())
            {
                return db.Categories.Where(x => x.category_name != string.Empty).ToList();
            }
        }

        public Models.Category Get(int id)
        {
            using (var db = new Models.ModelRecipe())
            {
                return db.Categories.Where(x => x.category_id == id).FirstOrDefault();
            }
        }

    }
}
