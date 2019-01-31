
var db = openDatabase("Becel recipes", "1.0", "Becel recipes", 5 * 1024);
db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS [tbl_Recipe] (recipe_id integer PRIMARY KEY  NOT NULL,category_id integer NOT NULL,recipe_title varchar(100) COLLATE NOCASE,recipe_description varchar(100) COLLATE NOCASE,main_image varchar(100) COLLATE NOCASE,instruction varchar(100) COLLATE NOCASE,lang_code varchar(100) COLLATE NOCASE,tips varchar(100) COLLATE NOCASE,benefit_text varchar(100) COLLATE NOCASE,makes_qty integer,CreateDate datetime DEFAULT (CURRENT_TIMESTAMP));");
    tx.executeSql("CREATE TABLE IF NOT EXISTS [tbl_ingredient]	([recipe_id] integer NOT NULL,	[sort_order] integer NOT NULL,[name_en] [varchar](300) NOT NULL,	[name_fr] [varchar](300) NOT NULL,	[met_quantity] [real] NULL,	[met_unit] [varchar](50) NULL,	[imp_quantity] [varchar](20) NULL,	[imp_unit] [varchar](50) NULL);");
    tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_RecipeImage([ImageName] [varchar](200) PRIMARY KEY NOT NULL, [ImageBase64] [varchar](200) NULL);");

    tx.executeSql("CREATE INDEX IF NOT EXISTS idx_RecIng ON tbl_ingredient (recipe_id)");
});

function getRecipeList(elem_container, CategoryID) {


        db.transaction(
            function(tx) {
                console.debug("CatID:" + CategoryID);
                tx.executeSql("SELECT recipe_id,recipe_title, category_id, IFNULL((select ImageBase64 FROM tbl_RecipeImage WHERE ImageName = tbl_recipe.main_image),(select ImageBase64 FROM tbl_RecipeImage WHERE ImageName = ?)) as RecipeImage FROM tbl_Recipe WHERE category_id=?; ", ["default_recipe", CategoryID],
                function(tx, result) {
                    $('#' + elem_container).empty();
                    for (var i = 0; i < result.rows.length; i++) {
                        //console.debug('<li class="arrow"><a id="' + result.rows.item(i)["recipe_id"] + '" class="dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#RecipeView">' + result.rows.item(i)["recipe_title"] + '</a></li>');
                        //$("#" + elem_container).append($('<li class="arrow"><a id="' + result.rows.item(i)["recipe_id"] + '" class="dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#RecipeView">' + result.rows.item(i)["recipe_title"] + '</a></li>'));
                        //$("#" + elem_container).append($('<div class="resultItem"><a id="' + result.rows.item(i)["recipe_id"] + '" class="reciperesultitem slide dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#RecipeView"><div class="resultItemImage"><img src="data:image/jpeg;base64,' + result.rows.item(i)["RecipeImage"] + '"alt="Recipe"/></div><div class="resultItemText"><span class="resultCat">' + getCategoryNameByID(result.rows.item(i)["category_id"]) + '</span><span class="resultTitle">' + result.rows.item(i)["recipe_title"] + '</span></div><div class="rating"></div></a></div>'));
                        $("#" + elem_container).append($('<div class="resultItem"><a onclick="jQT.goToDynamicPage(\'#RecipeView\', \'slide\', ' + result.rows.item(i)["recipe_id"] + ');" class="searchLink dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#"><div class="resultItemImage"><img height="50px" width="60px" src="data:image/jpeg;base64,' + result.rows.item(i)["RecipeImage"] + '"alt="Recipe"/></div><div class="resultItemText"><span class="resultCat">' + getCategoryNameByID(result.rows.item(i)["category_id"]) + '</span><span class="resultTitle">' + result.rows.item(i)["recipe_title"] + '</span></div><div class="rating"></div></a></div>'));
                    }
                })
            }
        )};

