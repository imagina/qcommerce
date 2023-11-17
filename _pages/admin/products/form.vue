<template>
  <div id="productFormPage" ref="productFormPage">
    <!--Content-->
    <div class="productForm q-mb-lg backend-page row">
      <div class="col-12 col-lg-10 offset-lg-1 relative-position">
        <!--Page Actions-->
        <div class="box box-auto-height q-mb-md">
          <page-actions :title="pageTitle"/>
        </div>
        <!--Data-->
        <q-form autocorrect="off" autocomplete="off" ref="formContent"
                @submit="(!itemId && !field) ? createItem() : updateItem()"
                @validation-error="$alert.error($tr('isite.cms.message.formInvalid'))">
          <div class="row justify-center q-col-gutter-x-md" v-if="success">
            <!--Language-->
            <div class="col-12 q-mb-md">
              <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
            </div>
            <!--Form left-->
            <div class="col-12" v-if="locale.success">
              <div class="box">
                <!-- Product Title-->
                <div v-if="locale.formTemplate.name" class="box-title">
                  <q-icon name="fa-light fa-tags"/>
                  {{ locale.formTemplate.name }}
                  <q-separator class="q-my-md"/>
                </div>
                <!-- Tab information -->
                <div v-if="lastPanelOpen != 'home'">
                  <div class="box-title text-primary q-mb-xs">{{ $tr(modalForms[lastPanelOpen].title) }}</div>
                  <p class="text-body2">{{ $tr(modalForms[lastPanelOpen].content) }}</p>
                  <q-separator class="q-my-md" inset/>
                </div>
                <!-- form tabs-->
                <q-tab-panels v-model="lastPanelOpen" keep-alive animated class="rounded-borders q-pa-none">
                  <q-tab-panel name="home">
                    <div class="row q-col-gutter-md q-mb-md">
                      <div v-for="modalForm in modalForms" v-if="modalForm.type !== 'home'"
                           class="col-12 col-md-6 col-xl-4"
                           @click="() => showNewForm(modalForm.type)">
                        <div class="relative-position card">
                          <q-icon name="fal fa-edit" color="primary" class="absolute-right q-pr-md q-pt-md"/>
                          <div class="box-title text-primary q-mb-sm ">{{ $tr(modalForm.title) }}</div>
                          <p class="text-body2">{{ $tr(modalForm.content) }}</p>
                        </div>
                      </div>
                    </div>
                    <!-- Save Actions -->
                    <div class="text-right">
                      <!--Update button-->
                      <q-btn
                          v-if="productId" rounded unelevated outline
                          color="green" :loading="loading"
                          icon="fal fa-save" :label="$tr('isite.cms.label.update')" @click="updateItem()"
                      />
                      <!--Save button-->
                      <q-btn-dropdown :label="buttonActions.label" split v-else :loading="loading"
                                      content-style="min-width: 250px !important" unelevated outline
                                      color="green" icon="fal fa-save" @click="createItem()" rounded align="right">
                        <q-list link>
                          <q-item @click.native="buttonActions = {label : options.btn.saveAndReturn, value : 1}"
                                  v-close-popup>
                            {{ options.btn.saveAndReturn }}
                          </q-item>
                          <q-item @click.native="buttonActions = {label : options.btn.saveAndEdit, value : 2}"
                                  v-close-popup>
                            {{ options.btn.saveAndEdit }}
                          </q-item>
                          <q-item @click.native="buttonActions = {label : options.btn.saveAndCreate, value : 3}"
                                  v-close-popup>
                            {{ options.btn.saveAndCreate }}
                          </q-item>
                        </q-list>
                      </q-btn-dropdown>
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="content">
                    <!--name-->
                    <q-input v-model="locale.formTemplate.name" @input="setSlug()" outlined dense
                             data-testid="name"
                             :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                             :label="`${$tr('isite.cms.form.name')} (${locale.language})*`"/>
                    <!--Slug-->
                    <q-input v-model="locale.formTemplate.slug" outlined dense
                             data-testid="slug"
                             :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                             :label="`${$tr('isite.cms.form.slug')} (${locale.language})*`"/>
                    <!--Sumario-->
                    <q-input v-model="locale.formTemplate.summary" type="textarea" outlined dense
                             data-testid="summary"
                             :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                             :label="`${$tr('isite.cms.form.summary')} (${locale.language})*`" rows="3"/>
                    <!--Description-->
                    <div class="input-title">{{ `${$tr('isite.cms.form.description')} (${locale.language})*` }}</div>
                    <q-field v-model="locale.formTemplate.description" borderless
                             :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]">
                      <ck-editor v-model="locale.formTemplate.description" data-testid="description"/>
                      <q-editor v-if="false" v-model="locale.formTemplate.description" class="full-width"
                                :toolbar="editorText.toolbar" content-class="text-grey-9"
                                toolbar-text-color="grey-9"/>
                    </q-field>
                  </q-tab-panel>
                  <q-tab-panel name="status">
                    <q-select
                        :clearable="false"
                        emit-value map-options outlined dense
                        :label="$tr('isite.cms.form.status')"
                        :options="options.status"
                        v-model="locale.formTemplate.status"
                        data-testid="status"
                    />
                  </q-tab-panel>
                  <q-tab-panel name="categories">
                    <div class="relative-position text-right">
                      <!--Main category-->
                      <dynamic-field v-model="locale.formTemplate.categoryId" :field="dynamicFields.categoryId"/>
                      <!--Categories-->
                      <dynamic-field v-model="locale.formTemplate.categories"
                                     :field="dynamicFields.categories"/>
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="metaInfo">
                    <!--Meta Title-->
                    <q-input data-testid="metaTitle" v-model="locale.formTemplate.metaTitle" outlined dense
                             :label="`${$tr('isite.cms.form.metaTitle')} (${locale.language})`" class="q-m-b-sm"/>
                    <!--Meta Description-->
                    <q-input data-testid="metaDescription" v-model="locale.formTemplate.metaDescription"
                             type="textarea"
                             outlined dense
                             :label="`${$tr('isite.cms.form.metaDescription')} (${locale.language})`" rows="3"/>
                    <!--Custom url-->
                    <q-input data-testid="customUrl" v-model="locale.formTemplate.customUrl" outlined dense
                             :label="`${$tr('isite.cms.form.customUrl')}`">
                    </q-input>
                    <!--Quantity Class-->
                    <dynamic-field v-model="locale.formTemplate.tags" :field="dynamicFields.tags"/>
                  </q-tab-panel>
                  <q-tab-panel name="data">
                    <div class="row q-col-gutter-md q-pa-md">
                      <!--Left-->
                      <div class="col-12 col-md-6">
                        <!--reference-->
                        <q-input data-testid="reference" v-model="locale.formTemplate.reference" outlined dense
                                 :label="$tr('isite.cms.form.reference')"/>
                        <!--SKU-->
                        <q-input data-testid="sku" outlined dense v-model="locale.formTemplate.sku"
                                 :label="$tr('isite.cms.form.sku')"/>
                        <!--Price-->
                        <q-input data-testid="price" outlined dense type="number" v-model="locale.formTemplate.price"
                                 :label="$tr('isite.cms.form.price')" @input="calculateAllPriceLists"/>
                        <!--Price List Enable-->
                        <div class="full-width" v-if="priceListEnable">
                          <div class="row q-py-sm">
                            <div class="col-8">
                              {{ $tr('icommerce.cms.form.priceLists') }}
                            </div>
                            <div class="col-4 text-right">
                              <q-btn icon="fas fa-plus" color="green" size="sm"
                                     @click="()=> { locale.form.priceLists.push({price: 0, priceListId: null}) }">
                                <q-tooltip>
                                  {{ $tr('isite.cms.label.add') }}
                                </q-tooltip>
                              </q-btn>
                            </div>
                          </div>
                          <div class="row q-col-gutter-md q-pt-md"
                               v-for="(list, i) in locale.formTemplate.priceLists">
                            <div class="col-6">
                              <dynamic-field :field="dynamicFields.priceLists" v-model="list.priceListId"
                                             @input="list.price = calculatePriceFromlist(list.priceListId)"/>
                            </div>
                            <div class="col-4">
                              <q-input data-testid="price" v-model="list.price" outlined dense
                                       :label="$tr('isite.cms.form.price')" type="number"
                                       :readonly="checkPriceList(list.priceListId)"
                                       :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"/>
                            </div>
                            <div class="col-2 text-right">
                              <q-btn icon="fas fa-trash" color="red" size="sm" class="q-mt-sm"
                                     @click="locale.form.priceLists.splice(i,1)">
                                <q-tooltip>
                                  {{ $tr('isite.cms.label.delete') }}
                                </q-tooltip>
                              </q-btn>
                            </div>
                          </div>
                        </div>
                        <!--Quantity-->
                        <q-input data-testid="quantity" outlined dense v-model="locale.formTemplate.quantity"
                                 :label="$tr('isite.cms.form.quantity')" type="number"/>
                        <!--Quantity Class-->
                        <dynamic-field v-model="locale.formTemplate.quantityClassId" :field="dynamicFields.quantityClassId"/>
                        <!--minimum-->
                        <q-input data-testid="minimumOrder" :label="$tr('icommerce.cms.form.minimumOrder')"
                                 outlined dense
                                 type="number" v-model="locale.formTemplate.minimum"/>
                        <!--Status-->
                        <div class="input-title">{{ $tr('isite.cms.form.stock') }}</div>
                        <tree-select
                            data-testid="stockStatus"
                            :clearable="false"
                            :append-to-body="true"
                            :options="options.stockStatus"
                            value-consists-of="BRANCH_PRIORITY"
                            v-model="locale.formTemplate.stockStatus"
                            class="q-mb-md"
                        />
                        <!--sortOrder-->
                        <q-input data-testid="sortOrder" :label="$tr('icommerce.cms.form.sortOrder')"
                                 outlined dense
                                 type="number" v-model="locale.formTemplate.sortOrder"/>
                      </div>
                      <!--Right-->
                      <div class="col-12 col-md-6">
                        <!--availability date-->
                        <dynamic-field v-model="locale.formTemplate.dateAvailable"
                                       :field="dynamicFields.dateAvailable"/>
                        <!--Points-->
                        <q-input data-testid="points" v-model="locale.formTemplate.points" outlined dense
                                 :label="$trp('isite.cms.form.point')"/>
                        <!--Dimensions-->
                        <div class="row q-col-gutter-xs">
                          <!--length-->
                          <div class="col-xs-12 col-sm-4">
                            <q-input data-testid="length" v-model="locale.formTemplate.length"
                                     :label="$tr('isite.cms.form.length')"
                                     outlined dense type="number"/>
                          </div>
                          <!--width-->
                          <div class="col-xs-12 col-sm-4">
                            <q-input data-testid="width" v-model="locale.formTemplate.width"
                                     :label="$tr('isite.cms.form.width')"
                                     outlined dense type="number"/>
                          </div>
                          <!--height-->
                          <div class="col-xs-12 col-sm-4">
                            <q-input data-testid="height" v-model="locale.formTemplate.height"
                                     :label="$tr('isite.cms.form.height')"
                                     outlined dense type="number"/>
                          </div>
                        </div>
                        <!--Lenght Class-->
                        <dynamic-field v-model="locale.formTemplate.lengthClassId" :field="dynamicFields.lengthClassId"/>
                        <!--weight-->
                        <q-input data-testid="weight" v-model="locale.formTemplate.weight"
                                 :label="$tr('isite.cms.form.weight')"
                                 outlined dense type="number"/>
                        <!--Weight Class-->
                        <dynamic-field v-model="locale.formTemplate.weightClassId" :field="dynamicFields.weightClassId"/>

                        <!--Order Weight-->
                        <q-input data-testid="orderWeight" :label="$tr('icommerce.cms.form.orderWeight')" outlined
                                 dense
                                 v-model="locale.formTemplate.orderWeight"/>
                        <!--volume-->
                        <q-input data-testid="weight" v-model="locale.formTemplate.volume"
                                 :label="$tr('icommerce.cms.form.volume')"
                                 outlined dense type="number"/>
                        <!--Volume Class-->
                        <dynamic-field v-model="locale.formTemplate.volumeClassId" :field="dynamicFields.volumeClassId"/>
                        <!--Requires shipping-->
                        <q-toggle
                            data-testid="shipping"
                            v-model="locale.formTemplate.shipping"
                            :true-value="true"
                            :false-value="false"
                            :label="$tr('icommerce.cms.form.requriedShipping')"
                            color="primary"
                        />
                        <br>
                        <!--Free shipping-->
                        <q-toggle
                            data-testid="freeShipping"
                            v-model="locale.formTemplate.freeshipping"
                            :true-value="true"
                            :false-value="false"
                            :label="$tr('icommerce.cms.form.freeShipping')"
                            color="primary"
                        />
                        <br>
                        <!--Substrac from Stock-->
                        <q-toggle
                            data-testid="subtract"
                            v-model="locale.formTemplate.subtract"
                            :true-value="true"
                            :false-value="false"
                            :label="$tr('icommerce.cms.form.subtractFromStock')"
                            color="primary"
                        />
                        <br>
                        <!--featured-->
                        <q-toggle
                            data-testid="subtract"
                            v-model="locale.formTemplate.featured"
                            true-value="1"
                            false-value="0"
                            :label="$tr('icommerce.cms.form.featured')"
                            color="primary"
                        />
                        <br/>
                        <!--is call-->
                        <q-toggle
                            data-testid="isCall"
                            v-model="locale.formTemplate.isCall"
                            true-value="1"
                            false-value="0"
                            :label="$tr('icommerce.cms.form.isCall')"
                            color="primary"
                        />
                        <br>
                        <!--Show price when is call-->
                        <q-toggle
                            data-testid="showPriceIsCall"
                            v-model="locale.formTemplate.showPriceIsCall"
                            true-value="1"
                            false-value="0"
                            :label="$tr('icommerce.cms.form.showPriceIsCall')"
                            color="primary"
                        />
                        <!--Extra fields-->
                        <div v-for="(field, key) in  extraFields" :key="key" :ref="key">
                          <!--Dynamic fake field-->
                          <dynamic-field
                              v-model="locale.formTemplate[field.fakeFieldName || 'options'][field.name || key]"
                              :key="key" v-if="field.isFakeField || field.fakeFieldName"
                              :field="{...field, testId : (field.testId || field.name || key)}"
                              :language="locale.language" :item-id="productId"
                              :ref="`field-${field.name || key}`"/>
                          <!--Dynamic field-->
                          <dynamic-field v-model="locale.formTemplate[field.name || key]" :key="key"
                                         :field="{...field, testId : (field.testId  || field.name || key)}"
                                         :language="locale.language" :item-id="productId"
                                         :ref="`field-${field.name || key}`"
                                         v-if="!field.isFakeField && !field.fakeFieldName"/>
                        </div>
                      </div>
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="relations">
                    <div class="q-pa-md">
                      <!--Record Master-->
                      <div v-if="canManageRecordMaster" class="q-mb-md">
                        <div class="input-title">
                          {{ `${$tr('isite.cms.form.masterRecord')}` }}
                        </div>
                        <tree-select
                            data-testid="masterRecord"
                            :clearable="false"
                            :append-to-body="true"
                            v-model="locale.formTemplate.options.masterRecord"
                            :options="[
                                      {label: this.$tr('isite.cms.label.yes'), id: 1},
                                      {label: this.$tr('isite.cms.label.no'), id: 0},
                                    ]"
                            placeholder=""
                        />
                      </div>
                      <!--Crud item types-->
                      <crud :crud-data="import('@imagina/qcommerce/_crud/itemTypes')"
                            type="select"
                            :crud-props="{label:`${$tr('icommerce.cms.form.itemType')}`, 'data-testid': 'itemTypeId'}"
                            v-model="locale.formTemplate.itemTypeId"
                            :config="{options: {label: 'title', value: 'id'}}"
                            v-if="false"
                      />
                      <!--Crud manufacturer-->
                      <crud :crud-data="import('@imagina/qcommerce/_crud/taxClasses')"
                            type="select"
                            :crud-props="{label:`${$tr('icommerce.cms.form.taxClass')}`, 'data-testid': 'taxClassId'}"
                            v-model="locale.formTemplate.taxClassId"
                            :config="{options: {label: 'name', value: 'id'}}"
                            v-if="$auth.hasAccess('icommerce.taxclasses.manage')"
                      />
                      <!--Crud manufacturer-->
                      <crud :crud-data="import('@imagina/qcommerce/_crud/manufacturers')"
                            type="select"
                            :crud-props="{label:`${$tr('icommerce.cms.form.manufacturer')}`,'data-testid': 'manufacturerId', clearable : true}"
                            v-model="locale.formTemplate.manufacturerId"
                            :config="{options: {label: 'name', value: 'id'}}"
                      />
                      <!--Parent-->
                      <div class="input-title" v-if="false">{{ `${$tr('isite.cms.form.parent')}` }}</div>
                      <tree-select
                          data-testid="parentId"
                          v-model="locale.formTemplate.parentId"
                          :async="true"
                          :append-to-body="true"
                          class="q-mb-md"
                          :load-options="searchProducts"
                          :default-options="optionsTemplate.products"
                          placeholder=""
                          label="name"
                          v-if="false"
                      />
                      <!--Related Products-->
                      <div class="input-title">{{ $tr('icommerce.cms.form.relatedProducts') }}</div>
                      <tree-select
                          data-testid="relatedProducts"
                          v-model="locale.formTemplate.relatedProducts"
                          :async="true"
                          :multiple="true"
                          :append-to-body="true"
                          :load-options="searchProducts"
                          :default-options="optionsTemplate.relatedProducts"
                          placeholder=""
                          label="name"
                      />
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="images">
                    <div class="q-pa-md">
                      <!--Video-->
                      <q-input data-testid="optionsVideo" v-model="locale.formTemplate.options.video" outlined dense
                               :label="$tr('isite.cms.form.video')"/>
                      <dynamic-field v-model="locale.formTemplate.mediasSingle" :field="dynamicFields.mainImage"
                                     :item-id="productId"/>
                      <dynamic-field v-model="locale.formTemplate.mediasMulti" :field="dynamicFields.gallery"
                                     :item-id="productId"/>
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="options">
                    <q-card>
                      <q-card-section class="q-pa-sm">
                        <div class="q-pa-sm">
                          <crud-options :productId="productId" v-if="productId"/>
                          <div v-else class="text-center">
                            <div class="q-my-md">
                              <q-icon name="fas fa-exclamation-triangle" color="warning"></q-icon>
                              {{ `${$tr('icommerce.cms.message.warnAddOpt')}...` }}
                            </div>
                            <q-btn icon="fas fa-save" :label="options.btn.saveAndEdit" rounded unelevated
                                   @click="buttonActions.value = 4, createItem()" color="green"/>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                  <q-tab-panel name="discount">
                    <q-card>
                      <q-card-section class="q-pa-sm">
                        <div class="full-width">
                          <div class="q-pa-sm" v-if="productId">
                            <crud
                                :crud-data="import('@imagina/qcommerce/_crud/productDiscounts')"
                                :custom-data="{read: {requestParams: {include: 'department', filter: {productId: productId} } }, formRight:{productId: {value: productId} } }"
                            />
                          </div>
                          <div v-else class="text-center q-pa-sm">
                            <div class="q-my-md">
                              <q-icon name="fas fa-exclamation-triangle" color="warning"></q-icon>
                              {{ `${$tr('icommerce.cms.message.warnAddDiscount')}...` }}
                            </div>
                            <q-btn icon="fas fa-save" :label="options.btn.saveAndEdit" rounded unelevated
                                   @click="buttonActions.value = 4, createItem()" color="green"/>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                </q-tab-panels>
                <!-- Back action -->
                <div v-if="lastPanelOpen != 'home'" class="q-px-md text-right">
                  <q-btn outline rounded color="green" :label="$tr('isite.cms.label.back')"
                         icon="fal fa-arrow-left" @click="() => backHomePanel()"/>
                </div>
              </div>
            </div>
          </div>
        </q-form>
        <!--Loading-->
        <inner-loading :visible="loading"/>
      </div>
    </div>
  </div>
