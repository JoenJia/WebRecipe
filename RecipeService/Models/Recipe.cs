using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RecipeService.Models
{
    public class Recipe
    {
        [Key]
        public int recipe_id { get; set; }
        public string recipe_title { get; set; }
        public string recipe_description { get; set; }
        public string instruction { get; set; }
        public string category_id { get; set; }
        public string lang_code { get; set; }
        public string tips { get; set; }
        public string benefit_text { get; set; }
        public int makes_qty { get; set; }

        public string main_image { get; set; }

        //[ForeignKey("main_image")]
        //RecipeImage Image { get; set; }

        public ICollection<Ingredient> Ingredients { get; set; }
    }
}