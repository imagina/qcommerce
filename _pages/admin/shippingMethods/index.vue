<template>
  <div id="paymentMethodsIndex">

    <!--Content-->
    <div class="col-12 relative-position backend-page">
      <!--Table-->
      <q-table
          :rows="table.data"
          :columns="table.columns"
          :pagination.sync="table.pagination"
          @request="getData"
          :filter="table.filter"
          class="shadow-1 border-top-color"
      >
        <!--Table slot left-->
        <template slot="top-left" slot-scope="props">
          <!--Search-->
          <q-input clearable v-model="table.filter.search" dense outlined debounce="800"
                   :placeholder="`${$tr('isite.cms.label.search',{capitalize : true})}...`"
                   @update:modelValue="getDataTable">
            <template v-slot:append>
              <q-icon name="fas fa-search"/>
            </template>
          </q-input>
        </template>
        <!--Table slot right-->
        <template slot="top-right" slot-scope="props">
          <!--Button refresh data-->
          <q-btn icon="fas fa-sync-alt" color="info" class="q-ml-xs"
                 @click="getDataTable(true)">
            <q-tooltip :delay="300">{{ $tr('isite.cms.label.refresh') }}</q-tooltip>
          </q-btn>
        </template>

        <!--= Custom Columns =-->
        <q-td slot="body-cell-actions" slot-scope="props" :props="props">
          <!--Edit button-->
          <q-btn color="green" icon="fas fa-pen" size="sm"
                 v-if="$hasAccess('icommerce.payment-methods.edit')"
                 @click="itemToEdit = props.row; formItemShow = true">
            <q-tooltip :delay="300">{{ $tr('isite.cms.label.edit') }}</q-tooltip>
          </q-btn>
          <!--status button-->
          <q-toggle color="green" v-model="props.row.status" class="q-px-xs" @update:modelValue="update(props.row)">
            <q-tooltip :delay="300">{{ `${$tr('isite.cms.label.enabled')}/${$tr('isite.cms.label.disabled')}` }}
            </q-tooltip>
          </q-toggle>
        </q-td>
      </q-table>


      <!--Loading-->
      <inner-loading :visible="loading"></inner-loading>
      <component :is="itemToEdit.name" v-model="formItemShow" :item="itemToEdit"
                 @updated="getDataTable(true)" :itemId="itemToEdit.id"/>
    </div>
  </div>
</template>
<script>
//Components
import icommerceagree from 'modules/qcommerce/_components/admin/shippingMethods/agree'
import icommerceflatrate from 'modules/qcommerce/_components/admin/shippingMethods/flatrate'
import icommercefreeshipping from 'modules/qcommerce/_components/admin/shippingMethods/freeshipping'
import icommercelocaldelivery from 'modules/qcommerce/_components/admin/shippingMethods/localdelivery'
import icommercepickup from 'modules/qcommerce/_components/admin/shippingMethods/pickup'
import icommerceurbanshipping from 'modules/qcommerce/_components/admin/shippingMethods/urbanshipping'
import icommerceusps from 'modules/qcommerce/_components/admin/shippingMethods/usps'
import icommerceups from 'modules/qcommerce/_components/admin/shippingMethods/ups'

export default {
  props: {},
  components: {
    icommerceagree,
    icommerceflatrate,
    icommercefreeshipping,
    icommercelocaldelivery,
    icommercepickup,
    icommerceurbanshipping,
    icommerceusps,
    icommerceups
  },
  watch: {},
  mounted() {
    this.$nextTick(function () {
      this.getDataTable(true)
    })
  },
  data() {
    return {
      loading: false,
      formItemShow: false,
      itemToEdit: {},
      table: {
        data: [],
        columns: [
          {name: 'id', label: 'ID', field: 'id', style: 'width: 50px'},
          {name: 'title', label: 'Title', field: 'title', align: 'rigth'},
          {
            name: 'createdAt', label: 'Creation Date', field: 'createdAt', align: 'left',
            format: val => val ? this.$trd(val) : '-',
          },
          {name: 'actions', label: 'Actions', align: 'left'},
        ],
        pagination: {
          page: 1,
          rowsNumber: '',
          rowsPerPage: 10
        },
        filter: {
          search: null,
          allTranslations: true
        }
      },
    }
  },
  methods: {
    //Request products with params from server table
    getDataTable(refresh = false) {
      this.getData({pagination: this.table.pagination}, refresh)
    },
    //Get payment methods
    getData({pagination, filter}, refresh = false) {
      this.loading = true
      //Params to request
      let params = {
        refresh: refresh,
        params: {
          filter: this.table.filter,
          page: pagination.page,
          take: pagination.rowsPerPage
        }
      }

      //Request
      this.$crud.index('apiRoutes.qcommerce.shippingMethods', params).then(response => {
        this.table.data = response.data
        this.table.pagination.page = response.meta.page.currentPage
        this.table.pagination.rowsNumber = response.meta.page.total
        this.table.pagination.rowsPerPage = pagination.rowsPerPage
        this.loading = false
      }).catch(error => {
        this.$apiResponse.handleError(error, () => {
          this.$alert.error({message: this.$tr('isite.cms.message.errorRequest')})
          this.loading = false
        })
      })

    },

    //update shipping methods
    update(data) {
      this.loading = true
      //Request
      this.$crud.update('apiRoutes.qcommerce.shippingMethods', data.id, data).then(response => {
        this.$alert.success({message: this.$tr('isite.cms.message.recordUpdated')})
        this.loading = false
      }).catch(error => {
        this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated')})
        this.loading = false
      })

    },

  }

}
</script>
<style lang="scss">
</style>
