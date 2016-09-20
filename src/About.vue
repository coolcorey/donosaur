<template>
  <div>
    <div class="row">
        <div class="col-xs-12 watch-card">
            <div class="artist-title col-xs-12">
                <h6 class="truncate">About Donosaur</h6>
            </div>
            <div class="listing-tab col-xs-12">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#donating" role="tab">Donate</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#searching" role="tab">Search</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#investigating" role="tab">Investigate</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#connecting" role="tab">Connect</a>
                    </li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active" id="donating" role="tabpanel">
                      <p class="padded-text">
                            You can donate to a non-profit so easily today, but that ease comes with a cost. Most transaction handlers shave 4-7% off of each donation, meaning that less of your donation goes to your nonprofit of choice. Donosaur, on the other hand, doesn't steal even a penny. Using <a href="https://www.paypal.com/webapps/mpp/donations">PayPal</a> to transact donations, each non-profit gets every cent you send, minus PayPal's minimum required processing fee of 2.2% + 30 cents.
                        </p>
                    </div>
                    <div class="tab-pane" id="searching" role="tabpanel">
                      <p class="padded-text">
                            Donosaur provides pertinent data in a searchable format to help you find all the non-profits in your area or by type. Then sort all of them by income and expenses based on the most recent IRS data.
                    </div>
                    <div class="tab-pane" id="investigating" role="tabpanel">
                      <p class="padded-text">
                        Donosaur displays up-to-date IRS information about non-profits in easy to read charts and graphs so you can do your own investigation and decide what nonprofits you want to donate to.
                      </p>
                    </div>
                    <div class="tab-pane" id="connecting" role="tabpanel">
                        <p class="padded-text">
                            Although a work in progress, we're here to help connect people with the non-profit organizations that they align with for greater visability and outreach. Using non-profit's social media networks, Donosaur allows you to find and keep updated on those that you care about.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
