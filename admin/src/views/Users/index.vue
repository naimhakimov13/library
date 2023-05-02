<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/userStore'
import BaseTable from '@/components/ui/BaseTable.vue'

const router = useRouter()
const columns = ['ID', 'Ном', 'Email', 'Телефон', 'Ҷинс']

const userStore = useUserStore()

onMounted(async () => {
  await userStore.get()
})

function editUserById(id) {
  router.push(`/users/edit/${id}`)
}

async function deleteUserById(id) {
  await userStore.deleteUserById(id)
}
</script>

<template>
  <div>
    <div class='flex justify-between'>
      <h1>{{ $t('menu.users') }}</h1>
      <BaseButton @click="router.push('/users/create')">{{ $t('user.create') }}</BaseButton>
    </div>


    <BaseTable
      :is-show-icon='true'
      :loading='userStore.isLoading'
      :columns='columns'
      :rows='userStore.rows'
      @edit='editUserById'
      @delete='deleteUserById'
    >
    </BaseTable>
  </div>
</template>

