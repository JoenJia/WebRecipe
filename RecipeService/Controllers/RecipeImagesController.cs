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
    public class RecipeImagesController : ApiController
    {
        IContextRepositories _context;
        public RecipeImagesController(IContextRepositories context)
        {
            _context = context;
        }

        public IEnumerable<Models.RecipeImage> Get()
        {
            return _context.RecipeImageRepository.GetAll();
        }

        public Models.RecipeImage Get(string name)
        {
            return _context.RecipeImageRepository.Find(name);
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
