<template>
  <div class="q-mt-lg">
    <p>
      <b>{{ $tr('icommerce.cms.newStatus') }}</b>
    </p>
    <div class="q-py-xs">
      <tree-select v-model="form.status" :options="statuses" :placeholder="$tr('isite.cms.form.status')"/>
    </div>
    <div class="q-py-xs">
      <q-input :label="$tr('isite.cms.form.comment')" outlined error-message="We need a comment" rows="3"
               type="textarea"
               v-model="form.comment" label="Comment"/>
    </div>
    <div class="q-py-xs">
      <span>Notificar al Cliente</span>
      <q-toggle
          v-model="form.notify"
          checked-icon="check"
          color="green"
          :false-value="false"
          :true-value="true"
          unchecked-icon="clear"
      />
    </div>
    <div class="q-mt-md">
      <q-btn unelevated rounded label="save" color="primary" icon="fa-light fa-save" @click="saveOrderHistoryStatus()"/>
    </div>

  </div>
</template>

<script>

export default {
  emits: ['orderHistoryCreated'],
  data() {
    return {
      loading: false,
      statuses: [],
      form: {
        orderId: this.$route.params.id,
        status: null,
        notify: false,
        comment: ''
      }
    }
  },
  created() {
    this.getStatus()
  },
  methods: {
    getStatus() {
      let params = {
        params: {
          refresh: true
        }
      }
      this.$crud.index('apiRoutes.qcommerce.orderStatus', params)
          .then(response => {
            this.statuses = response.data.map(item => {
              return {
                id: item.id,
                label: item.title
              }
            })
          })
          .catch(error => {
            this.$apiResponse.handleError(error, () => {
            })
          })
    },
    saveOrderHistoryStatus() {
      this.$v.form.$touch()
      this.loading = true
      if (this.$v.form.$error) {
        this.$alert.error({message: this.$tr('isite.cms.message.formInvalid')})
        this.loading = false
        return
      }
      this.$crud.create('apiRoutes.qcommerce.orderStatusHistory', this.form)
          .then(response => {
            this.$emit('orderHistoryCreated')
            this.$alert.success({message: this.$tr('isite.cms.message.recordUpdated')})
            this.clearForm()
            this.loading = false
          })
          .catch(error => {
            this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated')})
            this.loading = false
          })
    },
    clearForm() {
      this.form.comment = ''
      this.form.status = null
    }
  }
}
</script>
