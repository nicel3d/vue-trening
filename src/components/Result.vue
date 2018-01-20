<template>
  <div>
    <div class="alert alert-primary">
      <h3>Правельных: {{ stats.success }}</h3>
      <h3>Ошибок: {{ stats.error }}</h3>
      <hr>
      <button class="btn btn-primary"
              @click="$emit('restart')"
      >Заного</button>
      <button class="btn btn-primary"
              v-if="!stats.error && levelActive"
              @click="$emit('nextLevel')"
      >Следующий урововень</button>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['stats', 'settings'],
        data () {
            return{

            }
        },
        computed:{
            levelActive(){
                return typeof(this.settings) === 'object' ? 1 : 0
            }
        }
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
