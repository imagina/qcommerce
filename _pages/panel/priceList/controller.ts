import {computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance} from "vue";
import service from '@imagina/qcommerce/_pages/panel/priceList/services'
import store from '@imagina/qcommerce/_pages/panel/priceList/store'
import {PriceList, PriceListData, OwnProduct} from '@imagina/qcommerce/_pages/panel/priceList/interface'

interface StateProps {
  data: PriceListData[],
  loading: boolean,
  searchParam: string | null
}

export default function controller(props: any, emit: any) {
  const proxy = getCurrentInstance()!.proxy

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  }

  // States
  const state = reactive<StateProps>({
    data: [],
    loading: false,
    searchParam: null
  })

  // Computed
  const computeds = {
    priceLists: computed(() => {
      let search = state.searchParam

      if(!search) return state.data

      search = search.toLowerCase();
      let response: any[] = []

      state.data.forEach(priceList => {
        if(priceList.title.toLowerCase().includes(search ?? '')) {
          response.push(priceList)
        } else {
          const ownProducts = priceList.ownProducts;
          const productsFiltered = ownProducts.filter((product) => {
            return product.name.toLowerCase().includes(search ?? '')
          })

          if(productsFiltered.length) {
            const priceListResponse = proxy.$clone(priceList)
            priceListResponse.ownProducts = productsFiltered;
            response.push(priceListResponse)
          }
        }

      })

      return response
    }),
    excludeActions: computed(() => {
      const actions: string[] = [];

      if(state.loading) actions.push('refresh')

      return actions
    }),
    extraActions: computed(() => {
      let actions: any[] = [];

      if(!state.loading) actions = [
        ...actions,
        'search',
        //Print
        {
          label: proxy.$tr('isite.cms.label.print'),
          props: {
            icon: 'fa-light fa-print'
          },
          action: () => {

            const priceListElements = document.getElementById('print');
            priceListElements.classList.remove('price-container')
            priceListElements.classList.add('print-custom')


            window.print()

            priceListElements.classList.remove('print-custom')
            priceListElements.classList.add('price-container')

          }
        }
      ]

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
          const filterPriceList = response.data.filter(price => price.ownProducts.length)
          state.data = [...state.data, ...filterPriceList];
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
      state.searchParam = val;
    },
    refreshData(refresh) {
      if(refresh) state.data = []

      methods.fetchData(1, 3, 1, refresh)
    },
    openNewTab(url) {
      // Open URL in a new tab or window
      window.open(url, "_blank");
    },
  }

  // Mounted
  onMounted(() => {
    methods.refreshData(false); // Start loading from page 1
  })


  return {...refs, ...(toRefs(state)), ...computeds, ...methods, store}
}
