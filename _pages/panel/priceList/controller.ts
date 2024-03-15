import { computed, reactive, onMounted, toRefs } from 'vue';
import service from 'src/modules/qcommerce/_pages/panel/priceList/services';
import { stylePrint } from 'src/modules/qcommerce/_pages/panel/priceList/model';
import { PriceList, PriceListData } from 'src/modules/qcommerce/_pages/panel/priceList/interface';
import { clone, alert, i18n, router, store } from 'src/plugins/utils';
import { useQuasar } from 'quasar';

interface StateProps {
  data: PriceListData[],
  loading: boolean,
  searchParam: string | null,
  expiresIn: number | null
}

export default function controller(props: any, emit: any) {
  const $q = useQuasar();

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  };

  // States
  const state = reactive<StateProps>({
    data: [],
    loading: false,
    searchParam: null,
    expiresIn: null
  });

  // Computed
  const computeds = {
    // Computes price lists array based on search parameter and number of columns
    priceLists: computed<PriceListData[][]>(() => {
      let search = state.searchParam;

      const widthWindow = $q.screen.width;
      // Length of the data
      const dataLength = state.data.length;
      // Number of columns to display
      let numColumns = 3;

      if (dataLength === 1 || widthWindow <= 700) numColumns = 1;
      else if (dataLength === 2 || widthWindow <= 900) numColumns = 2;


      let response: any = Array.from({ length: numColumns }, () => []);
      let colNum = 0;

      // If no search parameter, simply distribute price lists across columns
      if (!search) {
        state.data.forEach(priceList => {
          response[colNum].push(priceList);
          // Update column number, ensuring it loops back to 0 after reaching the last column
          colNum = (colNum + 1) % numColumns;
        });
        return response;
      }

      search = search.toLowerCase();

      state.data.forEach(priceList => {
        // Check if price list title matches search or if any product within the price list matches search
        if (priceList.title.toLowerCase().includes(search ?? '')) {
          response[colNum].push(priceList);
        } else {
          // Filter products within the price list for matches with search
          const ownProducts = priceList.ownProducts;
          const productsFiltered = ownProducts.filter((product) => {
            return product.name.toLowerCase().includes(search ?? '');
          });

          // If there are matching products, create a new price list with filtered products and add to response
          if (productsFiltered.length) {
            const priceListResponse = clone(priceList);
            priceListResponse.ownProducts = productsFiltered;
            response[colNum].push(priceListResponse);
          }
        }

        // Update column number, ensuring it loops back to 0 after reaching the last column
        colNum = (colNum + 1) % numColumns;
      });

      return response;
    }),
    // Computes excluded actions based on loading state
    excludeActions: computed(() => state.loading ? ['refresh'] : []),
    // Computes extra actions based on loading state
    extraActions: computed(() => {
      let actions: any[] = [];

      // If not loading, add search and print actions
      if (!state.loading) actions = [
        ...actions,
        'search',
        //Print
        {
          props: {
            label: i18n.tr('isite.cms.label.download'),
            icon: 'fa-light fa-file-pdf'
          },
          action: methods.printPriceList
        }
      ];

      return actions;
    }),
    // Computes contact data object using store getters
    contactData: computed(() => ({
      phones: {
        label: i18n.tr('isite.cms.label.phoneNumber'),
        data: store.getSetting('isite::phones')
      },
      addresses: {
        label: i18n.tr('isite.cms.label.address'),
        data: store.getSetting('isite::addresses')
      },
      emails: {
        label: i18n.tr('isite.cms.label.email'),
        data: store.getSetting('isite::emails')
      }
    })),
    // Computes information redirection object based on current route
    infoRedirect: computed(() => {
      return {
        // Determines if redirection info should be shown
        show: router.route.name === 'qcommerce.public.shipping.priceList.index',
        // Fields for redirection info
        fields: {
          helpText: {
            type: 'banner',
            props: {
              message: i18n.tr('icommerce.cms.label.bannerPriceList'),
              actions: [
                {
                  props: {
                    label: i18n.tr('icommerce.cms.label.explorePriceList')
                  },
                  action: () => router.push({ name: 'qcommerce.panel.shipping.priceList.index' })
                }
              ]
            }
          }
        }

      };
    }),
    // Function computes column width based on data length and window width
    col: computed(() => {
      //Width of the window
      const widthWindow = $q.screen.width;
      // Length of the data
      const dataLength = state.data.length;

      //cacl class of column
      if (dataLength === 1 || widthWindow <= 700) return 12;
      else if (dataLength === 2 || widthWindow <= 900) return 6;
      else return 4; // Default value
    })
  };

  // Methods
  const methods = {
    // Get price list paginated
    getData(page = 1, refresh = false) {
      const requestParams = {
        page,
        take: 5,
        include: 'ownProducts',
        filter: {
          status: 1
        }
      };

      return service.getCategories(refresh, requestParams);
    },
    // Recursive function to get paged priceList and process them
    fetchData(page, attempts = 3, batchSize = 5, refresh = false) {
      state.loading = true;
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
          if (!metaData || metaData?.currentPage < page.currentPage) metaData = page;
          const filterPriceList = response.data.filter(price => price.ownProducts.length);
          state.data = [...state.data, ...filterPriceList];
        });


        if (metaData.currentPage < metaData.lastPage) {
          const diffPages = metaData.lastPage - metaData.currentPage;
          const batch = diffPages > batchSize
            ? 5
            : diffPages;

          methods.fetchData(metaData.currentPage + 1, 3, batch, refresh);
        }

        //Stop Loading
        if (metaData.currentPage == metaData.lastPage) {
          state.expiresIn = res[res.length - 1]?.expiresIn;
          state.loading = false;
        }

      }).catch(error => {
        if (error.message == 'canceled') return;

        console.error('Error In Load PriceList: ', error);
        if (attempts > 1) {
          // If the request fails and more attempts are available, try again
          new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
            // Call fetchData again with the same page number
            methods.fetchData(page, attempts - 1, batchSize);
          });
        } else {
          state.loading = false;
          alert.error('Failed');
        }

      });

    },
    // Search Data
    searchPriceList(val) {
      state.searchParam = val;
    },
    refreshData(refresh) {
      if (refresh) state.data = [];

      methods.fetchData(1, 3, 1, refresh);
    },
    //Print PDF
    printPriceList() {
      const print = document.getElementById('print');
      const printWindow = window.open('', 'PRINT', 'height=1000,width=1000');
      const bodyStyles = document.body.style;
      const pageTitle = document.title;

      const bodyStylesObj = {};
      for (let i = 0; i < bodyStyles.length; i++) {
        const propertyName = bodyStyles[i];
        const propertyValue = bodyStyles.getPropertyValue(propertyName);
        bodyStylesObj[propertyName] = propertyValue;
      }

      if (!printWindow || !print) return;

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

      const closeWindow = () => {
        printWindow.print();
        printWindow.close();
      };

      if (!logoPriceList) closeWindow();
      // Register an event to know when the image is loaded inside printWindow
      logoPriceList?.addEventListener('load', closeWindow);
    }
  };

  // Mounted
  onMounted(() => {
    methods.refreshData(false); // Start loading from page 1
  });


  return { ...refs, ...(toRefs(state)), ...computeds, ...methods, store };
}
