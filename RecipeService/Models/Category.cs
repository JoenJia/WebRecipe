using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RecipeService.Models
{
    public class Category
    {
        [Key]
        public int category_id { get; set; }
        [MaxLength(200)]
        public string category_name { get; set; }

        public ICollection<Recipe> Recipes { get; set; }
    }
}