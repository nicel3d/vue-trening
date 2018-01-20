<template>
    <div>
        <div class="alert alert-success">
            <h3>Вы готовы ?</h3>
            <hr>
            <button class="btn btn-success"
                    @click="$emit('onStart')"
            >Начать
            </button>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .alert {
        text-align: center;
        margin: 20px 0;
    }

    h3, .btn {
        margin: 30px 0;
    }
</style>
