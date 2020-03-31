<template>
    <q-page padding class="flex flex-center" style="background-image: url(../statics/login-bg.jpg)">
        <q-card
                square
                flat
                bordered
                style="width: 500px;" :class="!$q.screen.gt.sm?'full-width':''"
        >
            <q-card-section>
                <q-banner class="bg-grey-3 q-mb-lg">
                    <template v-slot:avatar>
                        <q-icon name="lock" color="primary" />
                    </template>
                    Login to your account
                </q-banner>
                <q-form
                        @submit="onSubmit"
                        @reset=""
                        class="q-gutter-sm"
                >
                    <q-input
                            :dense="true"
                            clearable
                            outlined
                            type="email"
                            v-model="data.email"
                            label="Your Email"
                            hint="Please enter your email"
                            lazy-rules
                            :rules="[ val => !!val||'Please enter your email' ]"
                    >
                        <template v-slot:prepend>
                            <q-icon name="email" />
                        </template>
                    </q-input>

                    <q-input
                            :dense="true"
                            clearable
                            outlined
                            :type="isPwd ? 'password' : 'text'"
                            v-model="data.password"
                            label="Your Password"
                            hint="Please enter your password"
                            lazy-rules
                            :rules="[val => !!val||'Please enter your password']"
                    >
                        <template v-slot:prepend>
                            <q-icon name="lock" />
                        </template>
                        <template v-slot:append>
                            <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                            />
                        </template>
                    </q-input>

                    <div class="text-right">
                        <q-btn label="Login" type="submit" color="primary"/>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                isPwd: true,
                data:{
                    email:'',
                    password:'',
                    remember_me:false
                }
            }
        },
        methods:{
            onSubmit () {
                let self = this;
                self.$store.dispatch('auth/authLogin',self.data).then(function (data) {
                    if (data){
                        if (data.message){
                            self.$q.notify({
                                color: 'red-5',
                                textColor: 'white',
                                icon: 'warning',
                                message: data.message
                            })
                        } else {
                            self.$q.notify({
                                color: 'green-4',
                                textColor: 'white',
                                icon: 'cloud_done',
                                message: 'Logging in.....'
                            });
                            self.$router.push('/')
                        }
                    } else {
                        self.$q.notify({
                            color: 'red-5',
                            textColor: 'white',
                            icon: 'warning',
                            message: 'Please check input again!'
                        })
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
