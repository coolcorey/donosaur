<style scoped>

</style>

<template>

<div>

  <div class="modal fade" id="wronglyClaimedModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Report Wrongly Claimed Non-Profit</h4>
        </div>
        <div class="modal-body">

          <small class="text-warning">
            If you think this non-profit was claimed by someone other than an employee there, give us your email and we will get back to you and fix it!
          </small>

          <div class="form-group row" v-bind:class="{'has-danger': claimData.emailInvalid}">
            <label for="example-text-input" class="col-xs-4 col-form-label">Your Email</label>
            <div class="col-xs-8">
              <input class="form-control form-control-danger" type="email" value="" v-model="claimData.email">
              <small class="form-control-feedback" v-if="claimData.emailInvalid">A valid email is required</small>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="wronglyClaimed();" :disabled="claimData.sending">Request</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="claimModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Claim this Non-Profit Profile</h4>
        </div>
        <div class="modal-body">

          <div class="form-group row" v-bind:class="{'has-danger': claimData.nameInvalid}">
            <label for="example-text-input" class="col-xs-4 col-form-label">Your Name</label>
            <div class="col-xs-8">
              <input class="form-control form-control-danger" type="text" value="" v-model="claimData.name">
              <small class="form-control-feedback" v-if="claimData.nameInvalid">A valid name is required</small>
            </div>
          </div>

          <div class="form-group row" v-bind:class="{'has-danger': claimData.emailInvalid}">
            <label for="example-text-input" class="col-xs-4 col-form-label">Your Email</label>
            <div class="col-xs-8">
              <input class="form-control form-control-danger" type="email" value="" v-model="claimData.email">
              <small class="form-control-feedback" v-if="claimData.emailInvalid">A valid email is required</small>
            </div>
          </div>

          <div class="form-group row" v-bind:class="{'has-danger': claimData.icoInvalid}">
            <label for="example-text-input" class="col-xs-4 col-form-label">Non-profit ICO</label>
            <div class="col-xs-8">
              <input class="form-control form-control-danger" type="text" value="" v-model="claimData.ico">
              <small class="form-control-feedback" v-if="claimData.icoInvalid">A valid In Care Of is required</small>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="claim();" :disabled="claimData.sending">Request</button>
        </div>
      </div>
    </div>
  </div>

    <div>
        <h1 class="truncate" style="color:white;" v-if="data.meta">{{data.meta.NAME|toTitleCase}}</h1>
    </div>

    <div style="padding:10px">

      <div v-if="claimed">
        <div class="alert alert-success" role="alert" v-if="canDonate">
          <div class="row">
            <div class="col-xs-9">
              <strong>This is an active profile!</strong>
            </div>
            <div class="col-xs-3 text-xs-right">
              <button type="button" class="btn btn-outline-success btn-sm">Donate!</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="unclaimed">
        <div class="alert alert-warning" role="alert">
          <div class="row">
            <div class="col-xs-9">
              <strong>This non-profit is unclaimed!</strong>
            </div>
            <div class="col-xs-3 text-xs-right">
              <button type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#claimModal">Claim it.</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="claimed">
        <div class="row">
          <div class="col-xs-12 text-xs-right">
            <button type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#wronglyClaimedModal">Was this non-profit wrongly claimed?</button>
          </div>
        </div>
      </div>

    </div>

    <div class="grid-stack grid-stack-6">
      <div class="grid-stack-item ui-draggable" v-for="elem in serialization" data-gs-width="{{elem.width}}" data-gs-height="{{elem.height}}" data-gs-x="{{elem.x}}" data-gs-y="{{elem.y}}">
          <div class="grid-stack-item-content">
              <component :is="elem.type" :data="data"></component>
          </div>
      </div>
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
        var ein = this.$route.params.ein;
        if (ein.length != 9) {
            alert('Invalid EIN');
            return;
        }

        return {
            claimData: {
              sending: false,
              name: '',
              nameInvalid:false,
              email: '',
              emailInvalid:false,
              ico: '',
              icoInvalid: false,
            },
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
                x: 5,
                y: 0,
                width: 1,
                height: 4,
                maxx: 1,
                maxy: 1,
                type: 'Social'
            }, {
                x: 3,
                y: 0,
                width: 2,
                height: 4,
                type: 'Mission'
            }, {
                x: 0,
                y: 0,
                width: 3,
                height: 4,
                type: 'Location'
            }, {
                x: 4,
                y: 4,
                width: 2,
                height: 5,
                type: 'Filing'
            }, {
                x: 0,
                y: 4,
                width: 4,
                height: 6,
                type: 'Income'
            }, {
                x: 0,
                y: 16,
                width: 4,
                height: 6,
                type: 'Expenses'
            }, {
                x: 0,
                y: 10,
                width: 4,
                height: 6,
                type: 'Revenue'
            }, {
                x: 0,
                y: 22,
                width: 4,
                height: 6,
                type: 'Assets'
            }, {
                x: 4,
                y: 9,
                width: 2,
                height: 6,
                type: 'Timeline'
            },
            {
                x: 4,
                y: 15,
                width: 2,
                height: 7,
                type: 'AllData'
            }
          ]
        }
    },
    computed: {
      canDonate: function(){
        if(this.data.meta && this.data.meta.claim && this.data.meta.claim.approved){
          return true;
        }else{
          return false;
        }
      },
      claimed: function(){
        if(this.data.meta && this.data.meta.claim && this.data.meta.claim.pending){
          return true;
        }else{
          return false;
        }
      },
      unclaimed: function(){
        if(this.data.meta && !this.data.meta.claim){
          return true;
        }else{
          return false;
        }
      }
    },
    methods: {
        claim: function(){
          this.claimData.nameInvalid = !(/^[a-z ,.'-]+$/i.test(this.claimData.name));
          this.claimData.emailInvalid = !(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.claimData.email));
          this.claimData.icoInvalid = !(/^[a-z ,.'-]+$/i.test(this.claimData.ico));

          if(this.claimData.nameInvalid || this.claimData.emailInvalid || this.claimData.icoInvalid){
            return;
          }else{
            this.claimData.sending = true;
            this.$http.get(window.apiLocation + '/claim?n=' + this.claimData.name + '&e=' + this.claimData.email + '&i=' + this.claimData.ico + '&ein=' + this.ein).then((response) => {
                // success callback
                $('#claimModal').modal('hide');
                this.claimData.sending = false;
                this.getMeta();
            }, (response) => {
                // error callback
                this.claimData.sending = false;
                console.error(response);
            });

          }
        },
        wronglyClaimed: function(){
          this.claimData.emailInvalid = !(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.claimData.email));

          if(this.claimData.emailInvalid){
            return;
          }else{
            this.claimData.sending = true;
            this.$http.get(window.apiLocation + '/wronglyClaimed?e=' + this.claimData.email + '&ein=' + this.ein).then((response) => {
                // success callback
                $('#wronglyClaimedModal').modal('hide');
                this.claimData.sending = false;
            }, (response) => {
                // error callback
                this.claimData.sending = false;
                console.error(response);
            });

          }
        },
        getData: function(year) {
            var _this = this;
            if (!this['tax' + year]) {
                this.$http.get(window.apiLocation + '/getTaxByEIN?y=' + year + '&ein=' + this.ein).then((response) => {
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
                    console.error(response);
                });
            }
        },
        getMeta: function() {
            var _this = this;
            this.$http.get(window.apiLocation + '/getMetaByEIN?&ein=' + this.ein).then((response) => {
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
        var options = {
            //cellHeight: 80,
            //verticalMargin: 10,
            width:6,
            //alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        };
        $('.grid-stack').gridstack(options);
    }
}

</script>
