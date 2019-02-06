function createTables(tx) {
        tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_recipe'", [], function (tx, result) {
            if (result.rows.length === 0) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS [tbl_category](category_id integer PRIMARY KEY  NOT NULL,category_name varchar(100) COLLATE NOCASE)");
                tx.executeSql("CREATE TABLE IF NOT EXISTS [tbl_recipe] (recipe_id integer PRIMARY KEY  NOT NULL,category_id integer NOT NULL,recipe_title varchar(100) COLLATE NOCASE,recipe_description varchar(100) COLLATE NOCASE,main_image varchar(100) COLLATE NOCASE,instruction varchar(100) COLLATE NOCASE,lang_code varchar(100) COLLATE NOCASE,tips varchar(100) COLLATE NOCASE,benefit_text varchar(100) COLLATE NOCASE,makes_qty integer,CreateDate datetime DEFAULT (CURRENT_TIMESTAMP));");
                tx.executeSql("CREATE TABLE IF NOT EXISTS [tbl_ingredient]	([recipe_id] integer NOT NULL,	[sort_order] integer NOT NULL,[name_en] [varchar](300) NOT NULL,	[name_fr] [varchar](300) NOT NULL,	[met_quantity] [real] NULL,	[met_unit] [varchar](50) NULL,	[imp_quantity] [varchar](20) NULL,	[imp_unit] [varchar](50) NULL);");
                tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_recipeImage([image_name] [varchar](200) PRIMARY KEY NOT NULL, [image_base64] [varchar](200) NULL);");
                tx.executeSql("CREATE INDEX IF NOT EXISTS idx_recIng ON tbl_ingredient (recipe_id)");
            }
        });
}
function sqlEscape(str) {
    return str.replace(/'/g, "''");
}
function loadAllRecipes() {
    $.ajax({
        type: "GET",
        url: "/API/Categories",
        success: function (response) {
            var data = JSON.parse(sqlEscape(response));
            var db = openDatabase("Web recipes", "1.0", "Web recipes", 5 * 1024);
            db.transaction(function (tx) {
                $.each(data, function (index, val) {
                    tx.executeSql("INSERT INTO [tbl_category] ( [category_id], [category_name]) VALUES (" +
                        val.category_id + ",'" + val.category_name + "');");
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Loading Categories Failed.");
            ShowAjaxErr(xhr.responseText);
        }
    });
    $.ajax({
        type: "GET",
        url: "/API/Recipes",
        success: function (response) {
            var data = JSON.parse(sqlEscape(response));
            var db = openDatabase("Web recipes", "1.0", "Web recipes", 5 * 1024);
            db.transaction(function (tx) {
                $.each(data, function (index, val) {
                        tx.executeSql("INSERT INTO [tbl_recipe] ([recipe_id], [recipe_title], [recipe_description], [main_image], [instruction], [category_id], [lang_code], [tips], [benefit_text], [makes_qty]) VALUES (" +
                            val.recipe_id + ",'" + val.recipe_title + "','" + val.recipe_description + "','" + val.main_image + "','" +
                            val.instruction + "'," + val.category_id + ",'" + val.lang_code + "','" + val.tips + "','" +
                            val.benefit_text + "'," + val.makes_qty + ");");
                    });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Loading Recipes Failed.");
            ShowAjaxErr(xhr.responseText);
        }
    });
    $.ajax({
        type: "GET",
        url: "/API/Ingredients",
        success: function (response) {
            var data = JSON.parse(sqlEscape(response));
            var db = openDatabase("Web recipes", "1.0", "Web recipes", 5 * 1024);
            db.transaction(function (tx) {
                $.each(data, function (index, val) {
                    tx.executeSql("INSERT INTO tbl_ingredient ([recipe_id], [sort_order], [name_en], [name_fr], [met_quantity], [met_unit], [imp_quantity], [imp_unit]) VALUES (" +
                        val.recipe_id + "," + val.sort_order + ",'" + val.name_en + "','" + val.name_fr + "'," +
                        val.met_quantity + ",'" + val.met_unit + "','" + val.imp_quantity + "','" + val.imp_unit + "');");
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Loading Ingredients Failed.");
            ShowAjaxErr(xhr.responseText);
        }
    });
    $.ajax({
        type: "GET",
        url: "/API/RecipeImages",
        success: function (response) {
            var data = JSON.parse(sqlEscape(response));
            var db = openDatabase("Web recipes", "1.0", "Web recipes", 5 * 1024);
            db.transaction(function (tx) {
                $.each(data, function (index, val) {
                    tx.executeSql(" INSERT INTO[tbl_recipeImage](image_name, image_base64) VALUES('" +
                        val.image_name + "','" + val.image_base64  + "');");
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Loading Recipe Images Failed.");
            ShowAjaxErr(xhr.responseText);
        }
    });
}
function ShowAjaxErr(err) {
    var w = window.open();
    $(w.document.body).html(err);
}
