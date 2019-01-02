<template>
    <v-container fluid>
        <v-layout>
            <v-flex
                    xs12
                    md12
            >
                <v-text-field
                        v-model="fullPath"
                        label="Save Path"
                        required
                ></v-text-field>
            </v-flex>

        </v-layout>
        <v-layout>
            <v-flex
                    xs12
                    md12
            >
                <v-btn depressed small color="primary" @click="saveFileConf()">SAVE</v-btn>
                <v-btn depressed small color="purple" @click="openFolder(fullPath)">Open Folder</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
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
