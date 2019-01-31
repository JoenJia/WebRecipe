namespace RecipeService.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration.Conventions;
    using System.Linq;

    public class ModelRecipe : DbContext
    {
        // Your context has been configured to use a 'ModelRecipe' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'RecipeService.Models.ModelRecipe' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'ModelRecipe' 
        // connection string in the application configuration file.
        public ModelRecipe()
            : base("name=ModelRecipe")
        {
            //Database.SetInitializer(new RecipeDBInitializer());
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        public virtual DbSet<Recipe> Recipes { get; set; }
        public virtual DbSet<Ingredient> Ingredients { get; set; }
        public virtual DbSet<RecipeImage> RecipeImages { get; set; }
    }

}