<template>
    <v-container fluid>
        <v-layout>
            <v-flex
                    xs12
                    md12
            >
                <v-toolbar-title>Save File Data</v-toolbar-title>
                <hr>
                <v-list>
                    <v-list-group
                            v-for="file in listSoredItem"
                            v-model="file.clicked"
                            :key="file.fileName"
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>{{file.fileName | liveSubstr}}</v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <tag_badge :tags="file.tags" :tag_list="tagList"/>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-sub-title>{{file.memo}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-btn icon @click="openFolder(file)">
                                <v-icon>folder_open</v-icon>
                            </v-btn>
                        </v-list-tile>
                    </v-list-group>
                </v-list>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import path from 'path';
    import electron from 'electron';
    import tag_badge from './tag_badge';

    export default {
        name: "index",
        components: {tag_badge},
        data() {
            return {
                tagList: [],
                saveFileList: []
            }
        },
        filters: {
            liveSubstr(str) {
                if (str.length < 80) {
                    return str;
                }
                return str.substring(0, 80) + '...';
            },

        },
        computed: {
            listSoredItem: function () {
                return this.saveFileList;
            }
        },
        created() {
            this.initSaveFileList();
        },
        methods: {
            // openFileDetailInfo(file) {
            //     if (file.hasOwnProperty('clicked')) {
            //         file.clicked = !file.clicked;
            //     } else {
            //         file = Object.assign({}, file, {clicked: true});
            //     }
            //     console.log(file);
            //
            // },
            async initSaveFileList() {
                const tagDb = this.$cmnModule.tagDbConf();
                let vm = this;
                tagDb.find({}, function (err, docs) {
                    vm.tagList = docs;
                });

                this.getSaveFileDbFind().then(result => {
                    this.saveFileList = result;
                })
            },
            getSaveFileDbFind() {
                const db = this.$cmnModule.fileDbConf();

                return new Promise(function (resolve, reject) {
                    db.find({}, function (err, docs) {
                        if (err) {
                            throw err;
                        }
                        let saveFileList = docs;

                        saveFileList.forEach(function (file) {
                            file.clicked = false;
                        });

                        resolve(saveFileList);
                    });


                });
            },

            openFolder(file) {
                electron.shell.openItem(path.join(file.savePath, file.yyyy, file.mm, file.dd));
            }
        }

    }
</script>

<style scoped>

</style>
