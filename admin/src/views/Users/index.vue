<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseTable from '@/components/ui/BaseTable.vue'
import { getUsers } from '@/services/http.service'

const router = useRouter()
const columns = ['ID', 'Ном', 'Email', 'Телефон', 'Ҷинс']
const users = ref([])

const rows = computed(() => {
  return users.value.map(item => ({
    cells: [
      item._id,
      item.name,
      item.email,
      item.phone,
      item.gender
    ]
  }))
})

onMounted(async () => {
  const data = await getUsers()
  users.value = data.content
})

function editUserById(id) {
  router.push(`/users/edit/${id}`)
}

async function deleteUser(id) {
  await deleteUserById(id)
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
      :columns='columns'
      :rows='rows'
      @edit='editUserById'
      @delete='deleteUser'
    >
    </BaseTable>
  </div>
</template>

