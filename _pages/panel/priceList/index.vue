<template>
  <div id="panelPriceList" class="q-pa-md relative-position">
    <!--Page Actions-->
    <div class="q-mb-md box box-auto-height" >
      <page-actions :title="$tr($route.meta.title)" :extra-actions="extraActions" @search="searchPriceList"
                    @refresh="refreshData(true)" :exclude-actions="excludeActions" />
    </div>

    <div class="row col-12 q-col-gutter-md" v-if="infoRedirect.show">
      <dynamic-field v-for="(field, name) in infoRedirect.fields" :key="name"
                     :field="field" class="col-12"/>
    </div>

    <div id="print">
      <div class="text-center show-print q-pb-sm custom-border">
        <img id="logoPriceList" height="150" :src="contactData.img">
      </div>
      <!--Content-->
      <div class="relative-position q-mt-md price-list">
        <template v-if="!loading">
          <div v-for="priceList in priceLists" :key="priceList.id" class="q-mt-xs price-list__content">
            <a class="text-center text-primary show-print title" :href="priceList.url"
               target="_blank">{{ priceList.title }}</a>
            <q-toolbar class="bg-primary text-white no-print">
              <q-toolbar-title class="text-body1">{{ priceList.title }}</q-toolbar-title>
            </q-toolbar>

            <q-list bordered>
              <q-item v-for="product in priceList.ownProducts" :key="product.id" class="q-py-none" clickable v-ripple
                      tag="a" :href="product.url" target="_blank">
                <q-item-section>
                  <q-item-label class="text-body2">{{ product.name }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="text-blue-grey text-weight-bold" caption>${{
                      $trn(product.price)
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </template>

        <!--Loading-->
        <inner-loading :visible="loading"/>
      </div>

      <div class="row show-print footer-print">
        <div v-for="(data, key) of contactData" v-if="key !== 'img'" class="q-mr-md">
          <p>{{ key }}:</p>
          <ul>
            <li v-for="phone of contactData[key]">
              {{ phone }}
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import controller from '@imagina/qcommerce/_pages/panel/priceList/controller'

export default defineComponent({
  props: {},
  components: {},
  setup(props, {emit}) {
    return controller(props, emit)
  }
})
</script>
<style lang="stylus">
#panelPriceList {
  .show-print {
    display: none;
  }

  .pageActionsPrice {
    z-index: 999;
  }

  .q-toolbar {
    border-radius: 5px 5px 0 0;
    min-height: 0;
  }

  .q-list--bordered {
    border-radius: 0 0 5px 5px;
  }

  .q-item {
    min-height: 0;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .price-list {
    min-height 30vh;
    column-count: 3;
    column-gap: 6px;

    .price-list__content {
      width: 100%;
      display: inline-block;
      box-sizing: border-box;
    }

    @media (max-width: 900px) {
      column-count: 2;

      .price-list__content {
        max-width: 400px;
      }
    }

    @media (max-width: 700px) {
      column-count: 1;

      .price-list__content {
        max-width: none;
      }
    }

  }
}
</style>
