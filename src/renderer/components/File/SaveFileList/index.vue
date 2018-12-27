<template>
    <div class="container-fluid">
        <div class="row">
            <div class="w-20 pr-2">
                <div class="row no-gutters">
                    <div class="col-12">
                        <p>
                            Save File Data
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-80">
                <div class="row no-gutters">
                    <div class="col-12">
                        <p>
                            <b>Save File Data</b>
                        </p>
                    </div>
                </div>

                <div class="row no-gutters">
                    <div class="col-12 pr-3">
                        <ul id="list-group-ul" class="list-group">
                            <li class="list-group-item" v-for="file in listSoredItem" @click="openFileDetailInfo(file)">
                                <div class="row">
                                    <div class="col-12">
                                        {{file.fileName | liveSubstr}} |
                                        <div class="float-right">
                                            <a class="btn btn-outline-info btn-xs" @click="openFolder(file)">Open Folder</a>
                                        </div>
                                    </div>
                                </div>
                                <tag_badge :tags="file.tags" :tag_list="tagList"/>

                                <div class="row" v-show="file.clicked">
                                    <div class="col-12">
                                        {{file}}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import path from 'path';
    import electron from 'electron';
    import tag_badge from './tag_badge';

    export default {
        name: "index",
        components: {tag_badge},
        data() {
            return {
                tagList: [],
                saveFileList: []
            }
        },
        filters: {
            liveSubstr(str) {
                if (str.length < 80) {
                    return str;
                }
                return str.substring(0, 80) + '...';
            },

        },
        computed: {
            listSoredItem: function () {
                return this.saveFileList.filter(function (info) {
                    return info;
                });
            }
        },
        created() {
            this.initSaveFileList();
        },
        methods: {
            openFileDetailInfo(file) {
                if (file.hasOwnProperty('clicked')) {
                    file.clicked = !file.clicked;
                } else {
                    file = Object.assign({}, file, {clicked: true});
                }
                console.log(file);

            },
            async initSaveFileList() {
                const tagDb = this.$cmnModule.tagDbConf();
                let vm = this;
                tagDb.find({}, function (err, docs) {
                    vm.tagList = docs;
                });

                const db = this.$cmnModule.fileDbConf();

                await db.find({}, function (err, docs) {
                    if (err) {
                        throw err;
                    }
                    vm.saveFileList = docs;

                    vm.saveFileList.forEach(function (file) {
                        file.clicked = false;
                    });

                    return vm.saveFileList;
                });


            },
            openFolder(file) {
                electron.shell.openItem(path.join(file.savePath, file.yyyy, file.mm, file.dd));
            }
        }

    }
</script>

<style scoped>

</style>
