<script setup>
import {onMounted, ref} from "vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import {useCategoryStore} from "@/stores/categoryStore";

const columns = ref(['ID', 'Ном'])
const categoryStore = useCategoryStore()


onMounted(async () => {
  try {
    await categoryStore.get()

  } catch (e) {
    throw e
  }
})

async function deleteCategory(id) {
  try {
    await categoryStore.remove(id)
  } catch (e) {
    throw e
  }
}

</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1 class="page__title">{{ $t('menu.category') }}</h1>
      <BaseButton @click="$router.push('/category/create')">{{ $t('category.create')}}</BaseButton>
    </div>
    <BaseTable
        :is-show-icon="true"
        :columns="columns"
        :rows="categoryStore.rows"
        :loading="categoryStore.isLoading"
        @delete="deleteCategory"
        @edit="$router.push('/category/edit/' + $event)"
    />
  </div>
</template>
