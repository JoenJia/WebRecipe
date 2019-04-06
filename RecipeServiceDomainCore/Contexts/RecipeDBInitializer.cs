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
            var sqlFile = HttpContext.Current.Server.MapPath("~/App_Data/TestCategory.sql");
            context.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
            sqlFile = HttpContext.Current.Server.MapPath("~/App_Data/TestRecipeImages.sql");
            context.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
            sqlFile = HttpContext.Current.Server.MapPath("~/App_Data/TestRecipe.sql");
            context.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
            sqlFile = HttpContext.Current.Server.MapPath("~/App_Data/TestRecipeIngredient.sql");
            context.Database.ExecuteSqlCommand(System.IO.File.ReadAllText(sqlFile));
            base.Seed(context);

        }
    }
}