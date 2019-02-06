using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RecipeService.Models
{
    public class RecipeImage
    {
        [Key]
        [MaxLength(200)]
        public string image_name { get; set; }
        public string image_base64 { get; set; }
    }
}