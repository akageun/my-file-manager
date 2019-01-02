<template>
    <div>
        <v-navigation-drawer
                persistent
                :clipped="clipped"
                v-model="drawer"
                enable-resize-watcher
                fixed
                app
        >
            <v-list>
                <v-list-tile
                        value="true"
                        v-for="(item, i) in items"
                        :key="i"
                >
                    <v-list-tile-action>
                        <router-link class="white--text" :to="item.link">
                            <v-icon v-html="item.icon"></v-icon>
                        </router-link>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link class="white--text" :to="item.link">
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </router-link>
                    </v-list-tile-content>

                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                app
                :clipped-left="clipped"
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <router-link class="white--text" to="/">
                <v-toolbar-title v-text="title"></v-toolbar-title>
            </router-link>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        name: "Gnb",
        data() {
            return {
                clipped: false,
                drawer: false,
                items: [
                    {
                        icon: 'bubble_chart',
                        title: 'Home',
                        link: '/'
                    },
                    {
                        icon: 'bubble_chart',
                        title: 'Target File List',
                        link: '/file/target'
                    },
                    {
                        icon: 'bubble_chart',
                        title: 'Saved File List',
                        link: '/file/save'
                    },
                    {
                        icon: 'bubble_chart',
                        title: 'Setting Save Path',
                        link: '/setting/file/save/path'
                    },
                    {
                        icon: 'bubble_chart',
                        title: 'Setting Target Path',
                        link: '/setting/file/target/path'
                    },
                    {
                        icon: 'bubble_chart',
                        title: 'Setting Tag Manage',
                        link: '/setting/tags'
                    }
                ],
                rightDrawer: false,
                title: 'M.F.M'
            }
        },
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
