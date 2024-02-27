<template>
  <div id="panelPriceList" class="q-pa-md">
    <!--Page Actions-->
    <div class="q-mb-md full-width" :style="`height: ${heightChild}px`">
      <q-resize-observer @resize="(val) => onResize(val, 'parent')" />
      <div class="fixed pageActionsPrice box box-auto-height" :style="`width: ${widtParent}px`">
        <q-resize-observer @resize="(val) => onResize(val, 'child')" />
        <page-actions :title="$tr($route.meta.title)" :extra-actions="['search']" @search="searchPriceList"
                      @refresh="refreshData(true)" :exclude-actions="excludeActions"  />
      </div>
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
              <q-item-label caption>{{ $trc(product.price) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!--Loading-->
      <inner-loading :visible="loading"/>
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

  .price-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Define las columnas con un ancho mínimo de 200px y un ancho máximo de 1fr (fracción del espacio disponible) */
    gap: 10px; /* Espacio entre las columnas */
    grid-template-rows: masonry;
  }

  .price-list__content {
    align-self: start;
  }
}
</style>
