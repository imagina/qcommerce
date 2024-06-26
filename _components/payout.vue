<template>
  <div id="payoutComponent">
    <div class="box box-auto-height relative-position" style="padding: 0">
      <!--Payout list-->
      <q-table id="tablePayout" v-bind="payoutTableProps">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <btn-menu :actions="props.value"/>
          </q-td>
        </template>
      </q-table>
      <!--Help Caption-->
      <div class="q-mb-md" v-if="false">
        <q-banner v-if="payoutBannerHelp" rounded dense :class="payoutBannerHelp.class">
          <template v-slot:avatar>
            <q-icon :name="payoutBannerHelp.icon" color="white"/>
          </template>
          <div class="text-white">{{ payoutBannerHelp.message }}</div>
          <template v-slot:action v-if="account && account.urlPanel">
            <q-btn flat color="white" label="Ver mi Panel"
                   @click="$helper.openExternalURL(account.urlPanel)"/>
          </template>
        </q-banner>
      </div>
      <!--Form-->
      <master-modal v-model="modal.show" :title="modal.title" custom-position>
        <dynamic-form v-model="form" form-type="grid" :form-id="paymentMethod.formId" @submit="connectPayout"/>
      </master-modal>
      <!--Inner Loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  watch: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      loading: false,
      paymentMethod: false,
      account: false,
      form: {},
      modal: {
        show: false,
        title: ''
      }
    }
  },
  computed: {
    //Payout Table
    payoutTableProps() {
      return {
        hidePagination: true,
        columns: [
          {name: 'title', label: this.$tr('isite.cms.label.payOut'), field: 'title', align: 'left'},
          {name: 'account', label: this.$tr('isite.cms.label.account'), field: 'account', align: 'left'},
          {name: 'actions', label: this.$trp('isite.cms.label.action'), field: 'actions'},
        ],
        rows: [
          {
            title: 'Stripe',
            account: !this.account ? this.$tr('isite.cms.message.noRegistered') :
                (this.account.payoutsEnabled ? this.account.email : this.account.urlPanelMsj),
            actions: [
              {
                label: this.$tr('isite.cms.label.configuration'),
                icon: 'fas fa-cog',
                action: (item) => {
                  this.modal.show = true
                  this.modal.title = `${this.$tr('isite.cms.label.payOut')} | Stripe`
                }
              },
              {
                label: this.$tr('qcredit.layout.message.showPanel'),
                icon: 'fab fa-cc-stripe',
                vIf: this.account && this.account.payoutsEnabled,
                action: (item) => {
                  this.$helper.openExternalURL(this.account.urlPanel)
                }
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    init() {
      this.loadPage()
    },
    //Refresh page actions
    async loadPage() {
      this.loading = true
      await Promise.all([
        this.getPaymentMethod(),
        this.getPayoutData()
      ])
      this.loading = false
    },
    //get payment method
    getPaymentMethod() {
      return new Promise(resolve => {
        //Request Params
        let requestParams = {
          refresh: true,
          params: {filter: {field: 'name'}}
        }
        //request
        this.$crud.show('apiRoutes.qcommerce.paymentMethods', 'icommercestripe', requestParams).then(response => {
          this.paymentMethod = response.data
          resolve(response.data)
        }).catch(error => {
          this.$apiResponse.handleError(error, () => {
            resolve(error)
          })
        })
      })
    },
    //Get payout data
    getPayoutData() {
      return new Promise((resolve, reject) => {
        this.$crud.get('apiRoutes.qcommerce.stripe.accountUser', {refresh: true}).then(response => {
          if (response.data && response.data.email) {
            this.account = response.data
            this.form.email = this.$clone(response.data.email)
          }
          resolve(response)
        }).catch(error => {
          this.form = {}
          this.account = false
          resolve(false)
        })
      })
    },
    //connect with payout
    connectPayout() {
      return new Promise((resolve, reject) => {
        this.loading = true
        this.$crud.create('apiRoutes.qcommerce.stripe.connect', this.form).then(response => {
          //Show dialog to finish register
          this.$alert.info({
            mode: 'modal',
            message: this.$tr('isite.cms.message.finishRegister'),
            actions: [{
              label: this.$tr('isite.cms.label.next'),
              color: 'green',
              handler: () => {
                this.$helper.openExternalURL(response.data.accountRegisterLink)
                this.loadPage()
              }
            }],
          })
          this.loading = false
        }).catch(error => {
          this.loading = false
        })
      })
    }
  }
}
</script>
<style lang="scss">
#payoutComponent {
  #tablePayout {
    th {
      color: $blue-grey;
      font-weight: bold;
      font-size: 13px !important;
    }

    td {
      color: #222222;
    }
  }
}
</style>
