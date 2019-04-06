using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using RecipeServiceDomain.Contexts;
using RecipeServiceDomain.Repositories;
using Models = RecipeServiceDomain.Contexts.Models;

namespace RecipeService.Controllers
{
    [EnableCors(origins:"*", headers:"*", methods:"*")]
    public class RecipesController : ApiController
    {
        IContextRepositories _context;
        public RecipesController(IContextRepositories context)
        {
            _context = context;
        }
        // GET api/values
        public IEnumerable<Models.Recipe> Get()
        {
            return _context.RecipeRepository.GetAll();
        }
        [HttpGet]
        public IEnumerable<Models.Recipe> GetLatest(DateTime refreshTime)
        {
            return _context.RecipeRepository.GetLatest(refreshTime);
        }
        [HttpGet]
        public IEnumerable<Models.Recipe> Search(string terms)
        {
            return _context.RecipeRepository.Search(terms);
        }

        public Models.Recipe Get(int id)
        {
            return _context.RecipeRepository.Find(id);
        }

        // POST api/values
        public void Post([FromBody] Models.Recipe recipe)
        {
            _context.RecipeRepository.Create(recipe);
        }

            // PUT api/values/5
        public void Put(int id, [FromBody] Models.Recipe recipe)
        {
            _context.RecipeRepository.Update(id, recipe);
        }

        // DELETE api/values/5
        public int Delete(int id)
        {
            return _context.RecipeRepository.Delete(id);
        }

        [HttpPost]
        public void AddExtraTestRecipes()
        {
            _context.RecipeRepository.AddExtraTestRecipes();
        }
        [HttpPost]
        public void DeleteExtraTestRecipes()
        {
            _context.RecipeRepository.DeleteExtraTestRecipes();
        }
    }
}
