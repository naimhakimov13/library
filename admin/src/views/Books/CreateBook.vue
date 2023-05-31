<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import { createBook, getBookById, removeFile, updateBookById, uploadFile, getCategories } from '@/services/http.service'
import { FILE_URL } from '@/utils/url.js'

const route = useRoute()
const router = useRouter()

const categories = ref([])
const loading = ref(false)
let formBook = reactive({
  title: null,
  author: null,
  description: null,
  lang: 'ru',
  quantity: null,
  release_year: null,
  count_page: null,
  category_id: null,
  image: null,
  pdf: null,
  price: null,
  isbn: null
})

onMounted(async () => {
  await getCategoryList()
  if (route.params.id) {
    const data = await getBookById(route.params.id)
    formBook.title = data.title
    formBook.author = data.author
    formBook.description = data.description
    formBook.lang = data.lang
    formBook.quantity = data.quantity
    formBook.release_year = data.release_year
    formBook.count_page = data.count_page
    formBook.category_id = data.category_id?._id
    formBook.image = data.image
    formBook.pdf = data.pdf
    formBook.price = data.price
    formBook.isbn = data.isbn
  }
})

async function getCategoryList() {
  categories.value = await getCategories()
}

async function changePhoto(event, type) {
  formBook[type] = await uploadFile(event)
}

async function onSubmit() {
  try {
    loading.value = true
    if (route.params.id) {
      await updateBookById(route.params.id, {
        ...formBook,
        category_id: formBook.category_id
      })

    } else {
      await createBook({
        ...formBook,
        category_id: formBook.category_id
      })
    }
    loading.value = false
    await router.push('/books')
  } catch (e) {
    loading.value = false
    throw e
  }
}

async function deleteFile(key, id) {
  await removeFile(id)
  formBook[key] = null
}
</script>

<template>
  <div class='create'>
    <BaseButton @click='router.back()'>Назад</BaseButton>
    <br />
    <br />
    <div class='page__title'>{{ route.params?.id ? 'Дохил кардани китоб' : 'Сохтани' }} китоб</div>

    <form class='create-form' @submit.prevent='onSubmit'>
      <base-select
        v-model='formBook.category_id'
        :options='categories'
        label='Категория' />

      <base-input
        v-model='formBook.title'
        label='Ном'
        type='text'
        placeholder='Ном' />

      <base-input
        v-model='formBook.price'
        label='Нарх'
        placeholder='Нарх'
        type='number' />

      <base-input
        v-model='formBook.isbn'
        label='IBSN'
        placeholder='IBSN'
        type='number' />

      <base-input
        v-model='formBook.author'
        label='Муаллиф'
        type='text'
        placeholder='Муаллиф' />

      <base-input
        v-model='formBook.description'
        label='Тавсиф'
        type='text'
        placeholder='Тавсиф' />

      <base-input
        v-model='formBook.quantity'
        label='Микдор'
        placeholder='Микдор'
        type='number' />

      <base-input
        v-model='formBook.release_year'
        label='Соли нашр'
        placeholder='Соли нашр'
        type='number' />

      <base-input
        v-model='formBook.count_page'
        label='микдори сахифа'
        placeholder='микдори сахифа'
        type='number' />

      <div class='form-control__file'>
        <base-input @change="changePhoto($event,'image')" label='Сурат' type='file' />

        <div v-if='formBook.image' class='form-control__file-image'>
          <a :href='FILE_URL + formBook.image' target='_blank'>
            <img :src='FILE_URL + formBook.image' alt=''>
          </a>

          <div class='form-control__file-close' @click="deleteFile('image', formBook.image)">&times;</div>
        </div>
      </div>

      <div class='form-control__file'>
        <base-input @change="changePhoto($event, 'pdf')" label='Pdf' type='file' />

        <div v-if='formBook?.pdf' class='form-control__file-image pdf'>
          <a :href='FILE_URL + formBook?.pdf' target='_blank'>PDF</a>
          <div class='form-control__file-close' @click="deleteFile('pdf', formBook.pdf)">&times;</div>
        </div>
      </div>

      <base-button :loading='loading' type='submit'>
        {{ route.params?.id ? 'Даровардан' : 'Сохтан' }}
      </base-button>

    </form>
  </div>
</template>

<style lang='scss'>
.create {
  &-form {
    margin-top: 20px;
    display: flex;
    max-width: 500px;
    flex-direction: column;
    gap: 15px;
  }
}
</style>
