<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseTable from '@/components/ui/BaseTable.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { getBooks, deleteBook } from '@/services/http.service'

const columns = ref(['ID', 'Категория', 'Ном', 'муаллиф', 'Микдори саҳифа', 'Оғози эътибор', 'Микдор'])
const router = useRouter()
const books = ref([])

const rows = computed(() => {
  return books.value.map(item => ({
    cells: [
      item._id,
      item.category_id?.name,
      item.title,
      item.author,
      item.count_page,
      item.release_year,
      item.quantity
    ]
  }))
})

onMounted( () => {
  getBookList()
})

async function getBookList() {
  try {
    const data = await getBooks()
    books.value = data.content
  } catch (e) {
    throw e
  }
}

async function remove(id) {
  try {
    await deleteBook(id)
    await getBookList()
  } catch (e) {
    throw e
  }
}

function editBook(id) {
  router.push('/books/edit/' + id)
}
</script>

<template>
  <div>
    <div class='flex justify-between'>
      <h1 class='page__title'>{{ $t('menu.book') }}</h1>
      <BaseButton color='primary' @click="router.push('/books/create')">
        {{ $t('book.create') }}
      </BaseButton>
    </div>
    <BaseTable
      :is-show-icon='true'
      :columns='columns'
      :rows='rows'
      @delete='remove'
      @edit='editBook'
    />
  </div>
</template>
