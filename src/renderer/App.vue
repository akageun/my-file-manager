<template>
    <v-app dark>
        <Gnb/>

        <v-content>
            <!--<v-alert-->
                    <!--:value="alert"-->
                    <!--type="success"-->
                    <!--transition="scale-transition"-->
            <!--&gt;-->
                <!--This is a success alert.-->
            <!--</v-alert>-->
            <router-view/>
        </v-content>
        <Footer/>
    </v-app>
</template>

<script>
    import Gnb from '@/components/Layouts/Gnb';
    import Footer from '@/components/Layouts/Footer';

    export default {
        name: 'my_file_manager',
        data() {
            return {
                alert: true
            }
        },
        mounted() {

        },
        methods: {},
        components: {
            Gnb, Footer
        }
    }
</script>

<style>

</style>
