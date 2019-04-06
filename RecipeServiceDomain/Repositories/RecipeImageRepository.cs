using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RecipeServiceDomain.Contexts.Models;

namespace RecipeServiceDomain.Repositories
{
    public class RecipeImageRepository : AbstractRepository, IRecipeImageRepository
    {
        public RecipeImageRepository(Contexts.IModelRecipe db) : base(db) { }
        public IEnumerable<Contexts.Models.RecipeImage> GetAll()
        {
                return db.RecipeImages.ToList();
        }

        public RecipeImage Find(string name)
        {
                return db.RecipeImages.Where(x => x.image_name == name).FirstOrDefault();
        }

        // POST api/values
        public void Create(RecipeImage recipeImage)
        {
                db.RecipeImages.Attach(recipeImage);
                db.SaveChanges();
        }

        // PUT api/values/5
        public void Update(int id, RecipeImage recipeImage)
        {
        }

        public int Delete(string name)
        {

            return 0;
        }
    }
}
