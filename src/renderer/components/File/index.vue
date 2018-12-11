<template>
    <div class="container-fluid">
        <div class="row">
            <Lnb/>

            <div class="w-80">
                링크들.
            </div>
        </div>
    </div>
</template>

<script>
    import Lnb from "./lnb";

    export default {
        name: "index",
        components: {Lnb}
    }
</script>

<style scoped>

</style>
