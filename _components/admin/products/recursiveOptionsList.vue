<template>
  <q-list no-border separator link id="listOptionsCommerce" class="q-pa-none" v-if="!loading">
    <!-- Dropdown Item -->
    <draggable
      tag="div"
      v-if="productOptions.length ? true : false"
      v-bind="dragOptions"
      :list="productOptions"
      :group="{ name: 'g1' }"
      @change="vEmit"
      item-key="id"
    >
      <template #item="{ element }">
        <q-expansion-item expand-icon-class="hidden">
          <template v-slot:header>
            <q-radio v-model="optionSelected" :val="element.id" @update:modelValue="vEmit()" />
            <q-item-section>{{ element.description }}</q-item-section>
            <q-item-section side>
              <div>
                <q-btn icon="fas fa-plus" color="positive" v-if="permitChildren(element)"
                       size="xs" @click="vEmitAddOption(element.id)" round outline>
                  <q-tooltip>{{ `${$tr('isite.cms.label.add')} ${$tr('isite.cms.label.option')}` }}</q-tooltip>
                </q-btn>
                <q-btn icon="far fa-trash-alt" color="red" round outline
                       class="q-ml-xs" size="xs" @click="vEmitDelete(element.id)">
                  <q-tooltip>{{ `${$tr('isite.cms.label.delete')}` }}</q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </template>
          <recursive-options-list v-if="element.children" :list-items="element.children"
                                  :parent-id="element.id" v-model="optionSelected" @add="vEmitAddOption(optionSelected)"
                                  @delete="vEmitDelete(optionSelected)" @update:modelValue="vEmit" />
        </q-expansion-item>
      </template>
    </draggable>
  </q-list>
</template>
<script>
//Services
import draggable from 'vuedraggable';

export default {
  name: 'recursiveOptionsList',
  components: {
    draggable
  },
  props: {
    listItems: { default: false },
    parentId: { default: 0 },
    modelValue: { default: null }
  },
  emits: ['update:modelValue', 'add', 'delete'],
  watch: {
    listItems() {
      this.init();
    },
    modelValue() {
      this.optionSelected = this.modelValue;
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.init();
    });
  },
  data() {
    return {
      loading: false,
      productOptions: [],
      optionSelected: null
    };
  },
  methods: {
    //Init Form
    init() {
      this.loading = true;
      this.productOptions = this.$clone(this.$array.builTree(this.listItems, this.parentId));
      this.loading = false;
    },
    permitChildren(item) {
      let types = ['select', 'radio'];
      let response = types.indexOf(item.type);
      return (response == -1) ? false : true;
    },
    vEmit() {
      this.$emit('update:modelValue', this.optionSelected);
    },
    vEmitAddOption(optionId) {
      this.optionSelected = optionId;
      this.vEmit();
      this.$emit('add');
    },
    vEmitDelete(optionId) {
      this.optionSelected = optionId;
      this.vEmit();
      this.$emit('delete');
    },
    vRefresh() {
      this.init();
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    }
  }
};
</script>
<style lang="scss">
#listOptionsCommerce {
  .q-item {
    padding: 0px;

    .q-item-side.relative-position {
      display: none;
    }
  }

  .q-expansion-item {
    .q-expansion-item__content {
      padding: 0px 0px 0px 15px;
    }
  }
}
</style>


