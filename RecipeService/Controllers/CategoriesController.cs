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
    public class CategoriesController : ApiController
    {
        IContextRepositories _context;
        public CategoriesController(IContextRepositories context)
        {
            _context = context;
        }

        // GET api/values
        public IEnumerable<Models.Category> Get()
        {
            return _context.CategoryRepository.GetAll();
        }

        public Models.Category Get(int id)
        {
            return _context.CategoryRepository.Find(id);
        }

    }
}
