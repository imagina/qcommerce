<template>
  <div class="row gutter-y-sm relative-position">
    <div class="col-md-12 ">
      <div class="row q-gutter-x-sm justify-between">
        <q-btn :to="{name: 'qcommerce.admin.options'}" icon="fa-light fa-arrow-left"
               v-bind="buttonProps"/>
        <q-btn @click="id = -1,dialogNewValue=true" icon="fa-light fa-plus"
               :label="$tr('icommerce.cms.newOptionValue')" v-bind="buttonProps"/>
        <q-btn @click="getItems(true)" icon="fa-light fa-rotate-right" v-bind="buttonProps">
          <q-tooltip :delay="300">
            {{ $tr('isite.cms.label.refresh') }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>

    <div class="col-12">
      <q-separator class="q-my-md" />
    </div>

    <div class="col-12 q-mt-sm">
      <nestedoptionValues :optionValues="optionValues" @updated="getItems(true)"/>
    </div>

    <div class="col-12 text-right q-mt-sm">
      <q-btn v-if="optionValues.length" @click="updateOrder" icon="fas fa-save" :label="$tr('isite.cms.label.save')"
             color="positive" class="q-ml-xs" rounded unelevated/>
    </div>

    <q-dialog v-model="dialogNewValue">
      <q-card>
        <q-toolbar class="bg-primary text-white">
          <q-avatar>
            <q-icon name="fa fa-stream"/>
          </q-avatar>
          <q-toolbar-title><span class="text-weight-bold">{{
              this.id > 0 ? $tr('icommerce.cms.sidebar.adminValuesEdit') : $tr('icommerce.cms.sidebar.adminValuesCreate')
            }}</span>
          </q-toolbar-title>
          <q-btn flat round dense icon="fa fa-close" v-close-popup/>
        </q-toolbar>
        <q-card-section>
          <option-values-form :option-id="$route.params.id" :id="id" @updated="closeNewModal"></option-values-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
import nestedoptionValues from 'modules/qcommerce/_components/admin/optionValues/nested'
import optionValuesForm from 'modules/qcommerce/_pages/admin/optionValues/form'
import { eventBus } from 'src/plugins/utils'

export default {
  components: {
    nestedoptionValues,
    optionValuesForm,
  },
  data() {
    return {
      loading: false,
      optionValues: [],
      modalNewItem: false,
      modalUpdateItem: false,
      dialogNewValue: false,
      itemUpdate: {},
      itemDelete: {},
      id: -1,
    }
  },
  created() {
    this.$nextTick(() => {
      this.getItems()
      eventBus.on('updateoptionValues', this.handlerUpdateoptionValues)
      eventBus.on('showEdit', this.showEdit)
    })
  },
  computed: {
    buttonProps() {
      return {
        round: false,
        rounded: true,
        dense: true,
        unelevated: true,
        textColor: "primary",
        style: "border: 1px solid rgba(0, 13, 71, 0.15)",
        class: `btn-${this.size}`,
        noCaps: true,
      }
    },
  },
  methods: {
    showEdit(id) {
      this.id = id
      this.dialogNewValue = true
    },
    getItems(refresh = false) {
      this.loading = true
      let optionId = this.$route.params.id
      let params = {
        refresh: refresh,
        params: {
          filter: {
            optionId: optionId,
            order: {field: 'sort_order', way: 'asc'}
          }
        },
      }

      this.$crud.index('apiRoutes.qcommerce.optionValues', params).then(response => {
        this.optionValues = response.data
        this.loading = false
      }).catch(error => {
        this.$apiResponse.handleError(error, () => {
          this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
          this.loading = false
        })
      })
    },
    updateOrder() {
      let newdata = []
      this.treeToArray(this.optionValues, newdata)
      this.loading = true
      this.$crud.create('apiRoutes.qcommerce.optionValuesOrdener', {values: newdata})
          .then(response => {
            this.loading = false
            this.getItems(true)
            this.$alert.success({message: `${this.$tr('isite.cms.message.recordUpdated')}`})
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
          })
    },
    arrayToTree(elements, parentId = 0) {
      return elements.filter(element => {
        if (element.parentId == parentId) {
          return element['children'] = this.arrayToTree(elements, element.id)
        }
      })
    },
    treeToArray(items, response, parentId = null) {
      let elements = [...items]
      elements.forEach((element, index) => {
        element.sortOrder = index
        element.parentId = parentId
        response.push(element)
        if (element.children && element.children.length) this.treeToArray(element.children, response, element.id)
      })
    },
    handlerUpdateoptionValues(event) {
      this.getItems()
    },
    closeNewModal() {
      this.dialogNewValue = false
      this.getItems(true)
    }
  }
}
</script>
