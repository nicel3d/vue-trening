<template>
    <div>
        <div class="alert" :class="'alert-' + type">
            <h2>{{ text }}</h2>
            <hr>
            <button class="btn btn-primary" @click="$emit('onNext')">
                Продолжить
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['type', 'text'],
        data () {
            return{

            }
        },
    }
</script>

<style scoped>
    .alert{
        text-align: center;
    }
    .btn, h2{
        margin: 30px 0;
    }
</style>
