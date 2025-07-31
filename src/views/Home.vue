<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Register from '@components/modal/Register.vue';
import Header from '@components/Header.vue';
import Navigation from '@components/Navigation.vue';
import Login from '@components/modal/Login.vue';

const registerModal = ref(false);
const loginModal = ref(false);

const handleOpenLoginPopup = () => {
    loginModal.value = true;
}

const handleOpenRegisterPopup = () => {
    registerModal.value = true;
}

</script>

<template>
    <Header @open-login-popup="handleOpenLoginPopup" @open-register-popup="handleOpenRegisterPopup"/>
    <Navigation @open-login-popup="handleOpenLoginPopup"/>

    <Register v-model:visible="registerModal" />
    <Login v-model:visible="loginModal" />
</template>