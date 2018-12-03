<template>
    <div id="app">
        <Gnb/>
        <router-view/>
    </div>
</template>

<script>
    import Gnb from '@/components/Layouts/Gnb'

    export default {
        name: 'my_file_manager',
        components: {
            Gnb
        }
    }
</script>

<style>
    /* CSS */
</style>
