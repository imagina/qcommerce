<template>
  <div id="crudOptionValues" class="relative-position backend-page">
    <!--Table-->
    <q-table :rows="table.data" :columns="columns" row-key="name">
      <!--Header-->
      <template v-slot:top-left>
        <span class="input-title">{{ $tr('icommerce.cms.form.productOptionValues') }}</span>
      </template>
      <template v-slot:top-right>
        <!--Button new record-->
        <q-btn icon="fas fa-edit" color="green" :label="$tr('icommerce.cms.newOptionValue')"
               @click="modal.itemId = false; modal.show = true" class="btn-small" outline rounded />
      </template>

      <!--= Custom Columns =-->
      <template v-slot:body-cell-actions="props">
        <q-td>
          <!--Edit button-->
          <q-btn color="green" icon="fas fa-pen" size="xs" outline round
                 @click="modal.itemId = props.row.id; setItemUpdate()" padding="sm">
            <q-tooltip :delay="300">{{ $tr('isite.cms.label.edit') }}</q-tooltip>
          </q-btn>
          <!--Delete button-->
          <q-btn color="red" icon="fas fa-trash-alt" size="xs" class="q-ml-xs"
                 @click="deleteItem(props.row.id)" outline round padding="sm">
            <q-tooltip :delay="300">{{ $tr('isite.cms.label.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!--Modal with form-->
    <q-dialog id="formCategory" class="modal-form" v-model="modal.show"
              no-esc-dismiss no-backdrop-dismiss v-if="success">
      <q-card style="max-width: 1245px" class="bg-white backend-page">
        <!--Header-->
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title v-if="!modal.itemId">
            {{ $tr('icommerce.cms.newProductOptionValue') }}
          </q-toolbar-title>
          <q-toolbar-title v-else>
            {{ `${$tr('icommerce.cms.updateProductOptionValue')} ID: ${modal.itemId}` }}
          </q-toolbar-title>
          <q-btn flat v-close-popup icon="fas fa-times" />
        </q-toolbar>

        <!--Content-->
        <q-form @submit="modal.itemId ? updateItem() : createItem()" ref="formContent"
                @validation-error="$alert.error($tr('isite.cms.message.formInvalid'))"
                class="q-pa-md" autocomplete="off">
          <div class="row q-col-gutter-x-md">
            <!--Form left-->
            <div class="col-12 col-md-6">
              <!--Option Value-->
              <div class="input-title relative-position q-mb-md">
                {{ `${$tr('icommerce.cms.form.optionValue')} *` }}
                <!--Crud Option Value-->
                <crud :crud-data="import('modules/qcommerce/_crud/productOptionValues')"
                      type="button-create" @created="getOptionValues" class="absolute-right"
                      :custom-data="{read: {requestParams: {filter: {optionId: form.optionId} } }, formLeft: { optionId: { value: form.optionId } } }" />
              </div>
              <q-field v-model="form.optionValueId" borderless
                       :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]">
                <tree-select
                  :clearable="false"
                  :options="options.values"
                  value-consists-of="BRANCH_PRIORITY"
                  v-model="form.optionValueId"
                  placeholder=""
                />
              </q-field>
              <!--Parent Option Value -->
              <div v-if="options.parentValues.length">
                <!-- parentProductOptionValueId => id -->
                <dynamic-field v-model="form.parentOptionValueId" :field="{
                  type : 'select',
                  required : true,
                  props : {
                    label : `${$tr('icommerce.cms.form.parentOptionValue')} *`,
                    options : options.parentValues
                  }
                }" />
              </div>
              <!--Quantity-->
              <q-input v-model="form.quantity" type="number" outlined dense
                       :label="`${$tr('isite.cms.form.quantity')} *`"
                       :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]" />
              <div class="input-title">{{ $tr('isite.cms.form.stock') }}</div>
              <tree-select
                v-model="form.stockStatus"
                :options="[
                  {label: this.$tr('isite.cms.label.available'), id: 1},
                  {label: this.$tr('isite.cms.label.soldOut'), id: 0}
                ]"
                data-testid="stockStatus"
                :clearable="false"
                value-consists-of="BRANCH_PRIORITY"
                class="q-mb-md"
              />
              <!--Subtrack-->
              <div class="input-title">
                {{ `${$tr('icommerce.cms.form.subtractFromStock')}` }}
              </div>
              <q-field v-model="form.subtract" borderless>
                <tree-select
                  :clearable="false"
                  :options="options.subtract"
                  value-consists-of="BRANCH_PRIORITY"
                  v-model="form.subtract"
                  placeholder="" class="q-mb-md"
                />
              </q-field>
            </div>
            <!--Form right-->
            <div class="col-12 col-md-6">
              <!--Price-->
              <div class="content-prefix row">
                <div class="input-title col-12">{{ `${$tr('isite.cms.form.price')} *` }}</div>
                <div class="col-2"><!--Prefix-->
                  <tree-select
                    :clearable="false"
                    :options="options.prefix" v-model="form.pricePrefix"
                    placeholder=""
                  />
                </div>
                <div class="col-10 q-pl-sm"><!--Input-->
                  <q-input v-model="form.price" style="padding: 0px" outlined dense type="number"
                           :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]" />
                </div>
              </div>
              <!--Points-->
              <div class="content-prefix row">
                <div class="input-title col-12">{{ `${$trp('isite.cms.form.point')} *` }}</div>
                <div class="col-2"><!--Prefix-->
                  <tree-select
                    :clearable="false"
                    :options="options.prefix" v-model="form.pointsPrefix"
                    placeholder=""
                  />
                </div>
                <div class="col-10 q-pl-sm"><!--Input-->
                  <q-input v-model="form.points" style="padding: 0px" outlined dense type="number"
                           :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]" />
                </div>
              </div>
              <!--weight-->
              <div class="content-prefix row">
                <div class="input-title col-12">{{ `${$tr('isite.cms.form.weight')} *` }}</div>
                <div class="col-2"><!--Prefix-->
                  <tree-select
                    :clearable="false"
                    :options="options.prefix" v-model="form.weightPrefix"
                    placeholder=""
                  />
                </div>
                <div class="col-10 q-pl-sm"><!--Input-->
                  <q-input v-model="form.weight" style="padding: 0px" outlined dense type="number"
                           :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]" />
                </div>
              </div>
              <!-- images-->
              <div class="content-prefix row" v-if="showMedia">
                <div class="col-12">
                  <dynamic-field v-for="(field, keyField) in mediaFields" :key="keyField" :field="field"                  
                      v-model="form[field.name || keyField]"
                      :item-id="this.modal.itemId"
                  />
                </div>
              </div>
            </div>
          </div>
          <!--Loading-->
          <inner-loading :visible="loading" />
        </q-form>

        <!--Footer-->
        <q-toolbar class="bg-white">
          <q-toolbar-title></q-toolbar-title>
          <!--Button Save-->
          <q-btn icon="fas fa-save" color="green"
                 v-if="!modal.itemId" :label="$tr('isite.cms.label.save')"
                 :loading="loading" @click="$refs.formContent.submit()" />
          <!--Button Update-->
          <q-btn :label="$tr('isite.cms.label.update')" icon="fas fa-pen" color="green"
                 :loading="loading" @click="$refs.formContent.submit()" v-else />
        </q-toolbar>
      </q-card>
    </q-dialog>

    <!--Loading-->
    <inner-loading :visible="loading" />
  </div>
