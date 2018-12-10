<template>
    <div>
        <div class="row no-gutters">
            <div class="col-12">
                <p>
                    <b>Target Directory</b> : {{targetPath}}
                </p>
            </div>
        </div>

        <div class="row no-gutters">
            <div class="col-12">
                <ul id="list-group-ul" class="list-group">
                    <li class="list-group-item" v-for="file in fileList">
                        {{file.fileName | liveSubstr}}
                        <div class="float-right" v-if="file.isDirectory === false">
                            <span class="badge badge-info badge-pill cursor-pointer" @click="infoFile(file)">INFO</span>
                            <span class="badge badge-success badge-pill cursor-pointer" @click="copyFile(file.fileName)">COPY</span>
                            <span class="badge badge-warning badge-pill cursor-pointer" @click="moveFile(file.fileName)">MOVE</span>
                            <span class="badge badge-danger badge-pill cursor-pointer" @click="deleteFile(file.fileName)">DELETE</span>
                        </div>

                        <div  v-if="file.clicked">
                            <hr>
                            <p>
                                {{file.statInfo}}
                            </p>
                        </div>
                    </li>
                </ul>
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
                targetPath: '',
                savePath: '',
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
            const confJson = settingConf.get('file');
            this.targetPath = confJson.targetPath;
            this.savePath = confJson.savePath;

            this.initFileList();

        },
        methods: {
            initFileList() {
                let list = [];

                const tmpBaseDir = this.targetPath;
                const readFileList = fs.readdirSync(tmpBaseDir);

                readFileList.forEach(function (file) {
                    const fullPath = path.join(tmpBaseDir, file);

                    const tmpFileStat = fs.statSync(fullPath);

                    let tmpFileJson = {};
                    tmpFileJson.clicked = false;
                    tmpFileJson.fileName = file;
                    tmpFileJson.isDirectory = tmpFileStat.isDirectory();
                    tmpFileJson.statInfo = tmpFileStat;

                    list.push(tmpFileJson);
                });

                this.fileList = list;
            },
            getDateForPath() {
                const today = new Date();
                let dd = today.getDate();
                let mm = today.getMonth() + 1; //January is 0!
                let yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd
                }
                if (mm < 10) {
                    mm = '0' + mm
                }

                let dt = {};
                dt['dd'] = String(dd);
                dt['mm'] = String(mm);
                dt['yyyy'] = String(yyyy);

                return dt;
            },
            mkdirSyncRecursive(directory) {
                const path2 = directory.replace(/\/$/, '').split(path.sep);
                console.log(path);

                for (let i = 1; i <= path2.length; i++) {
                    const segment = path2.slice(0, i).join('/');
                    !fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
                }
            },
            infoFile(file) {
                if (file.hasOwnProperty('clicked')) {
                    file.clicked = !file.clicked;
                } else {
                    //since its the first time , set the value pf clicked to true to show the subitem
                    file = Object.assign({}, file, {clicked: true});
                }
                console.log(file);

                const targetFullPath = path.join(this.targetPath, file.fileName);

            },
            copyFile(fileName) {
                const dt = this.getDateForPath();

                const tmpSavePath = path.join(this.savePath, dt.yyyy, dt.mm, dt.dd);
                this.mkdirSyncRecursive(tmpSavePath); //폴더 생성

                const saveFullPath = path.join(tmpSavePath, fileName);
                if (fs.existsSync(saveFullPath)) {
                    if (confirm('이미 파일이 존재합니다. 덮어쓰기 하시겠습니까?') == false) {
                        return;
                    }
                }

                const targetFullPath = path.join(this.targetPath, fileName);

                fs.copyFileSync(targetFullPath, saveFullPath);
                console.log(targetFullPath, ' 는 ', saveFullPath, '로 복사됨');

                this.initFileList();
            },

            moveFile(fileName) {
                const dt = this.getDateForPath();

                const tmpSavePath = path.join(this.savePath, dt.yyyy, dt.mm, dt.dd);
                this.mkdirSyncRecursive(tmpSavePath); //폴더 생성

                const saveFullPath = path.join(tmpSavePath, fileName);
                if (fs.existsSync(saveFullPath)) {
                    if (confirm('이미 파일이 존재합니다. 덮어쓰기 하시겠습니까?') == false) {
                        return;
                    }
                }

                const targetFullPath = path.join(this.targetPath, fileName);

                fs.renameSync(targetFullPath, saveFullPath);
                console.log(targetFullPath, ' 는 ', saveFullPath, '로 이동됨');

                this.initFileList();
            },
            deleteFile(fileName) {
                if (confirm('해당파일을 정말로 삭제하시겠습니까?') == false) {
                    return;
                }

                const targetFullPath = path.join(this.targetPath, fileName);
                fs.unlinkSync(targetFullPath);

                this.initFileList();
            }
        }
    }
</script>

<style scoped>

</style>
