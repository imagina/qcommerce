<template>
  <div id="panelPriceList" class="q-pa-md row wrap">
    <div v-for="priceList in priceLists" class="test">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>{{ priceList.title }}</q-toolbar-title>
      </q-toolbar>

      <q-list bordered>
        <q-item v-for="product in priceList.ownProducts" :key="product.id" class="q-my-sm" clickable v-ripple>
          <q-item-section>
            <q-item-label>{{ product.name }}</q-item-label>
            <q-item-label caption>{{ $trc(product.price) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="relative-position full-width">
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
.test {
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  max-width: 350px;
  min-width: 0;
}
</style>
