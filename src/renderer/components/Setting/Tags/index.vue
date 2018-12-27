<template>
    <div class="container-fluid">
        <div class="row">
            <lnb/>

            <div class="w-75">
                <div class="row no-gutters pt-3">
                    <div class="col-12">
                        <div class="form-inline">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" v-model="tagName" placeholder="Tag Name"/>
                                <select class="form-control form-control-sm" v-model="tagColor">
                                    <option value="">==COLOR==</option>
                                    <option v-for="color in labelColor">
                                        {{color}}
                                    </option>
                                </select>
                                <button class="btn btn-outline-success btn-sm" @click="saveTag()">저장</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row no-gutters">
                    <div class="col-12">

                        <ul id="list-group-ul" class="list-group">
                            <li class="list-group-item" v-for="tag in tagList">
                                <span class="badge" :class="tag.tagColor">{{tag.tagName }}</span>
                                <div class="float-right">
                                    <a class="btn btn-outline-warning btn-xs" @click="openModifyTag(tag)">MODIFY</a>
                                    <a class="btn btn-outline-dark btn-xs" @click="deleteTag(tag)">DELETE</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="modifyModalFrm" onsubmit="return false;">
                            <input type="hidden" v-model="modifyTagId"/>
                            <div class="form-group">
                                <label for="tag_name" class="col-form-label">Tag Name</label>
                                <input type="text" class="form-control form-control-sm" v-model="modifyTagName" id="tag_name"/>
                            </div>
                            <div class="form-group">
                                <label for="tag_color">Color</label>
                                <select id="tag_color" class="form-control form-control-sm" v-model="modifyTagColor">
                                    <option v-for="color in labelColor">
                                        {{color}}
                                    </option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="modifyTag">Modify</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
                labelColor: ['badge-primary', 'badge-info', 'badge-secondary', 'badge-success', 'badge-danger', 'badge-warning', 'badge-light', 'badge-dark'],
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
                tagDb.remove({_id: tag._id}, function (err, docs) {
                    if (err) {
                        throw err;
                    }

                    this.initTagList();
                });
            },
            getTagJson(tag) {
                let tmpJson = {};

                return tmpJson;
            }
        }
    }
</script>

<style scoped>

</style>
