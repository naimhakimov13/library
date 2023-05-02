<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <header>
      {{ userStore.user.name }}
  </header>
</template>

<style lang='scss' scoped>

header {
  padding: 19px;
  border-bottom: 1px solid var(--gray-400);
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 15px;
  top: 0;
  width: calc(100% - 338px);
  background: var(--white);
  z-index: 10;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 50%;
  }

  ::v-deep(select) {
    padding: 3px;
  }
}
</style>
