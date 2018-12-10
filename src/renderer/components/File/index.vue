<template>
    <div class="container-fluid">
        <div class="row">
            <div class="w-25">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        Cras justo odio
                        <span class="badge badge-primary badge-pill">14</span>
                    </li>
                    <li class="list-group-item">
                        Dapibus ac facilisis in
                        <span class="badge badge-primary badge-pill">14</span>
                    </li>
                    <li class="list-group-item">
                        Morbi leo risus
                        <span class="badge badge-primary badge-pill">14</span>
                    </li>
                    <li class="list-group-item">
                        Porta ac consectetur ac
                        <span class="badge badge-primary badge-pill">14</span>
                    </li>
                    <li class="list-group-item">
                        Vestibulum at eros
                        <span class="badge badge-primary badge-pill">14</span>
                    </li>
                </ul>
            </div>
            <div class="w-75">
                <File_List/>
            </div>
        </div>
    </div>
</template>

<script>
    import File_List from "./File_List";

    export default {
        name: "index",
        components: {File_List}
    }
</script>

<style scoped>

</style>
