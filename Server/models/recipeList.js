module.exports = class RecipeList {

    constructor() {
        this.list = [];
    }

    get(id) {
        let recipeId = this.list.findIndex(i => i.getId() === id);
        return this.list[recipeId];
    }


    hasBeekeeper(recipeId){
        return (this.list.findIndex(i => i.getId() === recipeId) !== -1);
    }


    push(recipe) {
        this.list.push(recipe);
    }

    getSize(){
        return this.list.length;
    }

    getList(){
        return this.list;
    }
}
