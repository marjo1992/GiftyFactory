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
        updateName: function() {
        	this.$emit('update-name', this.find(this.champNom));
        },
        find: function(e) {
            return [{
                nom: 'tablette de chocolat',
                pour: e,
                ajoutePar: 'qqn'
            }, {
                nom: 'nutella',
                pour: e,
                ajoutePar: 'qqn d\'autre'
            }]
        }
    }
});