function sqlSearchRecipes(elem_container, searchStr) {

                searchStr = "%" + searchStr + "%";
                db.transaction(
                function(tx) {
                    console.debug("Search String:" + searchStr);
                    tx.executeSql("SELECT recipe_id,recipe_title, category_id, IFNULL((select ImageBase64 FROM tbl_RecipeImage WHERE ImageName = tbl_recipe.main_image),(select ImageBase64 FROM tbl_RecipeImage WHERE ImageName = ?)) as RecipeImage FROM tbl_Recipe WHERE recipe_title like ? OR instruction like ? ; ", ["default_recipe",searchStr, searchStr],
                    function(tx, result) {
                    
                        $('#' + elem_container).empty();
                        for (var i = 0; i < result.rows.length; i++) {
                            //$("#" + elem_container).append($('<li class="arrow"><a id="' + result.rows.item(i)["recipe_id"] + '" class="dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#RecipeView">' + result.rows.item(i)["recipe_title"] + '</a></li>'));
                            $("#" + elem_container).append($('<div class="resultItem"><a onclick="jQT.goToDynamicPage(\'#RecipeView\', \'slide\', ' + result.rows.item(i)["recipe_id"] + ');" class="searchLink dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#"><div class="resultItemImage"><img src="data:image/jpeg;base64,' + result.rows.item(i)["RecipeImage"] + '"alt="Recipe"/></div><div class="resultItemText"><span class="resultCat">' + getCategoryNameByID(result.rows.item(i)["category_id"]) + '</span><span class="resultTitle">' + result.rows.item(i)["recipe_title"] + '</span></div><div class="rating"></div></a></div>')); 
                        }
                    })
                }
            )
            };

function getCategoryNameByID(catid) {

                if (catid == 33) {
                    return "Soups, Salads, and Appetizers";
                }
                else if (catid == 32) {
                    return "Vegetables and Side Dishes";
                }
                else if (catid == 34) {
                    return "Meat and Poultry";
                }
                else if (catid == 39) {
                    return "Fish and Seafood";
                }
                else if (catid == 40) {
                    return "Beans and Meatless Mains";
                }
                else if (catid == 41) {
                    return "Pasta and Grains";
                }
                else if (catid == 38) {
                    return "Baking and Fruit Desserts";
                }
                else {
                    return "";
                }
            
            };

function getRecipeDetails(recipeId) {
                db.transaction(
                    function(tx) {
                        tx.executeSql("SELECT * FROM tbl_Ingredient WHERE recipe_Id=? order by sort_order; ", [recipeId],
                            function(tx, result) {
                                $('#recipeIngredients').empty().append($("<tabel style='width:100%;'><tr><td>Imperial</td><td>Metric</td><td>Ingredients</td></tr>"));
                                for (var i = 0; i < result.rows.length; i++) {
                                    $("#recipeIngredients").append($('<tr><td>' + result.rows.item(i)["imp_quantity"] + ' ' + result.rows.item(i)["imp_unit"] + '</td><td>' + result.rows.item(i)["met_quantity"] + ' ' + result.rows.item(i)["met_unit"] + '</td><td>' + result.rows.item(i)["name_en"] + '</td></tr>'));
                                }
                                $('#recipeIngredients').append($("</tabel>"));

                            })

                        tx.executeSql("SELECT tbl_Recipe.*, (select ImageBase64 FROM tbl_RecipeImage WHERE ImageName = tbl_recipe.main_image) as RecipeImage FROM tbl_Recipe WHERE recipe_id = ?;", [recipeId],
                    function(tx, result) {
                        $("#recipeTitle").html(result.rows.item(0)["recipe_title"]);
                        var instr = result.rows.item(0)["instruction"] + "";
                        instr = instr.replace(/\|/g, "</li><li>");
                        instr = instr.replace("</li>", "");
                        instr = "<ol>" + instr + "</li></ol>";
                        $("#recipeInstruction").html(instr);
                        $("#recipeTips").html(result.rows.item(0)["tips"]);
                        $("#RecipeMakes").html(result.rows.item(0)["makes_qty"]);

                        $("#RecipeImagePlaceHolder").empty();
                        var data = result.rows.item(0)["RecipeImage"];
                        if (data == null) {
                            //console.debug("null");
                            tx.executeSql("SELECT ImageBase64 FROM tbl_RecipeImage where imagename = ?;", ["default_recipe"],
                            function(tx, result) {
                                data = result.rows.item(0)["ImageBase64"];
                                $("#RecipeImagePlaceHolder").append('<img src="data:image/jpeg;base64,' + data + '"alt="Recipe"/>')
                            });
                        }
                        else {
                            $("#RecipeImagePlaceHolder").append('<img src="data:image/jpeg;base64,' + data + '"alt="Recipe"/>')
                        }

                    })
                    }
                    )
            };