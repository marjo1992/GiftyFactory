Vue.component('searchbar', {
    template: `
        <div id="searchbar" class="row">
            <div class="autocomplete">
                <input class="search-input" type="search" placeholder="Entrez un nom" @input="onChange" v-model="champNom">
                <ul v-if="open" class="resultats">
                    <li class="resultat" v-for="(resultat, i) in resultats" @click="selectItem(resultat)" :key="i">{{resultat.pour}}</li>
                </ul>
            </div>
            <button v-on:click="updateName()">Afficher liste</button>
        </div>
    `,
    data: function() {
        return {
            open: false,
            timeoutId: null,
        	champNom: '',
            resultats: [],
            bdd: new bddMock()
        }
    },
    methods: {
        onChange: function(e) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.resultats.length = 0;
                if (!this.champNom.length) {
                    this.open = false;
                    // Bidouille pour vraiment vider le tableau
                    this.resultats.push(...[]);
                    return;
                };
                this.open = true;
                this.resultats.push(...this.bdd.getData(this.champNom));
            }, 500)
        },
        selectItem: function(resultat) {
            this.open = false;
            this.champNom = resultat.pour;
        },
        updateName: function() {
        	this.$emit('update-name', this.find(this.champNom));
        },
        find: function(e) {
            return [{
                nom: 'tablette de chocolat',
                pour: e,
                de: 'qqn'
            }, {
                nom: 'nutella',
                pour: e,
                de: 'qqn d\'autre'
            }]
        }
    }
});

class bddMock {
    constructor() {
        this.data = [{
            nom: 'tablette de chocolat',
            pour: 'Martin TER',
            de: 'Martin TER'
        }, {
            nom: 'nutella',
            pour: 'Joseph PI',
            de: 'Martin TER'
        }, {
            nom: 'Rocher Suchar',
            pour: 'Marie TRUC',
            de: 'Joseph PI'
        }]
    }

    getData(requete) {
        return this.data.filter((e) => {
            return e.pour.toLowerCase().includes(requete.toLowerCase());
        });
    }
}