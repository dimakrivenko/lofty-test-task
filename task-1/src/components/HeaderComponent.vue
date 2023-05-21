<template>
    <header class="header">
        <div class="wrapper">
            <div class="logo">
                <span>Logo</span>
            </div>
            <div class="actions">
                <button  
                    class="btn btn-primary"
                    @click="onModalOpen()"
                >Sign Up</button>
            </div>
        </div>

        <Teleport to="body">
            <modal :show="showModal" @close="showModal = false"></modal>
        </Teleport>
    </header>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import Modal from './modals/ModalSignUpComponent.vue'

export default defineComponent({
    name: 'HeaderComponent',
    components: {
        Modal
    },
    setup(props) {
        const showModal = ref<boolean>(false);

        return {
            showModal,
        }
    },
    methods: {
        onModalOpen() {
            this.showModal = !this.showModal
        }
    }
});
</script>
