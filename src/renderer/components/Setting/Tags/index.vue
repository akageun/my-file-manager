<template>
    <v-container fluid>
        <v-layout>
            <v-flex
                    xs12
                    sm12
                    md12
                    d-flex
            >
                <v-text-field
                        v-model="tagName"
                        label="Tag Name"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex
                    xs12
                    sm12
                    md12
                    d-flex
            >
                <v-select
                        :items="labelColor"
                        label="Label Color"
                        outline
                        dark
                ></v-select>

            </v-flex>
        </v-layout>

    </v-container>

    <!--<div class="container-fluid">-->
        <!--<div class="row">-->

            <!--<v-chip-->
                    <!--v-model="chip3"-->
                    <!--close-->
                    <!--color="green"-->
                    <!--outline-->
            <!--&gt;Success</v-chip>-->

            <!--<div class="w-75">-->
                <!--<div class="row no-gutters pt-3">-->
                    <!--<div class="col-12">-->
                        <!--<div class="form-inline">-->
                            <!--<div class="form-group">-->
                                <!--<input type="text" id="add_tag_text" class="form-control form-control-sm" v-model="tagName" placeholder="Tag Name"-->
                                       <!--v-on:keyup.enter="enterEvent('ADD')"/>-->
                                <!--<select class="form-control form-control-sm" v-model="tagColor" id="add_tag_color">-->
                                    <!--<option value="">==COLOR==</option>-->
                                    <!--<option v-for="color in labelColor">-->
                                        <!--{{color}}-->
                                    <!--</option>-->
                                <!--</select>-->
                                <!--<button class="btn btn-outline-success btn-sm" @click="saveTag()">저장</button>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<hr>-->
                <!--<div class="row no-gutters">-->
                    <!--<div class="col-12">-->

                        <!--<ul id="list-group-ul" class="list-group">-->
                            <!--<li class="list-group-item" v-for="tag in tagList">-->
                                <!--<span class="badge" :class="tag.tagColor">{{tag.tagName }}</span>-->
                                <!--<div class="float-right">-->
                                    <!--<a class="btn btn-outline-warning btn-xs" @click="openModifyTag(tag)">MODIFY</a>-->
                                    <!--<a class="btn btn-outline-dark btn-xs" @click="deleteTag(tag)">DELETE</a>-->
                                <!--</div>-->
                            <!--</li>-->
                        <!--</ul>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">-->
            <!--<div class="modal-dialog modal-lg" role="document">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<h5 class="modal-title" id="exampleModalLabel">New message</h5>-->
                        <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
                            <!--<span aria-hidden="true">&times;</span>-->
                        <!--</button>-->
                    <!--</div>-->
                    <!--<div class="modal-body">-->
                        <!--<form id="modifyModalFrm" onsubmit="return false;">-->
                            <!--<input type="hidden" v-model="modifyTagId"/>-->
                            <!--<div class="form-group">-->
                                <!--<label for="tag_name" class="col-form-label">Tag Name</label>-->
                                <!--<input type="text" class="form-control form-control-sm" v-model="modifyTagName"-->
                                       <!--v-on:keyup.enter="enterEvent('MODIFY')" id="tag_name"/>-->
                            <!--</div>-->
                            <!--<div class="form-group">-->
                                <!--<label for="tag_color">Color</label>-->
                                <!--<select id="tag_color" class="form-control form-control-sm" v-model="modifyTagColor">-->
                                    <!--<option v-for="color in labelColor">-->
                                        <!--{{color}}-->
                                    <!--</option>-->
                                <!--</select>-->
                            <!--</div>-->
                        <!--</form>-->
                    <!--</div>-->
                    <!--<div class="modal-footer">-->
                        <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
                        <!--<button type="button" class="btn btn-primary" @click="modifyTag">Modify</button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
</template>

<script>
    import Lnb from "../lnb";
    import StrUtils from '@/service/utils/StrUtils';
    import $ from 'jquery';

    export default {
        name: "index",
        components: {
            Lnb
        },
        data() {
            return {
                labelColor: ['green', 'cyan', 'teal', 'lime', 'yellow', 'orange', 'purple', 'grey'],
                tagList: {},
                tagName: '',
                tagColor: '',
                modifyTagName: '',
                modifyTagId: '',
                modifyTagColor: '',
            }
        },
        created() {
            this.initTagList();
        },
        methods: {
            initTagList() {
                const tagDb = this.$cmnModule.tagDbConf();

                let vm = this;
                tagDb.find({}, function (err, docs) {
                    vm.tagList = docs;
                });

            },
            saveTag() {
                const tmpTagName = this.tagName;
                const tmpTagColor = this.tagColor;
                if (StrUtils.isEmpty(tmpTagName)) {
                    alert("Tag 명을 입력해주세요.");
                    document.getElementById("add_tag_text").focus();
                    return;
                }

                if (StrUtils.isEmpty(tmpTagColor)) {
                    alert("Tag 컬러를 선택해주세요.");
                    document.getElementById("add_tag_color").focus();
                    return;
                }

                const tagDb = this.$cmnModule.tagDbConf();
                let vm = this;
                tagDb.findOne({tagName: tmpTagName}, function (err, docs) {
                    if (err) {
                        throw err;
                    }

                    if (docs !== null && docs !== undefined) {
                        alert("이미 존재하는 태그명입니다.")
                        return;
                    }

                    tagDb.insert({tagName: tmpTagName, tagColor: tmpTagColor}, function (err, newDocs) {
                        if (err) {
                            throw err;
                        }

                        console.log(newDocs);

                        vm.initTagList();
                    });

                });


            },
            openModifyTag(tag) {
                this.modifyTagId = tag._id;
                this.modifyTagName = tag.tagName;
                this.modifyTagColor = tag.tagColor;

                $("#exampleModal").modal({
                    backdrop: 'static'
                })
            },
            modifyTag() {
                const tagDb = this.$cmnModule.tagDbConf();
                let vm = this;
                tagDb.update({_id: this.modifyTagId}, {tagName: this.modifyTagName, tagColor: this.modifyTagColor}, {}, function (err, numReplaced) {
                    console.log(numReplaced);
                    vm.initTagList();
                });


                $('#exampleModal').modal('toggle');

            },
            deleteTag(tag) {
                console.log(tag);
                if (confirm('정말로 삭제하시겠습니까?') === false) {
                    return;
                }

                const tagDb = this.$cmnModule.tagDbConf();
                const vm = this;
                tagDb.remove({_id: tag._id}, function (err, docs) {
                    if (err) {
                        throw err;
                    }

                    vm.initTagList();
                });
            },
            enterEvent(eventStr) {
                if (event.keyCode == 13) {
                    if (eventStr === 'ADD') {
                        this.saveTag();
                    } else if (eventStr === 'MODIFY') {
                        this.modifyTag();
                    }

                }
            }
        }
    }
</script>

<style scoped>

</style>
