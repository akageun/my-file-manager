<template>
    <div class="container-fluid">
        <div class="row">
            <lnb/>

            <div class="w-75">
                <div class="row no-gutters">
                    <div class="col-12">
                        <div class="form-horizontal">

                            <div class="form-group">
                                <label>Target Path</label>
                                <input type="text" name="targetPath" class="form-control form-control-sm"/>
                            </div>
                            <div class="form-group">
                                <label>Save Path</label>
                                <input type="text" name="savePath" class="form-control form-control-sm"/>
                            </div>
                        </div>

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

    const Store = require("electron-store");
    const settingConf = new Store({name: 'settingConf'});

    export default {
        name: "index",
        components: {Lnb},
        methods: {
            saveFileConf() {

            }
        }
    }
</script>

<style scoped>

</style>