</template>

<script>
import recursiveList from '@imagina/qsite/_components/master/recursiveListSelect'
import crudOptions from '@imagina/qcommerce/_components/admin/products/crudOptions'
import ckEditor from '@imagina/qsite/_components/master/ckEditor'
//Plugins
import {scroll} from 'quasar'

const {getScrollTarget, setScrollPosition} = scroll

export default {
  components: {
    crudOptions,
    recursiveList,
    ckEditor
  },
  watch: {
    $route(to, from) {
      this.initForm()
    },
    'locale.formTemplate.categoryId'(newValue) {
      setTimeout(() => {
        if (this.locale.formTemplate && this.locale.formTemplate.categories && newValue) {
          let categories = this.$clone(this.locale.formTemplate.categories)//Get catgeories
          if ((categories.indexOf(newValue.toString()) == -1) && (categories.indexOf(newValue) == -1)) {
            categories.push(this.$clone(newValue))
          }
          this.locale.formTemplate.categories = this.$clone(categories)
        }
      }, 500)
    },
    'locale.formTemplate.slug'(newValue) {
      if (newValue) {
        let replaced = this.$clone(this.$helper.getSlug(newValue))
        if (newValue != replaced) this.locale.formTemplate.slug = this.$clone(replaced)
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.initForm()
      this.$root.$on('page.data.refresh', () => this.initForm())//Listen refresh event
      const path = this.$route.path.split("/");
      const lastChildPath = path[path.length - 2];
      if (lastChildPath === 'create') this.isCreateMode = true;
    })
  },
  data() {
    return {
      isCreateMode: false,
      locale: {},
      vTab: 'tab-data',
      loading: false,
      loadingCategory: false,
      success: false,
      productId: false,
      editorText: {
        toolbar: [
          ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
          ['link'],
          [
            {
              label: 'Font Size',
              icon: 'format_size',
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
            }
          ],
          ['quote', 'unordered', 'ordered'],
          ['fullscreen']
        ]
      },
      optionsTemplate: {
        categories: [],
        products: [],
        relatedProducts: [],
        priceLists: [],
        savedPriceLists: [],
      },
      buttonActions: {label: '', value: 1},
      modalShow: {
        category: false
      },
      priceListEnable: this.$auth.hasAccess('icommercepricelist.pricelists.manage'),
      extraFields: [],
      modalForms: {
        content: {
          show: false,
          type: 'content',
          title: this.$tr('icommerce.cms.form.content'),
          content: this.$tr('icommerce.cms.form.formContent'),
        },
        status: {
          show: false,
          type: 'status',
          title: this.$tr('icommerce.cms.form.status'),
          content: this.$tr('icommerce.cms.form.statusContent'),
        },
        categories: {
          show: false,
          type: 'categories',
          title: this.$tr('icommerce.cms.form.categories'),
          content: this.$tr('icommerce.cms.form.categoriesContent'),
        },
        metaInfo: {
          show: false,
          type: 'metaInfo',
          title: this.$tr('icommerce.cms.form.metaInfo'),
          content: this.$tr('icommerce.cms.form.metaInfoContent'),
        },
        data: {
          show: false,
          type: 'data',
          title: this.$tr('icommerce.cms.form.data'),
          content: this.$tr('icommerce.cms.form.dataContent'),
        },
        relations: {
          show: false,
          type: 'relations',
          title: this.$tr('icommerce.cms.form.link'),
          content: this.$tr('icommerce.cms.form.relationsContent'),
        },
        images: {
          show: false,
          type: 'images',
          title: this.$tr('icommerce.cms.form.images'),
          content: this.$tr('icommerce.cms.form.imagesContent'),
        },
        options: {
          show: false,
          type: 'options',
          title: this.$tr('icommerce.cms.form.options'),
          content: this.$tr('icommerce.cms.form.optionsContent'),
        },
        discount: {
          show: false,
          type: 'discount',
          title: this.$tr('icommerce.cms.form.discount'),
          content: this.$tr('icommerce.cms.form.discountContent'),
        },
        home: {
          show: false,
          type: 'home',
          title: '',
          content: '',
        }
      },
      lastPanelOpen: 'home'
    }
  },
  computed: {
    modalTemplatesAttributes() {
      return {
        customPosition: true,
        title: `${this.modalForms[this.lastPanelOpen].title}`,
        actions: [
          {
            props: {
              label: this.$tr('isite.cms.label.close'),
              color: "green",
              rounded: true,
              icon: 'fal fa-fill-drip',
            },
            action: () => {
              this.modalForms[this.lastPanelOpen].show = false;
            }
          }
        ]
      }
    },
    //Page title
    pageTitle() {
      const useLegacyStructure = parseInt(this.$store.getters['qsiteApp/getSettingValueByName']('isite::legacyStructureCMS') || 0)
      return useLegacyStructure ? this.$tr(this.$route.meta.title) : this.$route.meta.title
    },
    dataLocale() {
      return {
        fields: {
          parentId: '',
          status: 1,
          categoryId: 0,
          categories: [],
          addedById: this.$store.state.quserAuth.userId,
          sku: 0,
          quantity: 1,
          stockStatus: 1,
          price: 0,
          dateAvailable: null,
          weight: 0,
          length: 0,
          width: 0,
          height: 0,
          volume: 0,
          minimum: 1,
          reference: '',
          shipping: false,
          showPriceIsCall: false,
          subtract: false,
          freeshipping: false,
          orderWeight: 0,
          rating: 3,
          points: 0,
          relatedProducts: [],
          tags: [],
          productOptions: [],
          discounts: [],
          priceLists: [],
          mediasSingle: {},
          mediasMulti: {},
          options: {
            masterRecord: 0,
            video: null
          },
          taxClassId: null,
          weightClassId: null,
          lengthClassId: null,
          volumeClassId: null,
          quantityClassId: null,
          tags: [],
          manufacturerId: null,
          metaTitle: '',
          metaDescription: '',
          featured: '0',
          isCall: '0',
          sortOrder: '0',
          itemTypeId: 1,
          customUrl: ''
        },
        fieldsTranslatable: {
          name: '',
          slug: '',
          summary: '',
          description: '',
          metaTitle: '',
          metaDescription: '',
        },
      }
    },
    //Check if update options
    updateOptions() {
      if (this.$route.params.editOptions) {
        setTimeout(() => {
          this.vTab = 'tab-options'
          let target = getScrollTarget(this.$refs.productFormPage)
          let offset = this.$refs.productFormPage.scrollHeight
          setScrollPosition(target, offset, 1000)
        }, 500)
      }
    },
    //Options translatables
    options() {
      return {
        status: [
          {label: this.$tr('isite.cms.label.enabled'), value: 1},
          {label: this.$tr('isite.cms.label.disabled'), value: 0}
        ],
        stockStatus: [
          {label: this.$tr('isite.cms.label.available'), id: 1},
          {label: this.$tr('isite.cms.label.soldOut'), id: 0}
        ],
        btn: {
          saveAndReturn: this.$tr('isite.cms.message.saveAndReturn'),
          saveAndEdit: this.$tr('isite.cms.message.saveAndEdit'),
          saveAndCreate: this.$tr('isite.cms.message.saveAndCreate'),
        }
      }
    },
    //Has manage master record
    canManageRecordMaster() {
      let response = true

      if (this.productId && !this.$auth.hasAccess('isite.master.records.edit')) {
        response = false
        //Validate if record is master
        let record = this.locale.formTemplate
        if (record && record.options && parseInt(record.options.masterRecord)) {
          this.$router.push({name: 'app.home'})
        }
      }
      if (!this.productId && !this.$auth.hasAccess('isite.master.records.create')) {
        response = false
      }

      return response
    },
    //Dynamic fields
    dynamicFields() {
      return {
        discounts: {
          value: null,
          type: 'select',
          testId: 'discounts',
          props: {
            label: this.$tr('icommerce.cms.form.discount') + '*',
            rules: [val => !!val || this.$tr('isite.cms.message.fieldRequired')],
            clearable: true,
            multiple: true,
          },
          loadOptions: {
            apiRoute: 'apiRoutes.qdiscountable.discounts',
            select: {label: 'name', id: 'id'}
          }
        },
        priceLists: {
          value: null,
          type: 'select',
          testId: 'priceLists',
          props: {
            label: this.$tr('icommerce.cms.form.priceLists') + '*',
            rules: [val => !!val || this.$tr('isite.cms.message.fieldRequired')],
          },
          loadOptions: {
            apiRoute: 'apiRoutes.qcommerce.priceLists',
            select: {label: 'name', id: 'id'}
          }
        },
        tags: {
            value: [],
            type: 'select',
            //isTranslatable: true,
            props: {
              label: this.$trp('isite.cms.form.tag'),
              useInput: true,
              useChips: true,
              multiple: true,
              hideDropdownIcon: true,
              inputDebounce: "0",
              newValueMode: "add-unique"
            }
          },
        categoryId: {
          value: null,
          type: 'crud',
          props: {
            crudType: 'select',
            crudData: import('@imagina/qcommerce/_crud/productCategories'),
            customData: {
              read: {
                requestParams: {include: 'parent', refresh: true}
              }
            },
            crudProps: {
              label: `${this.$tr('isite.cms.form.category')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
        },
         quantityClassId: {
          value: null,
          type: 'crud',
          props: {
            crudType: 'select',
            crudData: import('@imagina/qcommerce/_crud/quantityClasses'),

            crudProps: {
              label: `${this.$tr('icommerce.cms.sidebar.quantityClasses')}`
            },
          },
        },
        weightClassId: {
          value: null,
          type: 'crud',
          props: {
            crudType: 'select',
            crudData: import('@imagina/qcommerce/_crud/weightClasses'),

            crudProps: {
              label: `${this.$tr('icommerce.cms.sidebar.weightClasses')}`
            },
          },
        },
        lengthClassId: {
          value: null,
          type: 'crud',
          props: {
            crudType: 'select',
            crudData: import('@imagina/qcommerce/_crud/lengthClasses'),

            crudProps: {
              label: `${this.$tr('icommerce.cms.sidebar.lengthClasses')}`
            },
          },
        },
        volumeClassId: {
          value: null,
          type: 'crud',
          props: {
            crudType: 'select',
            crudData: import('@imagina/qcommerce/_crud/volumeClasses'),

            crudProps: {
              label: `${this.$tr('icommerce.cms.sidebar.volumeClasses')}`
            },
          },
        },
        categories: {
          value: [],
          type: 'crud',
          props: {
            crudType: 'select',
            crudData: import('@imagina/qcommerce/_crud/productCategories'),
            customData: {
              read: {
                requestParams: {include: 'parent', refresh: true}
              }
            },
            crudProps: {
              label: this.$trp('isite.cms.form.category'),
              multiple: true,
              useChips: true,
            },
          },
        },
        mainImage: {
          type: 'media',
          props: {
            label: this.$tr('isite.cms.form.image'),
            zone: 'mainimage',
            entity: 'Modules\\Icommerce\\Entities\\Product',
            entityId: this.productId ? this.productId : null
          }
        },
        gallery: {
          type: 'media',
          props: {
            label: this.$tr('isite.cms.form.gallery'),
            zone: 'gallery',
            entity: 'Modules\\Icommerce\\Entities\\Product',
            entityId: this.productId ? this.productId : null
          }
        },
        dateAvailable: {
          value: this.$moment().format('YYYY/MM/DD'),
          type: 'date',
          props: {
            label: this.$tr('icommerce.cms.form.availableDate')
          }
        }
      }
    }
  },
  methods: {
    //validate fields from home tab
    async validateFieldsHomeTab() {
      const {name, slug, summary, description, categoryId, categories} = this.locale.formTemplate;
      if (name.trim() === '' || slug.trim() === '' || summary.trim() === '' || description.trim() === '' || categoryId === 0 || categories.length === 0) return false;
      return true
    },
    //back to home panel
    async backHomePanel() {
      if (await this.$refs.localeComponent.validateForm()) {
        this.lastPanelOpen = 'home';
      }
    },
    //set new panel
    showNewForm(keyForm) {
      this.lastPanelOpen = keyForm;
      this.modalForms[keyForm].show = true;
    },
    //Init Form
    async initForm() {
      this.loading = true
      this.success = false//Disable status of page
      this.vTab = 'tab-data'
      this.buttonActions = {label: this.options.btn.saveAndReturn, value: 1}
      await this.orderFields()//Order field to locale
      this.productId = this.$route.params.id//Update param from route
      if (this.locale.success) this.$refs.localeComponent.vReset()//Reset locale
      await this.getData()//Get Data Item
      //await this.getCategories()//Get categories
      if (this.priceListEnable)
        await this.getPriceLists()//Get Price lists
      this.success = true//Activate status of page
      this.updateOptions
      this.loading = false
    },
    //Get product categories
    getCategories() {
      return new Promise((resolve, reject) => {
        this.loadingCategory = true
        let configName = 'apiRoutes.qcommerce.categories'
        let params = {//Params to request
          refresh: true,
          params: {include: 'parent'},
        }

        //Request
        this.$crud.index(configName, params).then(response => {
          this.optionsTemplate.categories = this.$array.tree(response.data)
          //this.locale.fields.categoryId = response.data.length ? response.data[0].id : null
          this.loadingCategory = false
          resolve(true)
        }).catch(error => {
          this.$apiResponse.handleError(error, () => {
            this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
            this.loadingCategory = false
            reject(true)
          })
        })
      })
    },
    //Get product categories
    getPriceLists() {
      let configName = 'apiRoutes.qcommerce.priceLists'
      let params = {//Params to request
        refresh: true,
      }
      //Request
      this.$crud.index(configName, params).then(response => {
        this.priceListEnable = true
        this.optionsTemplate.priceLists = response.data
        //this.locale.fields.categoryId = response.data.length ? response.data[0].id : null
      }).catch(error => {
        this.$apiResponse.handleError(error, () => {
          this.priceListEnable = false
        })
      })
    },
    //Get product if is edit
    getData() {
      return new Promise((resolve, reject) => {
        const productId = this.$clone(this.productId)
        if (productId) {
          let configName = 'apiRoutes.qcommerce.products'
          //Params
          let params = {
            refresh: true,
            params: {
              include: 'relatedProducts,categories,category,parent,discounts,manufacturer,priceLists',
              filter: {allTranslations: true}
            }
          }
          //Request
          this.$crud.show(configName, productId, params).then(response => {
            this.orderDataItemToLocale(response.data)
            resolve(true)//Resolve
          }).catch(error => {
            this.$apiResponse.handleError(error, () => {
              this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
              console.error(error)
              this.loading = false
              reject(false)//Resolve
            })
          })
        } else {
          resolve(true)//Resolve
        }
      })
    },
    //order data item to locale component
    orderDataItemToLocale(data) {
      let orderData = this.$clone(data)
      //Set default Parent options
      if (data.parent) this.optionsTemplate.products = this.$array.tree([data.parent], {label: 'name', id: 'id'})
      //Order categories
      orderData.categories.forEach((item, key) => {
        orderData.categories[key] = item.id
      })
      //Order related products
      orderData.relatedProducts.forEach((item, key) => {
        orderData.relatedProducts[key] = item.id
      })
      if (orderData.priceLists) {
        orderData.priceLists.forEach((item, key) => {
          orderData.priceLists[key] = {priceListId: item.id, price: item.price}
        })
      }

      //Set default related products options
      if (data.relatedProducts && data.relatedProducts.length) {
        this.optionsTemplate.relatedProducts = this.$array.tree(data.relatedProducts, {label: 'name', id: 'id'})
      }
      this.locale.form = this.$clone({
        ...orderData,
        dateAvailable: orderData.dateAvailable ? orderData.dateAvailable.replaceAll("-", "/") : this.$moment().format('YYYY/MM/DD')
      })
      this.calculateAllPriceLists()
      setTimeout(() => {
        /*this.locale.formTemplate.categoryId = orderData.categoryId
        this.locale.formTemplate.taxClassId = orderData.taxClassId
        this.locale.formTemplate.parentId = orderData.parentId
        this.locale.formTemplate.manufacturerId = orderData.manufacturerId*/
      }, 3000)
    },
    //Create Product
    async createItem() {
      if (await this.validateFieldsHomeTab()) {
        this.loading = true
        let configName = 'apiRoutes.qcommerce.products'
        this.$crud.create(configName, this.getDataForm()).then(response => {
          this.$alert.success({message: `${this.$tr('isite.cms.message.recordCreated')} ID: ${response.data.id}`})
          this.actionAfterCreated(response.data.id)
        }).catch(error => {
          this.loading = false
          this.$alert.error({message: this.$tr('isite.cms.message.recordNoCreated'), pos: 'bottom'})
        })
      } else {
        this.$alert.error({message: this.$tr('isite.cms.message.formInvalid')})
      }
    },
    //Update Product
    async updateItem() {
      if (await this.validateFieldsHomeTab()) {
        this.loading = true
        let configName = 'apiRoutes.qcommerce.products'
        let requestData = {...this.getDataForm(), id: this.productId}
        this.$crud.update(configName, this.productId, requestData).then(response => {
          this.$alert.success({message: `${this.$tr('isite.cms.message.recordUpdated')}`})
          this.$router.push({name: 'qcommerce.admin.products.index'})
          this.initForm()
        }).catch(error => {
          this.loading = false
          this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated'), pos: 'bottom'})
        })
      } else {
        this.$alert.error({message: this.$tr('isite.cms.message.formInvalid')})
      }
    },
    //Get just values not null from form
    getDataForm() {
      let response = this.locale.form
      for (var item in response) {
        let valueItem = response[item]
        if (valueItem == null || valueItem == undefined) {
          delete response[item]
        }
      }
      return {...response, manufacturerId: this.locale.form.manufacturerId || null}
    },
    //Action after created
    actionAfterCreated(id) {
      setTimeout(() => {
        let action = this.buttonActions.value
        switch (action) {
          case 1://redirect to index products
            this.$router.push({name: 'qcommerce.admin.products.index'})
            break
          case 2://Redirect to update this product
            this.$router.push({name: 'qcommerce.admin.products.edit', params: {id: id}})
            this.loading = false
            break
          case 3://Reset and init form
            this.$refs.localeComponent.vReset()
            this.loading = false
            break
          case 4://Redirect to update this product and options
            this.$router.push({
              name: 'qcommerce.admin.products.edit',
              params: {id: id, editOptions: 1},
            })
            this.loading = false
            break
        }
      }, 2000)
    },
    //Search products
    searchProducts({action, searchQuery, callback}) {
      if (action === 'ASYNC_SEARCH') {
        let configName = 'apiRoutes.qcommerce.products'
        let params = {//Params to request
          params: {filter: {search: searchQuery}},
        }
        //Request
        this.$crud.index(configName, params).then(response => {
          callback(null, this.$array.tree(response.data, {label: 'name', id: 'id'}))
        }).catch(error => {
          this.$apiResponse.handleError(error, () => {
            this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
          })
        })
      }
    },
    //Complete slug Only when is creation
    setSlug() {
      if (!this.productId) {
        let title = this.$clone(this.locale.formTemplate.name)
        this.locale.formTemplate.slug = this.$clone(this.$helper.getSlug(title))
      }
    },
    checkPriceList(id = null) {
      if (id) {
        let selectedPriceList = this.$array.findByTag(this.optionsTemplate.priceLists, 'id', id)
        return selectedPriceList.criteria == 'percentage'
      }
      return false
    },
    calculatePriceFromlist(id = null) {
      if (id) {
        let selectedPriceList = this.$array.findByTag(this.optionsTemplate.priceLists, 'id', id)
        let price = parseInt(this.$clone(this.locale.form.price))
        if (selectedPriceList.criteria == 'percentage') {
          if (selectedPriceList.operationPrefix == '-') {
            return price - (price * (selectedPriceList.value / 100))
          } else {
            return price + (price * (selectedPriceList.value / 100))
          }
        } else {
          let selectedPriceList = this.$array.findByTag(this.optionsTemplate.savedPriceLists, 'priceListId', id)
          return selectedPriceList.price
        }
      }
      return 0
    },
    calculateAllPriceLists() {
      if (this.locale.form.priceLists) {
        if (this.locale.form.priceLists.length > 0) {
          this.optionsTemplate.savedPriceLists = this.locale.form.priceLists
          let priceLists = this.locale.form.priceLists.map(item => {
            return {
              priceListId: item.priceListId,
              price: this.calculatePriceFromlist(item.priceListId)
            }
          })
          this.locale.form.priceLists = priceLists
        }
      }
    },
    //Get extra fields
    getExtraFields() {
      return new Promise((resolve, reject) => {
        //Request params
        let requestParams = {
          refresh: true,
          params: {filter: {configName: 'icommerce.crud-fields.products'}}
        }
        //Request
        this.$crud.index('apiRoutes.qsite.configs', requestParams).then(response => {
          //Add response to form
          if (response.data && Object.keys(response.data).length) this.extraFields = this.$clone(response.data)
          //Response
          resolve(response.data)
        }).catch(error => {
          this.$apiResponse.handleError(error, () => {
            reject(error)
          })
        })
      })
    },
    //Order fields
    orderFields() {
      return new Promise(async resolve => {
        let dataLocale = this.$clone(this.dataLocale)
        //Get extra fields
        await this.getExtraFields()

        //Assign each field by type (translatable, fake field, just field) and validation
        Object.keys(this.extraFields).forEach((key) => {
          let field = this.extraFields[key]
          //Validate field permission
          if (field.permission && !this.$auth.hasAccess(field.permission)) return
          //Add to data locale to field
          if (field.isTranslatable) {
            dataLocale.fieldsTranslatable[field.name || key] = field.value
          } else if (field.isFakeField) {
            dataLocale.fields.options[field.name || key] = field.value
          } else if (field.fakeFieldName) {
            if (!dataLocale.fields[field.fakeFieldName]) dataLocale.fields[field.fakeFieldName] = {}
            dataLocale.fields[field.fakeFieldName][field.name || key] = field.value
          } else {
            dataLocale.fields[field.name || key] = field.value
          }
        })

        this.locale = this.$clone(dataLocale)//Add fields
        return resolve(true)
      })
    }
  }
}
</script>

<style lang="stylus">
.productForm
  .q-tab-panel
    padding 0

  .card {
    min-height: 160px;
    border: 1px solid #ddd;
    border-radius: $custom-radius
    cursor pointer
    padding 15px
  }

  .edit {
    position: absolute;
    right: 0
  }

  #mediaForm
    .col-12.col-md-6.relative-position
    .col-12.col-md-6.relative-position
      height: 200px
      text-align center
      padding 10px
      margin 0 5px
      border-radius 5px
      @media (min-width: 1024px)
        width: 16.666666666666666667% !important

      .img-fluid
        width auto
        height 100%

    .q-scrollarea
      height 200px !important

      .column
        height 200px
        padding 10px
        margin 0 5px
        border: 1px solid rgba(0, 0, 0, 0.12)
        border-radius 5px

        .image-multiple
          background-repeat no-repeat
          background-size 100% auto
          background-position center center
          height 100%
          overflow hidden

  .label
    text-transform capitalize
</style>
