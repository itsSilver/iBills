export default function ({ store, redirect }) {
  if (store.state.auth.user.role.id === 3) {
    return redirect('/admin')
  }
}
