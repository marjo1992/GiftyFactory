Vue.component('idees', {
    template: `
        <div class="row" id="idees">
            <idee :info='idee' v-for='idee in idees' :key="idee.nom"></idee>    
        </div>
    `,
    props: ['idees']
});