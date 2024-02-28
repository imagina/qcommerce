<template>
  <div id="panelPriceList" class="q-pa-md relative-position">
    <!--Page Actions-->
    <div class="q-mb-md box box-auto-height" >
      <page-actions :title="$tr($route.meta.title)" :extra-actions="extraActions" @search="searchPriceList"
                    @refresh="refreshData(true)" :exclude-actions="excludeActions" />
    </div>


    <div id="print" class="scroll price-container">
      <div class="text-center show-print q-pb-sm">
        <q-avatar size="150px">
          <img :src="$store.getters['qsiteApp/getSettingMediaByName']('isite::logo1').path">
        </q-avatar>
      </div>
      <!--Content-->
      <div class="relative-position q-mt-md price-list">
        <template v-if="!loading">
          <div v-for="priceList in priceLists" :key="priceList.id" class="q-mt-xs price-list__content">
            <a class="text-center text-primary show-print" :href="priceList.url">{{priceList.title}}</a>
            <q-toolbar class="bg-primary text-white no-print">
              <q-toolbar-title>{{ priceList.title }}</q-toolbar-title>
            </q-toolbar>

            <q-list bordered>
              <q-item v-for="product in priceList.ownProducts" :key="product.id" class="q-py-none" clickable v-ripple
                      tag="a" :href="product.url" target="_blank">
                <q-item-section>
                  <q-item-label>{{ product.name }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label caption>${{ $trn(product.price) }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </template>

        <!--Loading-->
        <inner-loading :visible="loading"/>
      </div>

      <div class="row show-print q-pt-sm">
        <div v-for="(data, key) of contactData" class="q-mr-md">
          <p>{{ key }}:</p>
          <ul>
            <li v-for="phone of contactData[key]">
              {{phone}}
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

  .price-container {
    height: calc(100vh - 320px);
  }

  .price-list {
    min-height 50%;
    column-count: 3;
    column-gap: 20px;

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

@media print {
  #panelPriceList {
    visibility: visible
    #print * {
      padding: 0;
      margin: 0;
      border: none;
    }
  }

  body {
    visibility: hidden;
  }


  #print {
    height: auto !important;

    .no-print {
      display: none;
    }

    .show-print {
      display: block;
    }

    .price-list {
      column-count: 3 !important;
      column-gap: 20px;

      .price-list__content {
        width: 100%;
        display: grid;
        box-sizing: border-box;

        .q-item {
          padding: 4px;
        }

      }

    }
  }
}

</style>
