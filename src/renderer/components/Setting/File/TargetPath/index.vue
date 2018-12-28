<template>
    <div class="container-fluid">
        <div class="row">
            <lnb/>

            <div class="w-75 pr-3">
                <div class="row no-gutters">
                    <div class="col-12 ">
                        <div class="form-horizontal  mt-3">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" v-model="targetNm" placeholder="Target Name"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" v-model="fullPath" placeholder="Target Path"/>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <a class="btn btn-outline-warning btn-sm" @click="saveTargetPath()">SAVE</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row no-gutters">
                    <div class="col-12 ">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" v-for="(value, key) in targetPathList" :key="value.key">
                                <b>{{key}}</b> : {{value}}
                                <div class="float-right">
                                    <a class="btn btn-outline-info btn-xs" @click="deleteTargetFile(key)">DELETE</a>
                                    <a class="btn btn-outline-info btn-xs" @click="openFolder(value)">Open Folder</a>
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
    import Lnb from "../../lnb";
    import StrUtils from '@/service/utils/StrUtils';
    import electron from 'electron';
    import path from 'path';

    export default {
        name: "index",
        components: {Lnb},
        data() {
            return {
                targetPathList: [],
                targetNm: '',
                fullPath: ''
            }
        },
        created() {
            const settingConf = this.$cmnModule.settingConf();

            const confJson = settingConf.get('targetPath');
            this.targetPathList = confJson;

        },
        methods: {
            saveTargetPath() {
                if (StrUtils.isEmpty(this.targetNm)) {
                    alert("Target Name을 입력해주세요.");
                }

                if (StrUtils.isEmpty(this.fullPath)) {
                    alert("Save Path를 입력해주세요.");
                }

                const settingConf = this.$cmnModule.settingConf();

                const confJson = settingConf.get('targetPath');

                confJson[this.targetNm] = this.fullPath;

                settingConf.set('targetPath', confJson);
                console.log("저장완료");

                this.targetPathList = confJson;

            },
            deleteTargetFile(key) {
                const settingConf = this.$cmnModule.settingConf();
                const confJson = settingConf.get('targetPath');
                delete confJson[key];

                settingConf.set('targetPath', confJson);

                this.targetPathList = confJson;
            },

            openFolder(goPath) {
                electron.shell.openItem(path.join(goPath));
            }
        }
    }
</script>

<style scoped>

</style>
