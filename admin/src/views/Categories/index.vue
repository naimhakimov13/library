<script setup>
import { computed, onMounted, ref } from 'vue'
import BaseTable from '@/components/ui/BaseTable.vue'
import { getCategories, deleteCategory } from '@/services/http.service'

const columns = ref(['ID', 'Ном'])
const categories = ref([])

const rows = computed(() => {
  return categories.value.map(item => ({
    cells: [
      item._id,
      item.name
    ]
  }))
})

onMounted(() => {
  getCategoryList()
})

async function getCategoryList() {
  categories.value = await getCategories()
}

async function removeCategory(id) {
  await deleteCategory(id)
  await getCategoryList()
}

</script>

<template>
  <div>
    <div class='flex justify-between'>
      <h1 class='page__title'>{{ $t('menu.category') }}</h1>
      <BaseButton @click="$router.push('/category/create')">{{ $t('category.create') }}</BaseButton>
    </div>
    <BaseTable
      :is-show-icon='true'
      :columns='columns'
      :rows='rows'
      @delete='removeCategory'
      @edit="$router.push('/category/edit/' + $event)"
    />
  </div>
</template>
