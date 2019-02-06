$(function () {
    var db = openDatabase("Web recipes", "1.0", "Web recipes", 5 * 1024);
    db.transaction(function (tx) {

        tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_recipe'", [], function (tx, result) {
            if (result.rows.length === 0) {
                createTables(tx);
                //refreshRecipes();
                loadAllRecipes();
            }
        });

    });
});
