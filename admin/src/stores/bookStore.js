import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { getBooks, deleteBook, updateBookById, createBook } from '@/services/http.service'
import { toast } from '@/plugins/toast'

export const useBookStore = defineStore('books', () => {
  const books = ref({ content: [], pageSize: 10, currentPage: 0, items: 0 })
  const isLoading = ref(false)
  const isError = ref(null)

  const rows = computed(() => {
    return books.value.content.map(item => ({
      cells: [
        item._id,
        item.barcode,
        item.title,
        item.author,
        item.count_page,
        item.release_year,
        item.status ? '<span class="badge badge-success">Дар китобхона</span>' : '<span class="badge badge-warning">Дар даст</span>'
      ]
    }))
  })

  async function get() {
    try {
      if (!books.value.content.length) {
        isLoading.value = true
        books.value = await getBooks()
        isLoading.value = false
      }
    } catch (err) {
      isLoading.value = false
      throw err
    }
  }

  async function create(book) {
    try {
      await createBook(book)
      await get()
    } catch (err) {
      throw err
    }
  }

  async function remove(id) {
    try {
      await deleteBook(id)
      toast.success('Успешно удаленно')
      books.value.content = books.value.content.filter(book => book._id !== id)
    } catch (err) {
      throw err
    }
  }

  async function update(id, book) {
    try {
      await updateBookById(id, book)
      await resetBookList()
      toast.success('Успешно обновлён')
    } catch (err) {
      throw err
    }
  }

  async function resetBookList() {
    try {
      books.value.content = []
      await get()
    } catch (err) {
      throw err
    }
  }

  return { books, rows, isLoading, isError, get, create, remove, update }
})
