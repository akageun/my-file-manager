<template>
    <div class="container-fluid">
        <div class="row">
            <Lnb/>

            <div class="w-80">
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

                                    <a class="btn btn-outline-info btn-xs" @click="infoFile(file)">INFO</a>
                                    <!--<a class="btn btn-outline-success btn-xs" @click="copyFile(file.fileName)">COPY</a>-->
                                    <!--<a class="btn btn-outline-warning btn-xs" @click="moveFile(file.fileName)">MOVE</a>-->
                                    <a class="btn btn-outline-warning btn-xs" @click="saveFile(file)">MOVE</a>
                                    <a class="btn btn-outline-danger btn-xs" @click="deleteFile(file.fileName)">DELETE</a>
                                </div>

                                <div v-if="file.clicked">
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
        </div>

        <div class="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="saveFileModalFrm" onsubmit="return false;">
                            <div class="form-group">
                                <p>{{modal_file_name}}</p>
                            </div>
                            <div class="form-group">
                                <label for="memo" class="col-form-label">Memo</label>
                                <textarea class="form-control" id="memo" name="memo" style="resize: none" rows="5"></textarea>
                            </div>
                            <div class="form-group">
                                <v-select v-model="tagSelectedList" :options="tagList" multiple></v-select>
                            </div>
                            <div class="form-group">
                                <label for="memo" class="col-form-label"> Type </label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" v-model="transType" type="radio" name="transType" id="copy_trans" value="COPY"
                                           checked>
                                    <label class="form-check-label" for="copy_trans">COPY</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" v-model="transType" type="radio" name="transType" id="move_trans" value="MOVE">
                                    <label class="form-check-label" for="move_trans">MOVE</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="trans">Trans</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Lnb from "../lnb";
    import fs from 'fs';
    import path from 'path';
    import $ from 'jquery';

    export default {
        name: "index",
        components: {Lnb, "vue-select": require("vue-select")},
        data() {
            return {
                targetPath: '',
                savePath: '',
                fileList: {},
                modal_file_name: '',
                tagSelectedList: [],
                tagList: [],
                transType: 'COPY'

            }
        },
        filters: {
            liveSubstr: function (str) {
                if (str.length < 50) {
                    return str;
                }
                return str.substring(0, 50) + '...';
            }
        },
        created() {
            const confJson = this.$cmnModule.settingConf().get('file');

            this.targetPath = confJson.targetPath;
            this.savePath = confJson.savePath;

            this.initFileList();
        },
        methods: {
            trans() {
                let tagJson = [];
                for (const test of this.tagSelectedList) {
                    tagJson.push(test.value);
                }
                console.log(tagJson);

                const dt = this.getDateForPath();

                const tmpSavePath = path.join(this.savePath, dt.yyyy, dt.mm, dt.dd);
                this.mkdirSyncRecursive(this.savePath, path.join(dt.yyyy, dt.mm, dt.dd)); //폴더 생성

                const saveFullPath = path.join(tmpSavePath, this.modal_file_name);
                if (fs.existsSync(saveFullPath)) {
                    if (confirm('이미 파일이 존재합니다. 덮어쓰기 하시겠습니까?') == false) {
                        return;
                    }
                }

                let fileJson = {};
                fileJson['savePath'] = this.savePath;
                fileJson['yyyy'] = dt.yyyy;
                fileJson['mm'] = dt.mm;
                fileJson['dd'] = dt.dd;
                fileJson['fileName'] = this.modal_file_name;

                if (tagJson.length > 0) {
                    fileJson['tags'] = tagJson;
                }

                const targetFullPath = path.join(this.targetPath, this.modal_file_name);

                if (this.transType === 'MOVE') {
                    fs.renameSync(targetFullPath, saveFullPath);
                    console.log(targetFullPath, ' 는 ', saveFullPath, '로 이동됨');

                } else if (this.transType === 'COPY') {
                    fs.copyFileSync(targetFullPath, saveFullPath);
                    console.log(targetFullPath, ' 는 ', saveFullPath, '로 복사됨');

                }

                this.initFileList();
                this.saveFileDb(fileJson);

                $('#exampleModal').modal('toggle');
            },
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
            mkdirSyncRecursive(basicPath, createPath) {
                const path2 = createPath.replace(/\/$/, '').split(path.sep);
                console.log(path2);

                for (let i = 1; i <= path2.length; i++) {
                    const segment = path.join(basicPath, path2.slice(0, i).join('/'));
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

                //const targetFullPath = path.join(this.targetPath, file.fileName);

            },
            saveFile(file) {
                this.modal_file_name = file.fileName;

                $("#exampleModal").modal({
                    backdrop: 'static'
                })

                const tagDb = this.$cmnModule.tagDbConf();

                let vm = this;
                tagDb.find({}, function (err, docs) {
                    let tmpJson = [];

                    for (const jn of docs) {
                        let t = {};
                        t.value = jn._id;
                        t.label = jn.tagName;

                        tmpJson.push(t);
                    }

                    vm.tagList = tmpJson;

                });


            },

            deleteFile(fileName) {
                if (confirm('해당파일을 정말로 삭제하시겠습니까?') == false) {
                    return;
                }

                const targetFullPath = path.join(this.targetPath, fileName);
                fs.unlinkSync(targetFullPath);

                this.initFileList();
            },
            saveFileDb(fileJson) {
                const db = this.$cmnModule.fileDbConf();

                db.insert(fileJson, function (err, newDocs) {
                    if (err) {
                        throw err;
                    }

                    console.log(newDocs);
                });
            }
        }
    }
</script>

<style scoped>

</style>
