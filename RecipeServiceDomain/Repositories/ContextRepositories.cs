
using RecipeServiceDomain.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeServiceDomain.Repositories
{
    public class ContextRepositories : IContextRepositories
    {
        private Contexts.IModelRecipe db;
        private bool disposed;

        private Dictionary<Type, AbstractRepository> repos;

        public ContextRepositories(IModelRecipe db)
        {
            this.db = db;
            this.repos = new Dictionary<Type, AbstractRepository>();
            this.disposed = false;
        }

        public IModelRecipe Context
        {
            get { return db; }
        }

        public IRecipeRepository RecipeRepository
        {
            get
            {
                return SingletonRepository<RecipeRepository>() as IRecipeRepository;
            }
        }
        public ICategoryRepository CategoryRepository
        {
            get
            {
                return SingletonRepository<CategoryRepository>() as ICategoryRepository;
            }
        }
        public IIngredientRepository IngredientRepository
        {
            get
            {
                return SingletonRepository<IngredientRepository>() as IIngredientRepository;
            }
        }

        public IRecipeImageRepository RecipeImageRepository
        {
            get
            {
                return SingletonRepository<RecipeImageRepository>() as IRecipeImageRepository;
            }
        }

        private AbstractRepository SingletonRepository<T>() where T : class
        {
            if (!repos.ContainsKey(typeof(T)))
            {
                AbstractRepository repo = Activator.CreateInstance(typeof(T), db) as AbstractRepository;
                repos.Add(typeof(T), repo);
                return repo;
            }
            else
            {
                return repos[typeof(T)];
            }

        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool isDisposing)
        {
            if (!this.disposed && isDisposing)
            {
                db.Dispose();
            }

            this.disposed = true;
        }
    }
}
