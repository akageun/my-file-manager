<template>
    <v-container fluid>
        <v-layout>
            <v-flex
                    xs12
                    md12
            >
                <v-text-field
                        v-model="targetNm"
                        label="Target Name"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="fullPath"
                        label="Target Path"
                        required
                ></v-text-field>
            </v-flex>

        </v-layout>
        <v-layout>
            <v-flex
                    xs12
                    md12
            >
                <v-btn depressed small color="primary" @click="saveTargetPath()">SAVE</v-btn>

            </v-flex>
        </v-layout>
        <br>
        <v-layout row>
            <v-flex xs12 sm12>

                <v-list two-line subheader>
                    <v-subheader inset>Folders</v-subheader>

                    <v-list-tile
                            v-for="(value, key) in targetPathList" :key="value.key"
                            avatar
                            @click=""
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>{{ key }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ value }}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <div>
                                <v-btn icon >
                                    <v-icon color="red lighten-1" @click="deleteTargetFile(key)">delete_forever</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon color="purple lighten-1" @click="openFolder(value)">folder_open</v-icon>
                                </v-btn>
                            </div>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import StrUtils from '@/service/utils/StrUtils';
    import electron from 'electron';
    import path from 'path';

    export default {
        name: "index",
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
