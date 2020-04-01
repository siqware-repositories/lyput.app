<template>
  <q-page padding>
    <q-card>
      <q-select
        outlined
        dense
        v-model="product"
        use-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        @input="searchProduct"
        clearable
        label="ស្វែងរកទំនិញ"
        class="full-width q-pa-sm"
        :virtual-scroll-slice-size="10"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-select>
      <q-banner class="bg-grey-3" @click="scanBarcode">
        <template v-slot:avatar>
          <q-icon name="camera" color="primary"/>
        </template>
        <span class="text-subtitle1">សូមស្កេនទំនិញ</span>
      </q-banner>
      <q-card-section v-if="Object.keys(scannedStock).length" class="no-padding">
        <q-list separator bordered>
          <q-item>
            <q-item-section>
              <q-item-label>
                <span class="text-h5 text-primary">{{scannedStock.name}}</span>
              </q-item-label>
              <q-item-label>
                <q-list separator>
                  <q-item v-for="(i,index) in scannedStock.purchase_detail" :key="index">
                    <q-item-section>
                      <q-item-label>{{dateFormat(i.date)}}</q-item-label>
                      <q-item-label>{{i.supplier.name}}-({{i.supplier.contact}})-{{i.supplier.address}}</q-item-label>
                      <q-item-label class="row q-col-gutter-xs">
                        <div class="col">
                          <q-badge outline :label="`ស្តុក ${i.remain_qty}`" color="primary"/>
                        </div>
                        <div class="col">
                          <q-badge outline :label="`ទិញ ${i.purchase}$`" color="positive"/>
                        </div>
                        <div class="col">
                          <q-badge outline :label="`លក់ ${i.sale}$`" color="negative"/>
                        </div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-banner v-else class="text-center">
        <span class="text-subtitle1 text-negative">មិនទាន់បានស្កេន</span>
      </q-banner>
    </q-card>
  </q-page>
</template>

<script>
    import {date} from "quasar";

    export default {
        data() {
            return {
                product: '',
                options: []
            }
        },
        computed: {
            scannedStock() {
                return this.$store.getters['scan/getStock']
            },
            getProduct() {
                return this.$store.getters['product/getProduct'].map(function (x) {
                    return x.name
                })
            },
            getProductCount() {
                return this.$store.getters['product/getProductCount'];
            }
        },
        methods: {
            searchProduct(val) {
                let self = this;
                if (val !== '') {
                    self.$q.loading.show();
                    self.$store.dispatch('scan/checkStock', {'id': null, 'name': val}).then(function () {
                        self.$q.loading.hide();
                    });
                }
            },
            dateFormat(_date) {
                return date.formatDate(_date, 'DD/MM/YYYY')
            },
            scanBarcode() {
                let self = this;
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        self.$q.loading.show();
                        self.$store.dispatch('scan/checkStock', {
                            'id': parseInt(result.text),
                            'name': null
                        }).then(function () {
                            self.$q.loading.hide();
                        })
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    },
                    {
                        preferFrontCamera: true, // iOS and Android
                        showFlipCameraButton: true, // iOS and Android
                        showTorchButton: true, // iOS and Android
                        torchOn: true, // Android, launch with the torch switched on (if available)
                        saveHistory: true, // Android, save scan history (default false)
                        prompt: "Place a barcode inside the scan area", // Android
                        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                        formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                        orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                        disableAnimations: true, // iOS
                        disableSuccessBeep: false // iOS and Android
                    }
                );
            },
            filterFn(val, update, abort) {
                let self = this;
                let typingTimer;                //timer identifier
                let doneTypingInterval = 2000;
                update(() => {
                    const needle = val.toLowerCase();
                    self.options = self.getProduct.filter(v => v.toLowerCase().indexOf(needle) > -1)
                })
            },
        },
        created() {
            let self = this;
            self.$q.loading.show();
            self.$store.dispatch('product/productCount').then(function () {
                self.$q.loading.hide();
                if (parseInt(self.getProductCount)>self.getProduct.length){
                    self.$q.loading.show();
                    self.$store.dispatch('product/indexProduct').then(function () {
                        self.$q.loading.hide();
                        self.$router.go()
                    })
                }
            });
        }
    }
</script>
