<style>

.dropdown-menu {
    background-color: rgba(255, 255, 255, 0.95) !important;
}

.listing-tab {
    background-color: rgba(255, 255, 255, 0.8) !important;
}

.nav-tabs .nav-item.open .nav-link,
.nav-tabs .nav-item.open .nav-link:focus,
.nav-tabs .nav-item.open .nav-link:hover,
.nav-tabs .nav-link.active,
.nav-tabs .nav-link.active:focus,
.nav-tabs .nav-link.active:hover {
    background-color: transparent;
}

.truncate {
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.socialtext {
    font-size: 75%;
    font-weight: 200;
}

.mcards {
    margin-left: auto;
    margin-right: auto;
}

.search-box {
    margin-left: auto;
    margin-right: auto;
    padding: 5px;
}

</style>

<template>

<div>
    <div class="mcards">

        <div class="search-box">
            <searchbox v-bind:searchfn="search"></searchbox>
        </div>

        <div style="width:290px;" class="mcard" v-for="result in searchResults">
            <div class="row">
                <div class="col-xs-12 watch-card">
                    <div class="artist-title col-xs-12">
                        <a href="#"><i class="fa fa-bookmark text-info" aria-hidden="true" style="position: absolute;top: 8px;right: 8px;"></i></a>
                        <h6 class="truncate">{{result.NAME|toTitleCase}}</h6>
                        <small class="text-muted">{{result.CITY|toTitleCase}}, {{result.STATE}}</small>
                    </div>
                    <!--
            <div class="artist-collage col-xs-12">
            <span class="play-mix"><span class="btn btn-info play-mix-btn"> <span>►</span> YouTube Mix</span></span>
            <div class="col-xs-6"><img src="http://i.ytimg.com/i/MXDyVR2tclKWhbqNforSyA/mq1.jpg" alt="artist-image" width="150" height="150"></div>
            <div class="col-xs-6 collage-rhs">
            <div class="col-xs-12"><img src="http://i.ytimg.com/vi/8gyLR4NfMiI/mqdefault.jpg" alt="artist-image" width="150" height="84"></div>
            <div class="col-xs-12"><img src="http://i.ytimg.com/vi/zKCrSN9oXgQ/mqdefault.jpg" alt="artist-image" width="150" height="84"></div>
          </div>
        </div>
      -->

                    <div class="listing-tab col-xs-12">
                        <p class="padded-text" v-if="result.STATE == 'NY'">
                            This is a long mission statement This is a long mission statement This is a long mission statement This is a long mission statement This is a long mission statement This is a long mission statement

                        </p>
                    </div>
                    <div class="listing-tab col-xs-12">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#details{{result.EIN}}" role="tab">Details</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#social{{result.EIN}}" role="tab">Social</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#type{{result.EIN}}" role="tab">Impact</a>
                            </li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="details{{result.EIN}}" role="tabpanel">
                                <ul>
                                    <li>Income<span>{{result.INCOME_AMT|formatMoney}}</span></li>
                                    <li>Revenue<span>{{result.REVENUE_AMT|formatMoney}}</span></li>
                                    <li>Assets<span>{{result.ASSET_AMT|formatMoney}}</span></li>
                                </ul>
                            </div>
                            <div class="tab-pane" id="social{{result.EIN}}" role="tabpanel">
                                <div class="related-artist">
                                    <div class="col-xs-12">
                                        <div class="col-xs-4 artist-next"><i class="fa fa-facebook-square" style="color:#3b5998" aria-hidden="true"></i> <small class="socialtext">Facebook</small></div>
                                        <div class="col-xs-4 artist-next"><i class="fa fa-google-plus-square" style="color:#d34836" aria-hidden="true"></i> <small class="socialtext">Google+</small></div>
                                        <div class="col-xs-4 artist-next"><i class="fa fa-twitter-square" style="color:#1dcaff" aria-hidden="true"></i> <small class="socialtext">Twitter</small></div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="type{{result.EIN}}" role="tabpanel" style="background:grey;">
                                <span v-for="nteeimg in getNTEEImages(result.NTEE_CD)">
                                  <span style="height:100px;width:100px;">
                                    <img v-bind:src="nteeimg" >
                                    <small>{{nteeimg}}</small>
                                  </span>
                                </span>
                            </div>
                        </div>
                        <div>
                            <a type="button" class="btn btn-default btn-sm btn-block" style="opacity:.5;" v-link="{ path: '/profile/' + result.EIN , activeClass: 'active'}" target="_blank">Profile</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="noneFound" style="text-align: center; color: #5b9089; margin-top: 100px;">
            <h1>No Results</h1>
        </div>

    </div>


    <div v-if="noMore" style="text-align: center; color: #5b9089; margin-top: 100px;">
        <h1>End of Results</h1>
    </div>

</div>

</template>

<script>

import searchbox from './searchbox.vue'
import images from './images.js'
var grid = null;

export default {
    components: {
        'searchbox': searchbox
    },
    methods: {
        updateResults: function(results) {
            if (this.page === 0 && results.length === 0) {
                this.noneFound = true;
            } else {
                this.noneFound = false;
            }

            if (this.page > 0 && results.length === 0) {
                this.noMore = true;
            } else {
                this.noMore = false;
            }

            if (this.page === 0) {
                this.searchResults = [];
            }
            for (var i = 0; i < results.length; i++) {
                this.searchResults.push(results[i]);
            }
        },
        getNTEEImages: function(ntee) {
            return images.getNTEEImages(ntee);
        },
        search: function(query, newSearch) {
            NProgress.start();
            console.log(query);
            this.lastSearch = query;
            if (newSearch === true) {
                this.page = 0;
                this.noMore = false;
                this.noneFound = false;
            }
            if (query.sample === true) {
                this.$http.get('http://localhost:80/getSamples').then((response) => {
                    // success callback
                    //console.log(response)
                    NProgress.done();
                    this.updateResults(response.data);
                }, (response) => {
                    // error callback
                    console.log(response);
                });
            } else {
                delete query.sample;
                this.$http.get("http://localhost:80/getResults?q=" + encodeURIComponent(JSON.stringify(query)) + "&p=" + this.page).then((response) => {
                    console.log(response);
                    NProgress.done();
                    this.updateResults(response.data);
                })
            }

        },
        debounce: function(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
        getDocHeight: function() {
            return Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
        },
    },

    data: function() {
        return {
            searchResults: [],
            noMore: false,
            noneFound: false,
            page: 0,
            lastSearch: {}
        }
    },

    ready: function() {
        NProgress.configure({
            showSpinner: false,
            trickleRate: 0.5,
            //trickleSpeed: 800
        });

        this.search({
            sample: true,
        })


        window.addEventListener('resize', function() {
            grid.mount();
        });

        document.addEventListener('DOMNodeInserted', this.debounce(function() {
            grid = new Minigrid({
                container: '.mcards',
                item: '.mcard',
                gutter: 10
            });
            grid.mount();
        }, 250));

        $(window).scroll(this.debounce(() => {
            if ($(window).scrollTop() + $(window).height() == this.getDocHeight()) {
                if (!this.noMore && !this.noneFound) {
                    this.page++;
                    this.search(this.lastSearch)
                }
            }
        }, 250));
    }
}

</script>
