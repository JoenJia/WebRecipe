export class Recipe
{
    recipe_id: number;
    recipe_title: string;
    recipe_description: string;
    instruction: string;
    category_id: number;
    lang_code: string;
    tips: string;
    benefit_text: string;
    makes_qty: number;
    is_deleted: boolean;
    last_updated: Date | string;
    main_image: string;
}