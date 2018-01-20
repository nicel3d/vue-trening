<template>
    <div>
        <span class="timer-element" :class="renTimerField">Время: {{ timerField }} сек.</span>
        <div class="alert">
            <h3>{{ x }} + {{ y }} = ?</h3>
            <hr>
            <div class="buttons">
                <div class="btn btn-success"
                     v-for="item in answers"
                     @click="onAnswer(item)"
                >
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['settings'],
        data() {
            return {
                timerField: 10,
                renTimerField: '',
                timerFieldError: 5,
                x: mtRand(this.settings.from, this.settings.to),
                y: mtRand(this.settings.from, this.settings.to)
            }
        },
        computed: {
            good() {
                return this.x + this.y;
            },
            answers() {
                let res = [this.good];
                while (res.length < this.settings.variants) {
                    let num = mtRand(this.good - this.settings.range, this.good + this.settings.range);
                    if (num !== this.good) {
                        res.push(num);
                    }
                }
                setInterval(() => {
                    if (this.timerField > 0) {
                        this.renTimerField = this.renTimer();
                        this.timerField--;
                    } else
                        this.onAnswer(-this.good);
                }, 1000);
                return res.sort(() => {
                    return Math.random() > 0.5
                });
            }
        },
        methods: {
            renTimer(){
                let elem = '';
                if (this.timerFieldError >= this.timerField)
                    elem = 'alert-danger';
                return elem;
            },
            onAnswer(num) {
                if (parseFloat(num) === this.good) {
                    this.$emit('success');
                } else {
                    this.$emit('error', `${this.x} + ${this.y} = ${this.good}!`);
                }
            }
        }
    }

    function mtRand(min, max) {
        let diff = min - max;
        return Math.floor(Math.random() * (diff + 1) + min)
    }
</script>

<style scoped>
    .timer-element{
        position: relative;
        display: block;
        text-align: right;
        padding-top: 5px;
        padding-bottom: 10px;
    }

    .alert {
        padding-top: 20px;
        background-color: #eee;
        text-align: center;
    }

    .buttons {
        display: flex;
        justify-content: space-around
    }

    .btn, h3 {
        margin: 30px 0;
    }
</style>
