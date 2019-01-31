using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RecipeService.Models
{
    public class Ingredient
    {
        [Key]
        public int Ingredient_id {get;set;}
        public string sort_order { get; set; }
        public string name_en { get; set; }
        public string name_fr { get; set; }
        public string met_quantity { get; set; }
        public string met_unit { get; set; }
        public string imp_quantity { get; set; }
        public string imp_unit { get; set; }

        public int recipe_id { get; set; }
        public Recipe Recipe { get; set; }
    }
}