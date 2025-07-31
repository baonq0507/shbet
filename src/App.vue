<script setup>
import { theme } from 'ant-design-vue';

</script>

<template>
  <a-config-provider
    :theme="{
      algorithm: theme.darkAlgorithm,
    }"
  >
    <router-view> </router-view>
  </a-config-provider>
</template>
