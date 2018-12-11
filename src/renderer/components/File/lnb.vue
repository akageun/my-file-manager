<template>
    <div class="w-20">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <router-link to="/file/target">
                    대상 파일 관리
                </router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/file/save">
                    저장 파일 관리
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