import {computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance} from "vue";
import service from '@imagina/qcommerce/_pages/panel/priceList/services'
import store from '@imagina/qcommerce/_pages/panel/priceList/store'
import {PriceList, PriceListData} from '@imagina/qcommerce/_pages/panel/priceList/interface'

interface StateProps {
  data: PriceListData[],
  loading: boolean
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
    loading: false
  })

  // Computed
  const computeds = {
    priceLists: computed(() => {
      return state.data.sort((a, b) => a.title.localeCompare(b.title));
    })
  }

  // Methods
  const methods = {
    // Get price list paginated
    getData(page = 1) {
      const requestParams = {
        page,
        take: 5,
        include: 'ownProducts',
        filter: {
          status: 1
        }
      }

      return service.getCategories(true, requestParams)
    },
    // Recursive function to get paged priceList and process them
    fetchData(page, attempts = 3, batchSize = 5) {
      state.loading = true
      // Array to store request promises
      const batchPromises: Promise<PriceList>[] = [];

      // Generate promises for batch requests
      for (let i = 0; i < batchSize; i++) {
        batchPromises.push(methods.getData(page + i));
      }

      // Wait for all promises to resolve
      Promise.all(batchPromises).then(res => {
        let metaData;
        // Process the responses
        res.forEach(response => {
          // If there is data in the response, process and continue recursion if necessary
          const page = response.meta.page;
          if(!metaData || metaData?.currentPage < page.currentPage) metaData = page;
          state.data = [...state.data, ...response.data];
        })


        if (metaData.currentPage < metaData.lastPage) {
          const diffPages = metaData.lastPage - metaData.currentPage
          const batch = diffPages > batchSize
            ? 5
            : diffPages

          console.warn(metaData, diffPages, batch, batchSize)
          methods.fetchData(metaData.currentPage + 1, 3, batch);
        }

        //Stop Loading
        if(metaData.currentPage == metaData.lastPage) {
          console.timeEnd('Test');
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

    }
  }

  // Mounted
  onMounted(() => {
    console.time('Test');
    methods.fetchData(1, 3, 1); // Start loading from page 1
  })


  return {...refs, ...(toRefs(state)), ...computeds, ...methods, store}
}
