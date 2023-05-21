

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask" >
            <div class="modal-overlay" @click="hide()"></div>
            <div class="modal-container">
                <button class="modal-close-btn" @click="hide()">X</button>
                <h2>Sign Up</h2>
                <form class="form" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="username" placeholder="Username">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" v-model="password" placeholder="Password">
                    </div>

                    <button
                        class="btn btn-primary btn-submit"
                        :class="{ 'loading' : status == 'loading', 'success' : status == 'success' }"
                    >
                        <span v-if="status == 'success'">Success</span>
                        <span v-else>Send</span>
                    </button>
                </form>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'ModalSignUpComponent',
    props: {
        show: Boolean
    },
    setup(props) {
        const username = ref<string>(),
            password = ref<string>(),
            status = ref<string>()

        return {
            username, password, status
        }
    },
    methods: {
        hide() {
            this.$emit('close');
        },
        async onSubmit() {
            this.status = 'loading'

            try {
                const post = await fetch('https://dummyjson.com/posts/1')

                post.json()
                    .then(item => {
                        if (item) {
                            this.username = ''
                            this.password = ''
                            this.status = 'success'

                            console.log(item);
                            

                            setTimeout(() => {
                                this.hide()
                                this.status = ''
                            }, 2000);
                        }
                    });
            } catch (error) {
                console.log(error);
                
            }
        }
    }
});
</script>

<style scoped lang="scss">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 20px;
}
.modal-overlay {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
}
.modal-container {
    position: relative;
    z-index: 4;
    width: 360px;
    margin: auto;
    padding: 40px;
    background-color: #313131;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    h2 { 
        font-size: 26px;
        line-height: 1.1;
        margin: 0 0 25px 0;
    }
}



.modal-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    border: none;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    background-color: transparent;
    cursor: pointer;
    transition: .2s ease;
    &:hover {
        color: $c-primary;
    }
}

.btn-submit {
    min-width: 140px;
}

</style>