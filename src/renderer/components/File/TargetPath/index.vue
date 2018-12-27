<template>
    <div class="container-fluid">
        <div class="row">
            <div class="w-20 pr-2">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(value, key) in targetPathList">
                        <a class="cursor-pointer" @click="chgTargetPath(value)">{{key}}</a>
                    </li>
                </ul>
            </div>

            <div class="w-80">
                <div v-if="selectedTargetPath !== ''">
                    <div class="row no-gutters">
                        <div class="col-12">
                            <p>
                                <b>Target Directory</b> : {{selectedTargetPath}}
                            </p>
                        </div>
                    </div>
                    <div class="row no-gutters mb-2">
                        <div class="col-2">
                            <select v-model="sortType" class="form-control form-control-sm">
                                <option value="FILENAME_ASC">FileNm ASC</option>
                                <option value="FILENAME_DESC">FileNm DESC</option>
                            </select>
                        </div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col-12">
                            <ul id="list-group-ul" class="list-group">
                                <li class="list-group-item" v-for="file in listSoredItem">
                                    {{file.fileName | liveSubstr}}
                                    <div class="float-right" v-if="file.isDirectory === false">

                                        <a class="btn btn-outline-info btn-xs" @click="infoFile(file)">INFO</a>
                                        <a class="btn btn-outline-warning btn-xs" @click="openSaveFileModal(file)">MOVE</a>
                                        <a class="btn btn-outline-danger btn-xs" @click="deleteFile(file.fileName)">DELETE</a>
                                    </div>
                                    <div v-show="file.clicked">
                                        <file_stat :file_stat="file.statInfo"/>
                                    </div>
                                </li>
                            </ul>
                        </div>
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
                                <label class="col-form-label">Memo</label>
                                <textarea class="form-control" v-model="modal_file_memo" style="resize: none" rows="5"></textarea>
                            </div>
                            <div class="form-group">
                                <v-select v-model="tagSelectedList" :options="tagList" multiple></v-select>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label"> Type </label>
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
                        <button type="button" class="btn btn-primary" @click="transfer">Trans</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import file_stat from "./file_stat_tmpl";
    import fs from 'fs';
    import path from 'path';
    import $ from 'jquery';

    export default {
        name: "index",
        components: {
            file_stat
        },
        data() {
            return {
                targetPathList: [],
                selectedTargetPath: '',
                sortType: 'FILENAME_ASC',
                fileList: {},
                modal_file_name: '',
                tagSelectedList: [],
                tagList: [],
                transType: 'COPY',
                savePath: '',
                modal_file_memo: '',

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
        computed: {
            listSoredItem: function () {
                const vm = this;
                this.fileList.sort(function (a, b) {
                    let rtnValue = 0;
                    if (vm.sortType === 'FILENAME_DESC') {
                        rtnValue = vm.sortFileNameDesc(a, b);
                    } else {
                        rtnValue = vm.sortFileNameAsc(a, b);
                    }

                    return rtnValue;
                });
                return this.fileList;
            }
        },
        created() {
            const settingConf = this.$cmnModule.settingConf();
            const confJson = settingConf.get('targetPath');
            this.targetPathList = confJson;

            const savePath = settingConf.get('savePath');

            this.savePath = savePath.fullPath;
        },

        methods: {
            sortFileNameAsc(a, b) {
                if (a.fileName < b.fileName) {
                    return -1;
                }
                if (a.fileName > b.fileName) {
                    return 1;
                }
                return 0;
            },
            sortFileNameDesc(a, b) {
                if (a.fileName > b.fileName) {
                    return -1;
                }
                if (a.fileName < b.fileName) {
                    return 1;
                }
                return 0;
            },
            chgTargetPath(fullPath) {
                this.selectedTargetPath = fullPath;
                this.getFileList();
            },
            infoFile(file) {
                if (file.hasOwnProperty('clicked')) {
                    file.clicked = !file.clicked;
                } else {
                    file = Object.assign({}, file, {clicked: true});
                }
            },
            getFileList() {
                if (this.selectedTargetPath == '') {
                    return;
                }

                let list = [];
                const tmpBaseDir = this.selectedTargetPath;
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
            deleteFile(fileName) {
                if (confirm('해당파일을 정말로 삭제하시겠습니까?') == false) {
                    return;
                }

                const targetFullPath = path.join(this.selectedTargetPath, fileName);
                fs.unlinkSync(targetFullPath);

                this.getFileList();
            },
            openSaveFileModal(file) {
                this.modal_file_name = file.fileName;

                $("#exampleModal").modal({
                    backdrop: 'static'
                });

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
            saveFileDb(fileJson) {
                const db = this.$cmnModule.fileDbConf();

                db.insert(fileJson, function (err, newDocs) {
                    if (err) {
                        throw err;
                    }

                    console.log(newDocs);
                });
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
            transfer() {
                let tagJson = [];
                for (const test of this.tagSelectedList) {
                    tagJson.push(test.value);
                }
                console.log(tagJson);

                const dt = this.getDateForPath();
                console.log(dt);
                const tmpSavePath = path.join(this.savePath, dt.yyyy, dt.mm, dt.dd);
                this.mkdirSyncRecursive(this.savePath, path.join(dt.yyyy, dt.mm, dt.dd)); //폴더 생성
                console.log(tmpSavePath);
                const saveFullPath = path.join(tmpSavePath, this.modal_file_name);
                if (fs.existsSync(saveFullPath)) {
                    if (confirm('이미 파일이 존재합니다. 덮어쓰기 하시겠습니까?') == false) {
                        return;
                    }
                }

                console.log(saveFullPath);

                let fileJson = {};
                fileJson['savePath'] = this.savePath;
                fileJson['yyyy'] = dt.yyyy;
                fileJson['mm'] = dt.mm;
                fileJson['dd'] = dt.dd;
                fileJson['fileName'] = this.modal_file_name;
                fileJson['memo'] = this.modal_file_memo;

                if (tagJson.length > 0) {
                    fileJson['tags'] = tagJson;
                }

                const targetFullPath = path.join(this.selectedTargetPath, this.modal_file_name);

                if (this.transType === 'MOVE') {
                    fs.renameSync(targetFullPath, saveFullPath);
                    console.log(targetFullPath, ' 는 ', saveFullPath, '로 이동됨');
                } else if (this.transType === 'COPY') {
                    fs.copyFileSync(targetFullPath, saveFullPath);
                    console.log(targetFullPath, ' 는 ', saveFullPath, '로 복사됨');
                }

                this.getFileList();
                this.saveFileDb(fileJson);

                $('#exampleModal').modal('toggle');
            }
        }
    }
</script>

<style scoped>

</style>
