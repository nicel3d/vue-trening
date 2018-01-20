<template>
    <div>
        <h1>Тренинг, уровень {{ level + 1 }}</h1>
        <hr>
        <div class="progress">
            <div class="progress-bar" :style="progressStyle" role="progressbar">{{ progressStyle.width }}</div>
        </div>
        <div class="box">
            <transition name="flip" mode="out-in">
                <app-start-screen v-if="state == 'start'"
                                  @onStart="onStart"
                ></app-start-screen>
                <app-question-screen v-else-if="state == 'question'"
                                     @success="onQuestionSuccess"
                                     @error="onQuestionError"
                                     :settings="levels[level]"
                ></app-question-screen>
                <app-message-screen v-else-if="state == 'message'"
                                    :type="message.type"
                                    :text="message.text"
                                    @onNext="onNext"
                ></app-message-screen>
                <app-result-screen v-else-if="state == 'result'"
                                   :stats="stats"
                                   @restart="onStart"
                                   @nextLevel="onNextLevel"
                                   :settings="levels[level+1]"
                ></app-result-screen>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                state: 'start',
                message:{
                    type: '',
                    text: ''
                },
                stats:{
                  success: 0,
                  error: 0,
                },
                level: 0,
                levels: [
                    {
                        from: 10,
                        to: 20,
                        range: 5,
                        variants: 2
                    },
                    {
                        from: 100,
                        to: 200,
                        range: 30,
                        variants: 4
                    },
                    {
                        from: 100,
                        to: 500,
                        range: 80,
                        variants: 6
                    },
                ],
                questionMax: 3,
            }
        },
        computed:{
          questionDone(){
              return this.stats.success + this.stats.error;
          },
            progressStyle(){
              return {
                  width: Math.round(this.questionDone / this.questionMax * 100, 2) + '%'
              }
            }
        },
        methods: {
            onStart(){
                this.stats.success = 0;
                this.stats.error = 0;
                this.state = 'question';
            },
            onQuestionSuccess(){
                this.message.type = 'success';
                this.message.text = 'продолжить ?';
                this.stats.success++;
                this.state = 'message';
            },
            onQuestionError(msg){
                this.message.type = 'danger';
                this.message.text = msg;
                this.stats.error++;
                this.state = 'message';
            },
            onNext(){
                if (this.questionDone < this.questionMax)
                    this.state = 'question';
                else
                    this.state = 'result';
            },
            onNextLevel(){
                this.level++;
                this.onStart();
            },
        },
        mounted() {
            this.$nextTick(() => {
                //        $('.navbar').hide();
            })
        }
    }
</script>

<style >
    h1{
        padding-top: 10px;
    }
    .box{
        padding-top: 10px;
    }
    .flip-enter{}
    .flip-enter-active{
        animation: flipInX 0.3s linear;
    }


    .flip-leave{}
    .flip-leave-active{
        animation: flipOutX 0.3s linear;
    }

    
    @keyframes flipInX {
        from{transform: rotateX(90deg);}
        to{transform: rotateX(0deg);}

    }
    
    @keyframes flipOutX {
        from{transform: rotateX(0deg);}
        to{transform: rotateX(90deg);}
    }
</style>
