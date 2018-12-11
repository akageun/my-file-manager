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
                            <li class="list-group-item" v-for="file in saveFileList">
                                {{file.fileName | liveSubstr}}

                                <hr>
                                <a class="btn btn-outline-info btn-xs" @click="openFolder(file)">Open Folder</a>
                                <!--<a class="btn btn-outline-success btn-xs" @click="copyFile(file.fileName)">COPY</a>-->
                                <!--<a class="btn btn-outline-warning btn-xs" @click="moveFile(file.fileName)">MOVE</a>-->
                                <!--<a class="btn btn-outline-danger btn-xs" @click="deleteFile(file.fileName)">DELETE</a>-->

                                <div v-if="file.clicked">
                                    <hr>
                                    <!--<p>-->
                                    <!--{{file.statInfo}}-->
                                    <!--</p>-->
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
                saveFileList: {}
            }
        },
        filters: {
            liveSubstr: function (str) {
                if (str.length < 80) {
                    return str;
                }
                return str.substring(0, 80) + '...';
            }
        },
        created() {
            this.initSaveFileList();
        },
        methods: {
            initSaveFileList() {
                const db = this.$cmnModule.fileDbConf();

                let vm = this;
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
