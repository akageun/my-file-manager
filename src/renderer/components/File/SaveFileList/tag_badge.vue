<template>
    <div class="row">
        <div class="col-12">
            <span class="mr-1 badge" :class="tt.tagColor" v-for="tt in getTagList">
                {{tt.tagName}}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tag_badge",
        props: {
            tags: Array, tag_list: Array
        },
        computed: {
            getTagList() {
                let tmpJson = [];

                for (const tagId of this.tags) {

                    for (const tagInfo of this.tag_list) {
                        if (tagId === tagInfo._id) {
                            let tmpTagJson = {};

                            tmpTagJson.tagName = tagInfo.tagName;
                            tmpTagJson.tagColor = tagInfo.tagColor;

                            tmpJson.push(tmpTagJson);
                        }
                    }

                }
                return tmpJson;
            }
        }
    }
</script>

<style scoped>

</style>
