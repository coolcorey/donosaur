<style scoped>
.fade-search {
    background: rgba(255, 255, 255, 0.8);
    transition: background 0.3s;
}

.fade-search:focus {
    border: solid 1px #707070;
    box-shadow: 0 0 5px 1px #969696;
    background: rgba(255, 255, 255, 0.9);
}

body {
    padding-top: 50px;
}

.withmargin {
    margin-bottom: 10px;
}

.dropdown.dropdown-lg .dropdown-menu {
    margin-top: -1px;
    padding: 6px 20px;
}

.input-group-btn .btn-group {
    display: flex !important;
}

.btn-group .btn {
    border-radius: 0;
    margin-left: -1px;
}

.btn-group .btn:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.btn-group .form-horizontal .btn[type="submit"] {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.form-horizontal .form-group {
    margin-left: 0;
    margin-right: 0;
}

.form-group .form-control:last-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

@media screen and (min-width: 768px) {
    #adv-search {
        //width: 500px;
        margin: 0 auto;
    }
    .dropdown.dropdown-lg {
        position: static !important;
    }
    .dropdown.dropdown-lg .dropdown-menu {
        min-width: 500px;
    }
}

</style>

<template>

<div>
    <div class="row">
        <div class="col-md-12">
            <div class="input-group" id="adv-search">
                <input id="nameTypeahead" type="text" data-provide="typeahead" class="form-control fade-search" autocomplete="off">

                <div class="input-group-btn">
                    <div class="btn-group" role="group">
                        <div class="dropdown dropdown-lg">
                            <button type="button" class="btn btn-default dropdown-toggle fade-search" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <form class="form-horizontal" role="form">
                                    <div class="form-group">
                                        <select id="sortSelect" class="form-control withmargin">
                                            <option value="" selected>Sort By</option>
                                            <option value="Highest Revenue">Highest Revenue</option>
                                            <option value="Lowest Revenue">Lowest Revenue</option>
                                            <option value="Highest Assets">Highest Assets</option>
                                            <option value="Lowest Assets">Lowest Assets</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <select id="typeSelect" class="form-control withmargin">
                                            <option value="" selected>Type</option>
                                            <option value="Arts and Culture">Arts and Culture</option>
                                            <option value="Animals/Environment">Animals/Environment</option>
                                            <option value="Child and Family Services">Child and Family Services</option>
                                            <option value="Civil Rights/Advocacy">Civil Rights/Advocacy</option>
                                            <option value="Community and Neighborhoods">Community and Neighborhoods</option>
                                            <option value="Education">Education</option>
                                            <option value="Employment">Employment</option>
                                            <option value="Food and Nutrition">Food and Nutrition</option>
                                            <option value="Grants">Grants</option>
                                            <option value="International Affairs">International Affairs</option>
                                            <option value="Legal Services/Crime Prevention">Legal Services/Crime Prevention</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Housing">Housing</option>
                                            <option value="Science, Technology and Research">Science, Technology and Research</option>
                                            <option value="Sports and Recreation">Sports and Recreation</option>
                                            <option value="Religious Affiliated">Religious Affiliated</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <select id="stateSelect" class="form-control withmargin">
                                        <option value="" selected>State</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                    <input id="cityTypeahead" type="text" data-provide="typeahead" class="form-control withmargin" autocomplete="off" placeholder="City">
                                    <input id="zipTypeahead" type="text" data-provide="typeahead" class="form-control withmargin" autocomplete="off" placeholder="Zipcode">
                                </form>
                            </div>
                        </div>
                        <button type="button" class="btn btn-default fade-search" v-on:click="collectAndSearch()"><span class="fa fa-search" aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

</template>

<script>

export default {
    components: {},
    props: ['searchfn'],
    methods: {
        toTitleCase: function(str) {
            return str.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        },
        collectAndSearch: function() {

            var query = {
                sample: false,
                name: $('#nameTypeahead').val(),
                zip: $('#zipTypeahead').val(),
                city: $('#cityTypeahead').val(),
                state: $('#stateSelect').val(),
                sort: $('#sortSelect').val(),
                ntee: $('#typeSelect').val(),
            }

            if (query.name || query.zip || query.city || query.state || query.ntee || query.sort)
                this.searchfn(query, true);
        }
    },
    data: function() {
        return {}
    },
    ready: function() {
        var _this = this;

        $(document).keypress(function(e) {
            if (e.which == 13) {
                console.log('enterrrr');
                _this.collectAndSearch();
            }
        });

        $('#nameTypeahead').typeahead({
            source: function(query, process) {
                _this.$http.get('http://donosaur.org/api/typeaheadNames?q=' + query).then((response) => {
                    // success callback
                    //console.log(response)
                    var data = response.data;
                    return process(data);
                }, (response) => {
                    // error callback
                    console.log(response);
                });
            },
            autoSelect: false,
            delay: 300,
            minLength: 3,
            displayText: function(item) {
                return _this.toTitleCase(item.NAME)
                    //return '<strong>' + _this.toTitleCase(item.NAME) + '</strong> <small>' + _this.toTitleCase(item.CITY) + ', ' + _this.toTitleCase(item.STATE) + '</small>'
            },
            //highlighter: function (item) {
            //  return item;
            //},
            //updater: function(item){
            //  console.log(item);
            //  return 'poop';
            //}
        });

        $('#zipTypeahead').typeahead({
            source: function(query, process) {
                if (query.length < 3) return [];
                _this.$http.get('http://donosaur.org/api/zipCodes?q=' + query).then((response) => {
                    // success callback
                    var data = response.data;
                    return process(data);
                }, (response) => {
                    // error callback
                    console.log(response);
                });
            },
            autoSelect: true,
            delay: 300,
            minLength: 3,
            displayText: function(item) {
                return item._id;
            },
        });

        $('#cityTypeahead').typeahead({
            source: function(query, process) {
                if (query.length < 3) return [];
                _this.$http.get('http://donosaur.org/api/cityNames?q=' + query).then((response) => {
                    // success callback
                    //console.log(response)
                    var data = response.data;
                    return process(data);
                }, (response) => {
                    // error callback
                    console.log(response);
                });
            },
            autoSelect: true,
            delay: 300,
            minLength: 3,
            displayText: function(item) {
                return _this.toTitleCase(item._id);
            },
        });

    }

}

</script>
