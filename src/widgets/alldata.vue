<style>


.tab-input{
  height: 30px;
  margin-top: 6px;
  max-width: 100px;
}
</style>

<template>

<div>
    <div class="widget-header">
        <h6><i class="fa fa-table text-warning" aria-hidden="true"></i> Raw Data</h6>
    </div>
    <div class="widget-content" v-if="alldone">

        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tax2015" role="tab">2015</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tax2014" role="tab">2014</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tax2013" role="tab">2013</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tax2012" role="tab">2012</a>
            </li>
            <li class="nav-item" style="float: right;">
                <input class="form-control tab-input" v-model="search"/>
            </li>
        </ul>

        <div style="overflow: auto;height: 80%;">
            <div class="tab-content">
                <div class="tab-pane active" id="tax2015" role="tabpanel">

                    <table class="table" v-if="dataL.tax2015">
                        <thead class="thead-inverse">
                            <tr>
                                <th>#</th>
                                <th>Entry</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(entry, value) in dataL.tax2015[0] | searchFilter search">
                                <th scope="row">{{$index}}</th>
                                <td>{{entry}}</td>
                                <td>{{value}}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div class="tab-pane" id="tax2014" role="tabpanel">

                    <table class="table" v-if="dataL.tax2014">
                        <thead class="thead-inverse">
                            <tr>
                                <th>#</th>
                                <th>Entry</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(entry, value) in dataL.tax2014[0] | searchFilter search">
                                <th scope="row">{{$index}}</th>
                                <td>{{entry}}</td>
                                <td>{{value}}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div class="tab-pane" id="tax2013" role="tabpanel">

                    <table class="table" v-if="dataL.tax2013">
                        <thead class="thead-inverse">
                            <tr>
                                <th>#</th>
                                <th>Entry</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(entry, value) in dataL.tax2013[0] | searchFilter search">
                                <th scope="row">{{$index}}</th>
                                <td>{{entry}}</td>
                                <td>{{value}}</td>
                            </tr>
                        </tbody>
                    </table>


                </div>
                <div class="tab-pane" id="tax2012" role="tabpanel">
                    <table class="table" v-if="dataL.tax2012">
                        <thead class="thead-inverse">
                            <tr>
                                <th>#</th>
                                <th>Entry</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(entry, value) in dataL.tax2012[0] | searchFilter search">
                                <th scope="row">{{$index}}</th>
                                <td>{{entry}}</td>
                                <td>{{value}}</td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        </div>

    </div>
</div>

</template>

<script>

export default {
    props: ['data'],
    data: function() {
        return {
            dataL: this.data,
            alldone: false,
            search: ''
        }
    },
    filters:{
      'searchFilter': function(rows, search){
        if(!rows) return {};
        var keys = Object.keys(rows);
        if(!search || search == ''){
          return rows;
        }

        var copy = Object.assign({}, rows);
        for(var i=0;i<keys.length;i++){
          if(keys[i].indexOf(search) == -1){
            delete copy[keys[i]];
          }
        }
        return copy;
      }
    },
    ready: function() {
        // What's with you bootstrap v4 tabs? you causing a col invalid error in gridster... unless I do this...
        this.alldone = true;
    }
}

</script>
