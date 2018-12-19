Vue.component('idee', {
    template: `
        <div class="col-md-4 col-xs-12">
            <div class="card mb-4 box-shadow">
                {{info.nom}}
            </div>
        </div>
    `,
    props: ['info']
});