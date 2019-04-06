using System.Collections.Generic;
using RecipeServiceDomain.Contexts.Models;

namespace RecipeServiceDomain.Repositories
{
    public interface ICategoryRepository
    {
        Category Find(int id);
        IEnumerable<Category> GetAll();
    }
}