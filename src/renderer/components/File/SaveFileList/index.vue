<template>
    <div class="container-fluid">
        <div class="row">
            <Lnb/>

            <div class="w-80">
                <div class="row no-gutters">
                    <div class="col-12">
                        <p>
                            <b>Save File Data</b>
                        </p>
                    </div>
                </div>

                <div class="row no-gutters">
                    <div class="col-12">
                        <ul id="list-group-ul" class="list-group">
                            <li class="list-group-item" v-for="file in getSaveFileList">
                                {{file.fileName | liveSubstr}}
                                <span class="mr-1 badge" :class="tt.tagColor" v-for="tt in file.tagsJson">{{tt.tagName}}</span>

                                <a class="btn btn-outline-info btn-xs" @click="openFolder(file)">Open Folder</a>
                                <!--<a class="btn btn-outline-success btn-xs" @click="copyFile(file.fileName)">COPY</a>-->
                                <!--<a class="btn btn-outline-warning btn-xs" @click="moveFile(file.fileName)">MOVE</a>-->
                                <!--<a class="btn btn-outline-danger btn-xs" @click="deleteFile(file.fileName)">DELETE</a>-->

                                <div v-if="file.clicked">
                                    <hr>
                                    <p>
                                        {{file}}
                                    </p>
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
    import Lnb from "../lnb";
    import path from 'path';
    import electron from 'electron';

    export default {
        name: "index",
        components: {Lnb},
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
                return this.saveFileList.filter(function (file) {
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
                })
            }
        },
        methods: {
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
                    console.log(docs);
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
