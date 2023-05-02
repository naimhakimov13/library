<script setup>
import { computed, reactive, ref } from 'vue'
import { getBooks, getReturnByUserId, getUsers } from '@/services/http.service'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTable from '@/components/ui/BaseTable.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const filterForm = reactive({ email: '', name: '' })
const filterBook = reactive({ title: '', author: '' })
const loading = ref(false)
const users = ref({ content: [] })
const showButton = ref(true)
const isShowBookSearch = ref(false)
const books = ref([])

async function search() {
  loading.value = showButton.value = true
  users.value = await getUsers(filterForm)
  loading.value = false
}

const userData = computed(() => users.value.content.map(item => ({
  cells: [
    item._id,
    item.name,
    item.email,
    item.phone,
    item.gender
  ]
})))

const bookData = computed(() => books.value.map(item => ({
  cells: [
    item._id,
    item.category_id.name,
    item.title,
    item.author,
    item.count_page,
    item.release_year,
    item.quantity
  ]
})))

const columns = ['ID', 'Имя', 'Email', 'Телефон', 'Пол']
const bookColumns = ['ID', 'Категория', 'Ном', 'муаллиф', 'Микдори саҳифа', 'Оғози эътибор', 'Микдор']

async function chooseUser(event) {
  users.value.content = users.value.content.filter(user => user._id === event)
  showButton.value = false
  isShowBookSearch.value = true
}

async function searchBook() {
  const bookList = await getBooks(filterBook)
  books.value = bookList.content
}

function clearFilterBook() {
  isShowBookSearch.value = false
}

function clearFilter() {
  users.value.content = []
}

function chooseBook(event) {
  console.log('choose book', event)
}
</script>

<template>
  <div>
    <h1 class='page__title'>{{ $t('menu.borrow') }}</h1>

    <div class='flex gap-8'>
      <BaseInput v-model='filterForm.email' placeholder='Email' @keyup.enter='search' />
      <BaseInput v-model='filterForm.name' placeholder='Ном' @keyup.enter='search' />
      <BaseButton @click='search'>Чустучуи донишчу</BaseButton>
      <BaseButton v-if='filterForm.email || filterForm.name' @click='clearFilter' color='danger'>Тоза кардани филтр
      </BaseButton>
    </div>

    <Loader v-if='loading' />

    <BaseTable
      :showEmpty='false'
      :show-button='showButton'
      :columns='columns'
      :rows='userData'
      @edit='chooseUser($event)'
    ></BaseTable>

    <hr>

    <div class='flex gap-8 search-book' v-if='isShowBookSearch'>
      <BaseInput v-model='filterBook.title' placeholder='Номи китоб' @keyup.enter='searchBook' />
      <BaseInput v-model='filterBook.author' placeholder='Муаллиф' @keyup.enter='searchBook' />
      <BaseButton @click='searchBook'>Чустучу китоб</BaseButton>
      <BaseButton
        v-if='isShowBookSearch && filterBook.name || filterBook.author'
        color='danger'
        @click='clearFilterBook'>
        Тоза кардани филтр
      </BaseButton>
    </div>


        <BaseTable
          :showEmpty='false'
          :show-button='true'
          :columns='bookColumns'
          :rows='bookData'
          @edit='chooseBook($event)'
        ></BaseTable>

  </div>
</template>

<style scoped lang='scss'>
.search-book {
  margin-top: 20px;
}

:deep(.page__title) {
  margin-bottom: 20px;
}
</style>
