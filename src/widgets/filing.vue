

<template>

<div>
    <div class="widget-header">
        <h6>Filing</h6>
    </div>
    <div class="widget-content" style="padding-top:25px;">
        <div v-if="dataL.meta">
            <strong>Deductiblity</strong>
            <br>
            <small>{{dataL.meta.DEDUCTIBILITY | deductabilityType}}</small>
            <hr>
            <strong>990 Filing</strong>
            <br>
            <small>{{dataL.meta.FILING_REQ_CD | filingReq}}</small>
            <br>
            <hr>
            <strong>990 PF Filing</strong>
            <br>
            <small>{{dataL.meta.PF_FILING_REQ_CD | PFfilingReq}}</small>
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
        }
    },
    filters: {
        'PFfilingReq': function(code) {
            switch (code) {
                case '0':
                    return 'Not required to file 990PF';
                    break;
                case '1':
                    return 'Required to file 990PF';
                    break;

                default:
                    return 'Unknown'
                    break;
            }
        },
        'deductabilityType': function(code) {
            switch (code) {
                case '1':
                    return 'Contributions are deductible.';
                    break;
                case '2':
                    return 'Contributions are not deductible.';
                    break;
                case '4':
                    return 'Contributions are deductible by treaty (foreign organizations).';
                    break;
                default:
                    return 'Unknown'
                    break;
            }
        },
        'filingReq': function(code) {
            switch (code) {
                case '00':
                    return 'Not required to file (all other)';
                    break;
                case '01':
                    return '990 or 990EZ';
                    break;
                case '02':
                    return 'Required to file Form 990-N - Income less than $25,000 per year';
                    break;
                case '03':
                    return 'Group return';
                    break;
                case '04':
                    return 'Required to file Form 990-BL, Black Lung Trusts';
                    break;
                case '06':
                    return 'Not required to file (church)';
                    break;
                case '07':
                    return 'Government 501(c)(1)';
                    break;
                case '13':
                    return 'Not required to file (religious organization)';
                    break;
                case '14':
                    return 'Not required to file (instrumentalities of states or political subdivisions)';
                    break;

                default:
                    return 'Unknown';
            }
        }
    }
}

</script>
