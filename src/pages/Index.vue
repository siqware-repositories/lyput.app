<template>
  <q-page padding>
    <q-card class="my-card">
      <q-banner class="bg-grey-3" @click="scanBarcode">
        <template v-slot:avatar>
          <q-icon name="camera" color="primary" />
        </template>
        <span class="text-subtitle1">សូមស្កេនទំនិញ</span>
      </q-banner>
      <q-card-section v-if="Object.keys(scannedStock).length">
        <div class="text-h5 text-primary">{{scannedStock.name}}</div>
        <q-list separator>
          <q-item v-for="(i,index) in scannedStock.purchase_detail" :key="index" class="q-my-sm shadow-1">
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
            return {}
        },
        computed: {
            scannedStock() {
                return this.$store.getters['scan/getStock']
            }
        },
        methods: {
            dateFormat(_date){
                return  date.formatDate(_date, 'DD/MM/YYYY')
            },
            scanBarcode() {
                let self = this;
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        self.$q.loading.show();
                        self.$store.dispatch('scan/checkStock', {'id': parseInt(result.text)}).then(function () {
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
            }
        }
    }
</script>
