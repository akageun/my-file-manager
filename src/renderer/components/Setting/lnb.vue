<template>
    <div class="w-25 pr-4">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <router-link to="/setting/file/target/path">
                    Target Path
                </router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/setting/file/save/path">
                    Save Path
                </router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/setting/tags">
                    Tag Manage
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "lnb"
    }
</script>

<style scoped>

</style>
