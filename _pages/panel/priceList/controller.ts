import {computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance} from "vue";
import service from '@imagina/qcommerce/_pages/panel/priceList/services'
import {stylePrint} from '@imagina/qcommerce/_pages/panel/priceList/model'
import store from '@imagina/qcommerce/_pages/panel/priceList/store'
import {PriceList, PriceListData, OwnProduct} from '@imagina/qcommerce/_pages/panel/priceList/interface'

interface StateProps {
  data: PriceListData[],
  loading: boolean,
  searchParam: string | null,
  expiresIn: number | null
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
    searchParam: null,
    expiresIn: null
  })

  // Computed
  const computeds = {
    priceLists: computed(() => {
      let search = state.searchParam

      if (!search) return state.data

      search = search.toLowerCase();
      let response: any[] = []

      state.data.forEach(priceList => {
        if (priceList.title.toLowerCase().includes(search ?? '')) {
          response.push(priceList)
        } else {
          const ownProducts = priceList.ownProducts;
          const productsFiltered = ownProducts.filter((product) => {
            return product.name.toLowerCase().includes(search ?? '')
          })

          if (productsFiltered.length) {
            const priceListResponse = proxy.$clone(priceList)
            priceListResponse.ownProducts = productsFiltered;
            response.push(priceListResponse)
          }
        }

      })

      return response
    }),
    excludeActions: computed(() => state.loading ? ['refresh'] : []),
    extraActions: computed(() => {
      let actions: any[] = [];

      if(!state.loading) actions = [
        ...actions,
        'search',
        //Print
        {
          props: {
            label: proxy.$tr('isite.cms.label.download'),
            icon: 'fa-light fa-file-pdf'
          },
          action: methods.printPriceList
        }
      ]

      return actions
    }),
    contactData: computed(() => ({
      img: proxy.$store.getters['qsiteApp/getSettingMediaByName']('isite::logo1').path,
      phones: proxy.$store.getters['qsiteApp/getSettingValueByName']('isite::phones'),
      addresses: proxy.$store.getters['qsiteApp/getSettingValueByName']('isite::addresses'),
      emails: proxy.$store.getters['qsiteApp/getSettingValueByName']('isite::emails'),
    })),
    infoRedirect: computed(() => {
      return {
        show: proxy.$auth.hasAccess('icommercepricelist.pricelists.index') && proxy.$route.name !== 'qcommerce.panel.shipping.priceList.index',
        fields: {
          helpText: {
            type: "banner",
            props: {
              message: proxy.$tr('icommerce.cms.label.bannerPriceList'),
              actions: [
                {
                  props: {
                    label: proxy.$tr('icommerce.cms.label.explorePriceList')
                  },
                  action: () => proxy.$router.push({name: 'qcommerce.panel.shipping.priceList.index'})
                }
              ]            }
          },
        }

      };
    }),
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
          state.expiresIn = res[res.length -1]?.expiresIn
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
    //Print PDF
    printPriceList() {
      const print = document.getElementById('print')
      const printWindow = window.open('', 'PRINT', 'height=1000,width=1000');
      const bodyStyles = document.body.style;
      const pageTitle = document.title;

      const bodyStylesObj = {};
      for (let i = 0; i < bodyStyles.length; i++) {
        const propertyName = bodyStyles[i];
        const propertyValue = bodyStyles.getPropertyValue(propertyName);
        bodyStylesObj[propertyName] = propertyValue;
      }

      if(!printWindow || !print) return

      printWindow.document.write(`<html><head><title>${pageTitle}</title><style type="text/css">${stylePrint}</style></head><body style="`);
      // Incluir los estilos obtenidos en el atributo style del body
      for (const [property, value] of Object.entries(bodyStylesObj)) {
        printWindow.document.write(`${property}: ${value};`);
      }
      printWindow.document.write('" >');
      printWindow.document.write(print.innerHTML);
      printWindow.document.write('</body></html>');

      printWindow.document.close(); // necessary for IE >= 10
      printWindow.focus(); // necessary for IE >= 10*/

      const logoPriceList = printWindow.document.getElementById('logoPriceList');

      const clodeWindow = () => {
        printWindow.print();
        printWindow.close();
      }

      if(!logoPriceList) clodeWindow()
      // Register an event to know when the image is loaded inside printWindow
      logoPriceList?.addEventListener('load', clodeWindow);
    }
  }

  // Mounted
  onMounted(() => {
    methods.refreshData(false); // Start loading from page 1
  })


  return {...refs, ...(toRefs(state)), ...computeds, ...methods, store}
}
