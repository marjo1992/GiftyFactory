Vue.component('searchbar', {
    template: `
        <div id="searchbar" class="row">
            <input type="search" placeholder="Entrez un nom" v-model="champNom">
            <button v-on:click="updateName()">Afficher liste</button>
        </div>
    `,
    data: function() {
        return {
        	champNom: ''
        }
    },
    methods: {
        updateName: function(e) {
        	this.$emit('update-name', this.champNom);
        }
    }
});