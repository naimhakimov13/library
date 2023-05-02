<script setup>
import { computed, ref } from 'vue'
import { deleteBorrow, getBorrowByUserId, getUsers } from '@/services/http.service'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTable from '@/components/ui/BaseTable.vue'

const returnColumns = ['ID', 'Ном']

const loading = ref(false)
const users = ref({ content: [] })
const showButton = ref(true)
const returns = ref([])

async function changeHandler(event) {
  const inputValue = event.target.value
  loading.value = showButton.value = true
  users.value = await getUsers({ email: inputValue })
  loading.value = false
}

const returnData = computed(() => returns.value.map(item => ({
  cells: [
    item._id,
    item.book_id.title
  ]
})))

const userData = computed(() => users.value.content.map(item => ({
  cells: [
    item._id,
    item.barcode,
    item.name,
    item.email,
    item.phone,
    item.gender
  ]
})))

const columns = ['ID', 'Штихкод', 'Имя', 'Email', 'Телефон', 'Чинс']

async function chooseUser(event) {
  if (event) {
    users.value.content = users.value.content.filter(user => user._id === event)
    showButton.value = false
    returns.value = await getBorrowByUserId(event)
  }
}

async function removeBorrow(id) {
  try {
    await deleteBorrow(id)
    returns.value = returns.value.filter(item => item._id !== id)
  } catch (e) {
    throw e
  }
}
</script>

<template>
  <div>
    <h1 class='page__title'>{{ $t('menu.return') }}</h1>

    <BaseInput placeholder='Поиск пользователя по email' @keyup.enter='changeHandler($event)' />

    <Loader v-if='loading' />


    <BaseTable
      :showEmpty='false'
      :show-button='showButton'
      :columns='columns'
      :rows='userData'
      @edit='chooseUser($event)'
    ></BaseTable>

    <hr>

    <BaseTable
      :showEmpty='false'
      :columns='returnColumns'
      :rows='returnData'
      :isShowIcon='true'
      @delete='removeBorrow($event)'
    ></BaseTable>
  </div>
</template>

<style scoped lang='scss'>
::v-deep(.page__title) {
  margin-bottom: 20px;
}

::v-deep {
  .icon-edit {
    display: none;
  }
}
</style>
