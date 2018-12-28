<template>
    <div class="container-fluid">
        <div class="row">
            <lnb/>

            <div class="w-75">
                <div class="row no-gutters">
                    <div class="col-12">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label>Save Path</label>
                                <input type="text" name="savePath" class="form-control form-control-sm" v-model="fullPath"/>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <a class="btn btn-outline-warning btn-xs" @click="saveFileConf()">SAVE</a>
                                <a class="btn btn-outline-info btn-xs" @click="openFolder(fullPath)">Open Folder</a>
                            </div>
                        </div>
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
                fullPath: ''
            }
        },
        created() {
            const settingConf = this.$cmnModule.settingConf();

            const confJson = settingConf.get('savePath');
            this.fullPath = confJson.fullPath;
        },
        methods: {
            saveFileConf() {
                if (StrUtils.isEmpty(this.fullPath)) {
                    alert("Save Path를 입력해주세요.");
                }

                const settingConf = this.$cmnModule.settingConf();
                settingConf.set('savePath', {fullPath: this.fullPath});
                console.log("저장완료");
            },
            openFolder(goPath) {
                electron.shell.openItem(path.join(goPath));
            }
        }
    }
</script>

<style scoped>

</style>
