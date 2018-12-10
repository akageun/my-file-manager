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
                <div class="row no-gutters">
                    <div class="col-12">
                        <p>
                            {{baseDir}}
                        </p>

                        <ul id="list-group-ul" class="list-group">
                            <li class="list-group-item" v-for="file in fileList">
                                {{file.fileName | liveSubstr}}
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const fs = require('fs');
    const path = require('path');

    const Store = require("electron-store");
    const settingConf = new Store({name: 'settingConf'});

    export default {
        name: "File_List",
        data() {
            return {
                baseDir: '',
                fileList: {}
            }
        },
        filters: {
            liveSubstr: function (str) {
                if (str.length < 70) {
                    return str;
                }
                return str.substring(0, 70) + '...';
            }
        },
        created() {
            this.initFileList();


        },
        methods: {
            initFileList() {
                let list = [];
                const confJson = settingConf.get('file');
                this.baseDir = confJson.targetPath;

                const tmpBaseDir = this.baseDir;
                const readFileList = fs.readdirSync(tmpBaseDir);

                readFileList.forEach(function (file) {
                    const fullPath = path.join(tmpBaseDir, file);

                    const tmpFileStat = fs.statSync(fullPath);

                    let tmpFileJson = {};
                    tmpFileJson.fileName = file;
                    tmpFileJson.isDirectory = tmpFileStat.isDirectory();


                    list.push(tmpFileJson);
                });

                this.fileList = list;
            }
        }
    }
</script>

<style scoped>

</style>
