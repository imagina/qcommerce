<template>
  <div id="panelPriceList" class="q-pa-md relative-position">
    <!--Page Actions-->
    <div class="q-mb-md box box-auto-height" >
      <page-actions :title="$tr($route.meta.title)" :extra-actions="extraActions" @search="searchPriceList"
                  @refresh="refreshData(true)" :exclude-actions="excludeActions" />
    </div>


    <div id="print" class="scroll price-container">
      <div class="text-center print-img">
        <q-avatar size="150px">
          <img :src="this.$store.getters['qsiteApp/getSettingMediaByName']('isite::logo1').path">
        </q-avatar>
      </div>
      <!--Content-->
      <div class="relative-position q-mt-md price-list">
        <div v-for="priceList in priceLists" :key="priceList.id" class="q-my-sm price-list__content">
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>{{ priceList.title }}</q-toolbar-title>
          </q-toolbar>

          <q-list bordered>
            <q-item v-for="product in priceList.ownProducts" :key="product.id" class="q-my-sm" clickable v-ripple
                    @click.native="openNewTab(product.url)">
              <q-item-section>
                <q-item-label>{{ product.name }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>${{ $trn(product.price) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!--Loading-->
        <inner-loading :visible="loading"/>
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

  .pageActionsPrice {
    z-index: 999;
  }


  .price-container {
    height: calc(100vh - 320px);

    .print-img {
      display: none;
    }
  }

  .print-custom {
    .print-img {
      display: block;
    }

    .price-list {
      .price-list__content {
        display: grid;
      }

    }
  }

  .price-list {
    column-count: 3;
    column-gap: 20px;

    .price-list__content {
      width: 100%;
      display: inline-block;
      max-width: 320px;
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


    .print-grid {
      display: grid;
    }
  }
}
</style>
