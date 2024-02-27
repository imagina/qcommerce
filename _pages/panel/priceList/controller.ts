import {computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance} from "vue";
import service from '@imagina/qcommerce/_pages/panel/priceList/services'
import store from '@imagina/qcommerce/_pages/panel/priceList/store'
import {PriceList, PriceListData} from '@imagina/qcommerce/_pages/panel/priceList/interface'
import { dom } from 'quasar';

interface StateProps {
  priceLists: PriceListData[],
  priceListsClone: PriceListData[],
  loading: boolean,
  widtParent: null | number,
  heightChild: null | number
}

export default function controller(props: any, emit: any) {
  const { height } = dom
  const proxy = getCurrentInstance()!.proxy

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  }

  // States
  const state = reactive<StateProps>({
    priceLists: [],
    priceListsClone: [],
    loading: false,
    widtParent: null,
    heightChild: null
  })

  // Computed
  const computeds = {
    excludeActions: computed(() => {
      const actions: string[] = [];

      if(state.loading) actions.push('refresh')

      return actions
    })
  }

  // Methods
  const methods = {
    // Get price list paginated
    getData(page = 1, refresh) {
      const requestParams = {
        page,
        take: 5,
        include: 'ownProducts',
        filter: {
          status: 1
        }
      }

      return service.getCategories(refresh, requestParams)
    },
    // Recursive function to get paged priceList and process them
    fetchData(page, attempts = 3, batchSize = 5, refresh = false) {
      state.loading = true
      // Array to store request promises
      const batchPromises: Promise<PriceList>[] = [];

      // Generate promises for batch requests
      for (let i = 0; i < batchSize; i++) {
        batchPromises.push(methods.getData(page + i, refresh));
      }

      // Wait for all promises to resolve
      Promise.all(batchPromises).then(res => {
        let metaData;
        // Process the responses
        res.forEach(response => {
          // If there is data in the response, process and continue recursion if necessary
          const page = response.meta.page;
          if(!metaData || metaData?.currentPage < page.currentPage) metaData = page;
          state.priceLists = [...state.priceLists, ...response.data];
        })


        if (metaData.currentPage < metaData.lastPage) {
          const diffPages = metaData.lastPage - metaData.currentPage
          const batch = diffPages > batchSize
            ? 5
            : diffPages

          methods.fetchData(metaData.currentPage + 1, 3, batch, refresh);
        }

        //Stop Loading
        if(metaData.currentPage == metaData.lastPage) {
          state.priceListsClone = state.priceLists
          state.loading = false
        }

      }).catch(error => {
        if(error.message == 'canceled') return

        console.error("Error In Load PriceList: ", error)
        if (attempts > 1) {
          // If the request fails and more attempts are available, try again
          new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
            // Call fetchData again with the same page number
            methods.fetchData(page, attempts - 1, batchSize);
          });
        } else {
          state.loading = false
          proxy.$alert.error('Failed')
        }

      })

    },
    // Search Data
    searchPriceList(val) {
      console.warn("search", val)
      if(val) {
        state.priceLists = state.priceListsClone.filter((list) => {
          return list.title.toLowerCase().includes(val.toLowerCase())
        })
        console.warn("search", state)
      } else {
        state.priceLists = state.priceListsClone
      }
    },
    refreshData(refresh) {
      if(refresh) {
        state.priceLists = []
        state.priceListsClone = []
      }

      methods.fetchData(1, 3, 1, refresh)
    },
    //Set heigth and width of pageActions
    onResize (size, element) {
      if(element === 'parent') state.widtParent = size.width
      else state.heightChild = size.height
    },
    openNewTab(url) {
      // Open URL in a new tab or window
      window.open(url, "_blank");
    }
  }

  // Mounted
  onMounted(() => {
    methods.refreshData(false); // Start loading from page 1
  })


  return {...refs, ...(toRefs(state)), ...computeds, ...methods, store}
}
