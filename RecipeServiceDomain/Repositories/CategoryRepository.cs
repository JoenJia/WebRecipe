using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RecipeServiceDomain.Contexts.Models;

namespace RecipeServiceDomain.Repositories
{
    public class CategoryRepository : AbstractRepository, ICategoryRepository
    {
        public CategoryRepository(Contexts.IModelRecipe db) : base(db) { }
        public IEnumerable<Contexts.Models.Category> GetAll()
        {
                return db.Categories.ToList();
        }
        public Category Find(int id)
        {
                return db.Categories.Where(x => x.category_id == id).FirstOrDefault();
        }

    }
}
