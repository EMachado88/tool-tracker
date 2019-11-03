<template>
  <v-layout
    column
    justify-center
    align-center
  >

  <v-form v-model="valid">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="quantity"
            :rules="quantityRules"
            type="number"
            label="Quantity"
            min="1"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            type="number"
            label="Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
  </v-form>

  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      name: '',
      nameRules: [
        val => !!val || `Name is required`
      ],
      quantity: '',
      quantityRules: [
        val => !!val || `Quantity is required`,
        val => /^[0-9]*$/.test(val) || `Quantity must be a number`
      ]
    }
  },
  head () {
    return {
      title: 'New Tool'
    }
  }
}
</script>
