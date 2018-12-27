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
                            <li class="list-group-item" v-for="file in getSaveFileList" @click="openFileDetailInfo(file)">
                                <div class="row">
                                    <div class="col-12">
                                        {{file.fileName | liveSubstr}} | {{file.clicked}}
                                        <div class="float-right">
                                            <a class="btn btn-outline-info btn-xs" @click="openFolder(file)">Open Folder</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <span class="mr-1 badge" :class="tt.tagColor" v-for="tt in file.tagsJson">{{tt.tagName}}</span>
                                    </div>
                                </div>
                                <div v-show="file.clicked">
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

    export default {
        name: "index",
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
            }
        },
        created() {
            this.initSaveFileList();
        },
        computed: {
            getSaveFileList: function () {
                let vm = this;
                this.saveFileList.filter(function (file) {
                    file.clicked = false;

                    if (file.tags !== undefined) {
                        let tagsJson = [];
                        for (const tagId of file.tags) {

                            for (const tagInfo of vm.tagList) {
                                if (tagId === tagInfo._id) {
                                    let tmpTagJson = {};

                                    tmpTagJson.tagName = tagInfo.tagName;
                                    tmpTagJson.tagColor = tagInfo.tagColor;

                                    tagsJson.push(tmpTagJson);
                                }
                            }

                        }

                        file.tagsJson = tagsJson;
                    }

                    return file;
                });

                return this.saveFileList;
            }
        },
        methods: {
            openFileDetailInfo(file) {
                if (file.hasOwnProperty('clicked')) {
                    file.clicked = !file.clicked;
                } else {
                    file = Object.assign({}, file, {clicked: true});
                }
                console.log("file : ", file);
            },
            initSaveFileList() {
                const tagDb = this.$cmnModule.tagDbConf();
                let vm = this;
                tagDb.find({}, function (err, docs) {
                    vm.tagList = docs;
                });

                const db = this.$cmnModule.fileDbConf();

                db.find({}, function (err, docs) {
                    if (err) {
                        throw err;
                    }
                    vm.saveFileList = docs;
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
