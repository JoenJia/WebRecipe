
function openDb() {
    return openDatabase("Web recipes", "1.0", "Web recipes", 10 * 1024);
}
function getCategoryList(elem_container) {

    var db = openDb();
    db.transaction(
        function (tx) {
            tx.executeSql("SELECT c.category_id, category_name, count(*) as cnt FROM tbl_category c join tbl_recipe r on r.category_id = c.category_id group by c.category_id, c.category_name ; ", [],
                function (tx, result) {
                    $('#' + elem_container).empty();
                    for (var i = 0; i < result.rows.length; i++) {
                        //console.debug('<li class="arrow"><a id="' + result.rows.item(i)["recipe_id"] + '" class="dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#RecipeView">' + result.rows.item(i)["recipe_title"] + '</a></li>');
                        $("#" + elem_container).append('<li class="arrow"><a href="#RecipeList" class="category_' + result.rows.item(i)["category_id"] + '">' + result.rows.item(i)["category_name"] + '<small class="counter">' + result.rows.item(i).cnt + '</small></a></li>');
                    }
                });
        }
    );
}

function getRecipeList(elem_container, CategoryID) {

    var db = openDb();
    db.transaction(
        function (tx) {
            console.debug("CatID:" + CategoryID);
            tx.executeSql("SELECT r.recipe_id,recipe_title, category_name, IFNULL((select image_base64 FROM tbl_recipeImage WHERE image_name = r.main_image),(select image_base64 FROM tbl_recipeImage WHERE image_name = ?)) as RecipeImage FROM tbl_recipe r join tbl_category c on r.category_id=c.category_id WHERE r.category_id=?; ", ["default_recipe", CategoryID],
                function (tx, result) {
                    $('#' + elem_container).empty();
                    for (var i = 0; i < result.rows.length; i++) {
                        //console.debug('<li class="arrow"><a id="' + result.rows.item(i)["recipe_id"] + '" class="dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#RecipeView">' + result.rows.item(i)["recipe_title"] + '</a></li>');
                        //$("#" + elem_container).append($('<li class="arrow"><a id="' + result.rows.item(i)["recipe_id"] + '" class="dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#RecipeView">' + result.rows.item(i)["recipe_title"] + '</a></li>'));
                        //$("#" + elem_container).append($('<div class="resultItem"><a id="' + result.rows.item(i)["recipe_id"] + '" class="reciperesultitem slide dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#RecipeView"><div class="resultItemImage"><img src="data:image/jpeg;base64,' + result.rows.item(i)["RecipeImage"] + '"alt="Recipe"/></div><div class="resultItemText"><span class="resultCat">' + getCategoryNameByID(result.rows.item(i)["category_id"]) + '</span><span class="resultTitle">' + result.rows.item(i)["recipe_title"] + '</span></div><div class="rating"></div></a></div>'));
                        $("#" + elem_container).append($('<div class="resultItem"><a onclick="jQT.goToDynamicPage(\'#RecipeView\', \'slide\', ' + result.rows.item(i)["recipe_id"] + ');" class="searchLink dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#"><div class="resultItemImage"><img height="50px" width="60px" src="data:image/jpeg;base64,' + result.rows.item(i)["RecipeImage"] + '"alt="Recipe"/></div><div class="resultItemText"><span class="resultCat">' + result.rows.item(i)["category_name"] + '</span><span class="resultTitle">' + result.rows.item(i)["recipe_title"] + '</span></div><div class="rating"></div></a></div>'));
                    }
                });
        }
    );
}