</template>
<script>
export default {
  props: {
    productOption: { defalt: false }
  },
  watch: {
    productOption: {
      deep: true,
      handler: function(newValue) {
        this.initForm();
      }
    },
    'modal.itemId': {
      deep: true,
      handler: function(newValue) {
        if (!newValue) this.resetform();
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.initForm();
    });
  },
  data() {
    return {
      loading: false,
      success: false,
      optionId: null,
      table: {
        data: []
      },
      modal: {
        show: false,
        itemId: false,
        formOptionValue: false
      },
      form: {},
      options: {}
    };
  },
  computed: {
    //Data form
    dataForm() {
      return {
        productOptionId: null,
        productId: null,
        optionId: null,
        optionValueId: null,
        parentOptionValueId: null,
        quantity: null,
        stockStatus: 1,
        subtract: 1,
        price: null,
        pricePrefix: '+',
        points: null,
        pointsPrefix: '+',
        weight: null,
        weightPrefix: '+'
      };
    },

    mediaFields(){
      return {
        mediasSingle: {
          type: 'media',
          props: {
            label: this.$tr('isite.cms.label.mainImage'),
            zone: 'mainimage',
            entity: 'Modules\\Icommerce\\Entities\\ProductOptionValue',
            entityId: null,
          }
        },
        mediasMulti: {
          type: 'media',
          props: {
            label: `${this.$tr('isite.cms.form.gallery')} (${this.$trp('isite.cms.label.image')})`,
            zone: 'gallery',
            entity: 'Modules\\Icommerce\\Entities\\ProductOptionValue',
            entityId: null,
            multiple: true,
          }
        }
      }
    },
    //Data options
    dataOptions() {
      return {
        values: [],
        parentValues: [],
        subtract: [
          { label: this.$tr('isite.cms.label.yes'), id: 1 },
          { label: this.$tr('isite.cms.label.no'), id: 0 }
        ],
        prefix: [
          { label: '+', id: '+' },
          { label: '-', id: '-' }
        ]
      };
    },
    //Columns translatables
    columns() {
      return [
        { name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id' },
        {
          name: 'optionValue', label: this.$tr('icommerce.cms.form.optionValue'),
          field: 'optionValue', align: 'left'
        },
        {
          name: 'parentOptionValue', label: this.$tr('icommerce.cms.form.parentOptionValue'),
          field: 'parentOptionValue', align: 'left'
        },
        { name: 'quantity', label: this.$tr('isite.cms.form.quantity'), field: 'quantity' },
        { name: 'price', label: this.$tr('isite.cms.form.price'), field: 'price' },
        { name: 'points', label: this.$trp('isite.cms.form.point'), field: 'points' },
        { name: 'weight', label: this.$trp('isite.cms.form.weight'), field: 'weight' },
        { name: 'actions', label: this.$trp('isite.cms.form.actions') }
      ];
    },
    showMedia(){
      return (this.productOption.type == 'color_image') || false
    }
  },
  methods: {
    //Init form
    async initForm() {
      this.loading = true;
      this.success = false;//Status component
      this.modal.show = false;//Close modal
      await this.resetform();//Reset Form
      await this.getData();//Get data
      this.success = true;//Status component
      this.loading = false;
    },
    //Reset Form
    async resetform() {
      this.form = this.$clone(this.dataForm);//Reset form
      this.options = this.$clone(this.dataOptions);//Reset Options
      //Assign data from product option to form
      if (this.productOption) {
        this.form.productOptionId = this.productOption.id;
        this.form.productId = this.productOption.productId;
        this.form.optionId = this.productOption.optionId;
      }
      this.getOptionValues();//Get options values
    },
    //Get data
    getData() {
      return new Promise((resolve, reject) => {
        let configName = 'apiRoutes.qcommerce.productOptionValues';
        let params = {
          refresh: true,
          params: { include: '', filter: { productOptionId: this.productOption.id } }
        };
        this.$crud.index(configName, params).then(response => {
          this.table.data = response.data;
          resolve(true);
        }).catch(error => {
          this.$apiResponse.handleError(error, () => {
            this.$alert.error({ message: this.$tr('isite.cms.message.errorRequest')});
            this.loading = false;
            reject(error);
          });
        });
      });
    },
    //Create Item
    createItem() {
      //Get formData
      let formData = this.$clone(this.form);
      //Add parentProdOptValId
      if (formData.parentOptionValueId) {
        let parentOptValue = this.options.parentValuesData.find(item => item.optionValueId == formData.parentOptionValueId);
        formData.parentProdOptValId = parentOptValue.id;
      }

      this.loading = true;
      let configName = 'apiRoutes.qcommerce.productOptionValues';
      this.$crud.create(configName, formData).then(response => {
        this.$alert.success({ message: this.$tr('isite.cms.message.recordCreated')});
        this.initForm();
        this.loading = false;
      }).catch(error => {
        this.$alert.error({ message: this.$tr('isite.cms.message.recordNoCreated')});
        this.loading = false;
      });
    },
    //Update Item
    updateItem() {
      this.loading = true;
      let configname = 'apiRoutes.qcommerce.productOptionValues';
      this.$crud.update(configname, this.modal.itemId, this.form).then(response => {
        this.$alert.success({ message: this.$tr('isite.cms.message.recordUpdated')});
        this.initForm();
        this.loading = false;
      }).catch(error => {
        this.$alert.error({ message: this.$tr('isite.cms.message.recordNoUpdated')});
        this.loading = false;
      });
    },
    //Delete Item
    deleteItem(itemId) {
      this.loading = true;
      let configName = 'apiRoutes.qcommerce.productOptionValues';
      this.$crud.delete(configName, itemId).then(response => {
        this.$alert.success({ message: this.$tr('isite.cms.message.recordDeleted')});
        this.initForm();
        this.loading = false;
      }).catch(error => {
        this.$alert.error({ message: this.$tr('isite.cms.message.recordNoDeleted')});
        this.loading = false;
      });
    },
    //Set data to item update
    setItemUpdate() {
      const itemId = this.$clone(this.modal.itemId);
      const item = this.table.data.find(item => item.id == itemId);
      this.form = Object.assign({}, this.form, item);
      this.modal.show = true;
    },
    //Get option values
    async getOptionValues() {
      this.loading = true;

      await Promise.all([
        //Get option values
        new Promise((resolve, reject) => {
          this.options.values = [];
          //Request params
          let requestParams = {
            refresh: true,
            params: { filter: { optionId: this.productOption.optionId } }
          };
          //Request
          this.$crud.index('apiRoutes.qcommerce.optionValues', requestParams).then(response => {
            //Set as options
            this.options.values = response.data.map(item => {
              return { label: item.description, id: item.id };
            });
            resolve(true);
          }).catch(error => {
            this.$apiResponse.handleError(error, () => {
              reject(error);
            });
          });
        }),
        //Get Parent Product option values
        new Promise((resolve, reject) => {
          this.options.parentValues = [];
          this.options.parentValuesData = [];
          //Validate parameters
          if (!this.productOption.parentOptionId) return resolve(true);
          //Request params
          let requestParams = {
            refresh: true,
            params: { filter: { productOptionId: this.productOption.parentId } }
          };
          //Request
          this.$crud.index('apiRoutes.qcommerce.productOptionValues', requestParams).then(response => {
            this.options.parentValuesData = this.$clone(response.data);
            //Set as options
            this.options.parentValues = response.data.map(item => {
              return { label: item.optionValue, value: item.optionValueId };
            });
            resolve(true);
          }).catch(error => {
            this.$apiResponse.handleError(error, () => {
              reject(error);
            });
          });
        })
      ]);

      //Close loading
      this.loading = false;
    }
  }
};
</script>
<style lang="scss">
#crudOptionValues {
  .input-title {
    color: #757575;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    min-height: 48px;
    padding: 15px 16px;
  }
}
</style>
