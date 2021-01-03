<template>
  <div>
    <button @click="toast">{{ message }}</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    message: 'Login vue component',
  }),
  methods: {
    toast() {
      alert(this.message)
    }
  },
}
</script>
