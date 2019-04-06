
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeServiceDomain.Repositories
{
    public abstract class AbstractRepository : IDisposable
    {
        protected Contexts.IModelRecipe db;
        public AbstractRepository(Contexts.IModelRecipe db)
        {
            this.db = db;
        }

        public void Dispose()
        {
            Debug.WriteLine("AbstractRepository#Dispose is called");
        }
    }

}
