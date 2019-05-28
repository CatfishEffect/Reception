<template>
    <div @contextmenu="stop($event)" id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',

        methods: {
            stop(ev) {
                ev.preventDefault();
            },

        }
    }
</script>

<style>
    /*隐藏竖向滚动条*/
    ::-webkit-scrollbar {
        display: none
    }

    #app {
        font-family: Helvetica;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select, figure {
        margin: 0;
        padding: 0;
    }

    img {
        vertical-align: middle;
        border: none
    }

    input, button {
        outline: none;
        border: none;
        background-color: transparent;
    }
</style>
