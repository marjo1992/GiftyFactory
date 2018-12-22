Vue.component('searchbar', {
    template: `
        <div id="searchbar" class="row">
            <div class="autocomplete">
                <input class="search-input" type="search" placeholder="Entrez un nom" @input="onChange" @blur="handleBlur" @focus="handleFocus" v-model="champNom">
                <ul v-if="open && resultats.length" class="resultats">
                    <li class="resultat" v-for="(resultat, i) in resultats" @click="selectItem(resultat)" :key="i"><span>{{resultat}}</span></li>
                </ul>
            </div>
            <div class="primary-button" v-on:click="updateName()">Afficher liste</div>
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
        onChange: function(event) {
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
                this.resultats.push(...this.bdd.getAutocompletePour(this.champNom));
            }, 500)
        },
        handleFocus: function(event) {
            this.onChange(event);
        },
        handleBlur: function(event) {
            setTimeout(_ => {
                // On s'assure que le blur n'est pris en compte qu'après le click qui lui est associé (pour selectItem soit appelé si besoin)
                clearTimeout(this.timeoutId);
                this.open = false;
            }, 100);
        },
        selectItem: function(resultat) {
            this.open = false;
            this.champNom = resultat;
        },
        updateName: function() {
        	this.$emit('update-name', this.find(this.champNom));
        },
        find: function(e) {
            return this.bdd.getByPour(e);
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

    getAutocompletePour(requete) {
        return this.data.filter((e) => {
            return e.pour.toLowerCase().includes(requete.toLowerCase());
        }).map(e => e.pour);
    }

    getByPour(requete) {
        return this.data.filter((e) => {
            return e.pour === requete;
        })
    }
}