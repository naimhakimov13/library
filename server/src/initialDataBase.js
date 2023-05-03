import User from './models/User.js'

export async function initialUser() {
  try {
    const users = await User.find()
    if(!users.length) {
      const user = new User({
        name: 'Naim Hakimov',
        gender: 'male',
        email: 'n@mail.ru',
        role: 'admin',
        password: 'qwerty'
      })
      await user.save()
    }
  } catch (e) {
    throw e
  }
}