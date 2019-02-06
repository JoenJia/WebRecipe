using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RecipeService.Controllers
{
    public class RecipeImagesController : ApiController
    {
        public IEnumerable<Models.RecipeImage> Get()
        {
            using (var db = new Models.ModelRecipe())
            {
                return db.RecipeImages.ToList();
            }
        }

        public Models.RecipeImage Get(string id)
        {
            using (var db = new Models.ModelRecipe())
            {
                return db.RecipeImages.Where(x => x.image_name == id).FirstOrDefault();
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
