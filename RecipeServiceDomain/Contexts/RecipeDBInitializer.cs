using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
namespace RecipeServiceDomain.Contexts
{
    public class RecipeDBInitializer : DropCreateDatabaseIfModelChanges<ModelRecipe>
    {
        protected override void Seed(ModelRecipe context)
        {
            var sqlFile = "Contests/Initial/TestCategory.sql";
            context.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
            sqlFile = "Contests/Initial/TestRecipeImages.sql";
            context.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
            sqlFile = "Contests/Initial/TestRecipe.sql";
            context.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
            sqlFile = "Contests/Initial/TestRecipeIngredient.sql";
            context.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
            base.Seed(context);

        }
    }
}