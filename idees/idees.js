Vue.component('idees', {
    template: `
        <div class="row" id="idees">
            <idee :info='idee' v-for='idee in ideesAffichees'></idee>    
        </div>
    `,
    props: ['ideesAffichees']
});