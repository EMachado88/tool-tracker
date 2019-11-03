<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-col
      v-for="(tool, index) in tools"
      :key="index"
    >
      {{ tool.name }}
    </v-col>

    <v-btn
      fixed
      dark
      fab
      bottom
      right
      large
      color="primary"
      class="mb-7"
      to="/new"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  computed: {
    tools () {
      return this.$store.state.tools
    }
  },
  head () {
    return {
      title: 'Tools'
    }
  }
}
</script>
