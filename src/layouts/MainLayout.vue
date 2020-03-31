<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          <span class="text-h6">ស្កេនទំនិញ</span>
        </q-toolbar-title>

        <q-space/>
        <q-btn @click="scanBarcode" round flat icon="camera"/>
        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn dense flat no-wrap>
            <q-avatar rounded size="20px">
              <q-icon name="settings" size="16px"/>
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px"/>

            <q-menu auto-close max-width="500px">
              <q-list dense>
                <q-item>
                  <q-item-section>
                    <div><strong>{{activeUserInfo.displayName}}</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item clickable @click="logout">
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink'
    import {LocalStorage} from "quasar";

    export default {
        name: 'MainLayout',

        components: {
            EssentialLink
        },

        data() {
            return {
                leftDrawerOpen: false,
                search: '',
                storage: 0.26,
                navigations: [
                    {icon: 'list', text: 'List', to: '/'},
                    {icon: 'people', text: 'User', to: '/login'},
                ]
            }
        },
        computed: {
            activeUserInfo() {
                return this.$store.state.auth.AppActiveUser
            }
        },
        async created() {
            let self = this;
            const token = LocalStorage.getItem("userInfo");
            if (token) {
                await self.$store.dispatch('auth/updateUserData', token);
            }
        },
        methods: {
            logout() {
                LocalStorage.remove('userInfo');
                this.$router.push('/login')
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
