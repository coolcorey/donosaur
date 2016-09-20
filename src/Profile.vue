<style scoped>

.gridster-box > div {
    height: 100%;
}

.gs-w {
    //background: #6b9591;
    background: rgba(240, 248, 255, 0.75);
    cursor: pointer;
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

ul {
    list-style-type: none;
}

li {
    list-style: none;
    font-weight: bold;
}

.gridster-box {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: none;
}

.controls {
    margin-bottom: 20px;
}

</style>

<template>

<div>
    <div>
        <h1 style="color:white;display:inline;" v-if="data.meta">{{data.meta.NAME|toTitleCase}}</h1>
        <span class="tag tag-info pull-xs-right">{{data.doctype}}</span>
    </div>
    <div class="gridster">
        <ul>
            <li v-for="elem in serialization" data-sizey="{{elem.size_y}}" data-sizex="{{elem.size_x}}" data-col="{{elem.col}}" data-row="{{elem.row}}" data-max-sizey="{{elem.maxy}}" data-max-sizex="{{elem.maxx}}" data-min-sizey="{{elem.maxy}}" data-min-sizex="{{elem.maxx}}">
                <div class="gridster-box">
                    <component :is="elem.type" :data="data"></component>
                </div>
                <div class="handle-resize"></div>
            </li>
        </ul>
    </div>
</div>

</template>

<script>

import income from './widgets/income.vue'
import expenses from './widgets/expenses.vue'
import revenue from './widgets/revenue.vue'
import mission from './widgets/mission.vue'
import assets from './widgets/assets.vue'
import timeline from './widgets/timeline.vue'
import socialmedia from './widgets/socialmedia.vue'
import location from './widgets/location.vue'
import filing from './widgets/filing.vue'
import alldata from './widgets/alldata.vue'


export default {
    components: {
        Income: income,
        Expenses: expenses,
        Revenue: revenue,
        Mission: mission,
        Assets: assets,
        Timeline: timeline,
        Social: socialmedia,
        Location: location,
        Filing: filing,
        AllData: alldata
    },
    data() {
        var ein = this.$route.params.ein
        if (ein.length != 9) {
            alert('Invalid EIN');
            return;
        }

        return {
            data: {
                doctype: null,
                meta: null,
                tax2015: null,
                tax2014: null,
                tax2013: null,
                tax2012: null,
            },
            ein: ein,
            serialization: [{
                col: 1,
                row: 1,
                size_x: 1,
                size_y: 2,
                maxx: 1,
                maxy: 1,
                type: 'Social'
            }, {
                col: 1,
                row: 1,
                size_x: 2,
                size_y: 2,
                type: 'Mission'
            }, {
                col: 1,
                row: 1,
                size_x: 3,
                size_y: 3,
                type: 'Location'
            }, {
                col: 1,
                row: 1,
                size_x: 3,
                size_y: 2,
                type: 'Filing'
            }, {
                col: 1,
                row: 1,
                size_x: 3,
                size_y: 3,
                type: 'Income'
            }, {
                col: 2,
                row: 1,
                size_x: 3,
                size_y: 3,
                type: 'Expenses'
            }, {
                col: 1,
                row: 2,
                size_x: 3,
                size_y: 3,
                type: 'Revenue'
            }, {
                col: 2,
                row: 2,
                size_x: 3,
                size_y: 3,
                type: 'Assets'
            }, {
                col: 1,
                row: 3,
                size_x: 3,
                size_y: 3,
                type: 'Timeline'
            },
            {
                col: 1,
                row: 3,
                size_x: 3,
                size_y: 2,
                type: 'AllData'
            }

          ]
        }
    },
    methods: {
        getData: function(year) {
            var _this = this;
            if (!this['tax' + year]) {
                this.$http.get('http://localhost:80/getTaxByEIN?y=' + year + '&ein=' + this.ein).then((response) => {
                    // success callback
                    console.log(response.data);
                    _this.data['tax' + year] = response.data;
                    if (_this.data['tax' + year].length > 0)
                        _this.data.doctype = _this.data['tax' + year][0].type;
                    if (_this.data['meta'] && _this.data['tax2015'] && _this.data['tax2014'] && _this.data['tax2013'] && _this.data['tax2012']) {
                        NProgress.done();
                    }
                }, (response) => {
                    // error callback
                    console.log(response);
                });
            }
        },
        getMeta: function() {
            var _this = this;
            this.$http.get('http://localhost:80/getMetaByEIN?&ein=' + this.ein).then((response) => {
                // success callback
                console.log(response.data);
                _this.data['meta'] = response.data[0];
                if (_this.data['meta'] && _this.data['tax2015'] && _this.data['tax2014'] && _this.data['tax2013'] && _this.data['tax2012']) {
                    NProgress.done();
                }
            }, (response) => {
                // error callback
                console.log(response);
            });
        }
    },
    beforeCompile: function() {
        NProgress.start();
        this.getMeta();
        this.getData("2015");
        this.getData("2014");
        this.getData("2013");
        this.getData("2012");
    },
    ready: function() {
        var gridster = null;

        gridster = $(".gridster ul").gridster({
            widget_base_dimensions: ['auto', 140],
            autogenerate_stylesheet: true,
            min_cols: 1,
            max_cols: 6,
            //widget_margins: [5, 5],
            resize: {
                enabled: true
            }
        }).data('gridster');
        $('.gridster  ul').css({
            'padding': '0'
        });

        //console.log(gridster.serialize());

    }
}

</script>
