using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using RecipeServiceDomain.Contexts;
using RecipeServiceDomain.Repositories;
using Models = RecipeServiceDomain.Contexts.Models;

namespace RecipeService.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class IngredientsController : ApiController
    {
        IContextRepositories _context;
        public IngredientsController(IContextRepositories context)
        {
            _context = context;
        }

        public IEnumerable<Models.Ingredient> Get()
        {
            return _context.IngredientRepository.GetAll();
        }
        [HttpGet]
        public IEnumerable<Models.Ingredient> GetLatest(DateTime refreshTime)
        {
            return _context.IngredientRepository.GetLatest(refreshTime);
        }

        [HttpGet]
        public IEnumerable<Models.Ingredient> GetByRecipeId(int recipeId)
        {
            return _context.IngredientRepository.GetByRecipeId(recipeId);
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
