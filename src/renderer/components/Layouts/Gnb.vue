<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand">
            M.F.M
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <!--<li class="nav-item active">-->
                    <!--<router-link to="/" class="nav-link">-->
                        <!--Home <span class="sr-only">(current)</span>-->
                    <!--</router-link>-->
                <!--</li>-->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        Files
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <router-link to="/file/target" class="dropdown-item">
                            Target
                        </router-link>
                        <router-link to="/file/save" class="dropdown-item">
                            Saved
                        </router-link>
                    </div>
                </li>
                <li class="nav-item">
                    <router-link to="/setting" class="nav-link">
                        Setting
                    </router-link>
                </li>

            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Gnb"
    }
</script>

<style scoped>

</style>