function sqlSearchRecipes(elem_container, searchStr) {
    var db = openDb();

    searchStr = "%" + searchStr + "%";
    db.transaction(
        function (tx) {
            console.debug("Search String:" + searchStr);
            tx.executeSql("SELECT r.recipe_id,recipe_title, category_name, IFNULL((select image_base64 FROM tbl_recipeImage WHERE image_name = r.main_image),(select image_base64 FROM tbl_recipeImage WHERE image_name = ?)) as RecipeImage FROM tbl_recipe r JOIN tbl_category c on r.category_id=c.category_id WHERE recipe_title like ? OR instruction like ? ; ", ["default_recipe", searchStr, searchStr],
                function (tx, result) {

                    $('#' + elem_container).empty();
                    for (var i = 0; i < result.rows.length; i++) {
                        //$("#" + elem_container).append($('<li class="arrow"><a id="' + result.rows.item(i)["recipe_id"] + '" class="dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#RecipeView">' + result.rows.item(i)["recipe_title"] + '</a></li>'));
                        //$("#" + elem_container).append($('<div class="resultItem"><a onclick="jQT.goToDynamicPage(\'#RecipeView\', \'slide\', ' + result.rows.item(i)["recipe_id"] + ');" class="searchLink dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#"><div class="resultItemImage"><img src="data:image/jpeg;base64,' + result.rows.item(i)["RecipeImage"] + '"alt="Recipe"/></div><div class="resultItemText"><span class="resultCat">' + result.rows.item(i)["category_name"] + '</span><span class="resultTitle">' + result.rows.item(i)["recipe_title"] + '</span></div><div class="rating"></div></a></div>'));
                        $("#" + elem_container).append($('<div class="resultItem"><a onclick="jQT.goToDynamicPage(\'#RecipeView\', \'slide\', ' + result.rows.item(i)["recipe_id"] + ');" class="searchLink dynamicRecipe_' + result.rows.item(i)["recipe_id"] + '" href="#"><div class="resultItemImage"><img height="50px" width="60px" src="data:image/jpeg;base64,' + result.rows.item(i)["RecipeImage"] + '"alt="Recipe"/></div><div class="resultItemText"><span class="resultCat">' + result.rows.item(i)["category_name"] + '</span><span class="resultTitle">' + result.rows.item(i)["recipe_title"] + '</span></div><div class="rating"></div></a></div>'));
                    }
                });
        });

}


function getRecipeDetails(recipeId) {
    var db = openDb();
    db.transaction(
        function (tx) {
            tx.executeSql("SELECT * FROM tbl_ingredient WHERE recipe_Id=? order by sort_order; ", [recipeId],
                function (tx, result) {
                    $('#recipeIngredients').empty();
                    var ingTbl = $("<tabel>").addClass('ingredient_table');
                    var row = $("<tr></tr>");
                    var col = $("<td>Imp.</td>)");
                    row.append(col);
                    col = $("<td>Met.</td>");
                    row.append(col);
                    col = $("<td>Ingredients</td>)");
                    row.append(col);
                    ingTbl.append(row);
                    for (var i = 0; i < result.rows.length; i++) {
                        row = $("<tr></tr>");
                        ingTbl.append(row);
                        col = $('<td>' + result.rows.item(i)["imp_quantity"] + ' ' + result.rows.item(i)["imp_unit"] + '</td>');
                        row.append(col);
                        col = $('<td>' + result.rows.item(i)["met_quantity"] + ' ' + result.rows.item(i)["met_unit"] + '</td>');
                        row.append(col);
                        col = $('<td>' + result.rows.item(i)["name_en"] + '</td>');
                        row.append(col);
                        ingTbl.append(row);
                        //ingTbl = ingTbl + '<tr><td>' + result.rows.item(i)["imp_quantity"] + ' ' + result.rows.item(i)["imp_unit"] + '</td><td>' + result.rows.item(i)["met_quantity"] + ' ' + result.rows.item(i)["met_unit"] + '</td><td>' + result.rows.item(i)["name_en"] + '</td></tr>';
                    }
                    $('#recipeIngredients').append(ingTbl);

                });

            tx.executeSql("SELECT tbl_recipe.*, (select image_base64 FROM tbl_recipeImage WHERE image_name = tbl_recipe.main_image) as RecipeImage FROM tbl_recipe WHERE recipe_id = ?;", [recipeId],
                function (tx, result) {
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
                        console.debug("image is null");
                        tx.executeSql("SELECT image_base64 FROM tbl_recipeImage where image_name = ?;", ["default_recipe"],
                            function (tx, result) {
                                data = result.rows.item(0)["image_base64"];
                                $("#RecipeImagePlaceHolder").append('<img src="data:image/jpeg;base64,' + data + '"alt="Recipe"/>')
                            });
                    }
                    else {
                        $("#RecipeImagePlaceHolder").append('<img src="data:image/jpeg;base64,' + data + '"alt="Recipe"/>')
                    }

                });
        }
    );
}