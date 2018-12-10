<template>
    <div class="container-fluid">
        <div class="row">
            <lnb/>

            <div class="w-75">
                <div class="row no-gutters">
                    <div class="col-12">
                        <form id="configForm">
                            <div class="form-horizontal">

                                <div class="form-group">
                                    <label>Target Path</label>
                                    <input type="text" name="targetPath" class="form-control form-control-sm" v-model="targetPath"/>
                                </div>
                                <div class="form-group">
                                    <label>Save Path</label>
                                    <input type="text" name="savePath" class="form-control form-control-sm" v-model="savePath"/>
                                </div>
                            </div>
                        </form>

                        <div class="row">
                            <div class="col-12">
                                <a class="btn btn-outline-warning btn-sm" @click="saveFileConf()">SAVE</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Lnb from "../lnb";
    import StrUtils from '@/service/utils/StrUtils';
    import Store from 'electron-store';

    const settingConf = new Store({name: 'settingConf'});

    export default {
        name: "index",
        components: {Lnb},
        data() {
            return {
                targetPath: '',
                savePath: ''
            }
        },
        created() {
            const confJson = settingConf.get('file');

            this.targetPath = confJson.targetPath;
            this.savePath = confJson.savePath;
        },
        methods: {
            saveFileConf() {
                if (StrUtils.isEmpty(this.targetPath)) {
                    alert("Target Path를 입력해주세요.");
                }

                if (StrUtils.isEmpty(this.savePath)) {
                    alert("Save Path를 입력해주세요.");
                }

                settingConf.set('file', {targetPath: this.targetPath, savePath: this.savePath});
            }
        }
    }
</script>

<style scoped>

</style>

