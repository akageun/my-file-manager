<template>
    <v-app dark>
        <Gnb/>
        <v-content>
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
