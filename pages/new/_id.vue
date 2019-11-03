<template>
  <v-layout
    column
    justify-center
    align-center
  >

    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="save"
      >
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name *"
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
              label="Quantity *"
              min="1"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-menu
              ref="dateMenu"
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Warranty Date (expiry) *"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                  required
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="dateMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="notes"
              label="Notes"
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-btn
              to="/"
              block
            >
              Back
            </v-btn>
          </v-col>

          <v-col cols="6">
            <v-btn
              type="submit"
              block
              color="primary"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>

      </v-form>

    </v-container>
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
      quantity: 1,
      quantityRules: [
        val => !!val || `Quantity is required`,
        val => /^[0-9]*$/.test(val) || `Quantity must be a number`
      ],
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      dateMenu: false,
      notes: ''
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    save () {
      if (this.$refs.form.validate()) {
        const tool = {
          name: this.name,
          quantity: this.quantity,
          warrantyDate: this.dateFormatted,
          notes: this.notes
        }

        if (this.$route.params.id) {
          this.$store.commit('localStorage/saveTool', { index: this.$route.params.id, tool })
        }
        else {
          this.$store.commit('localStorage/addTool', tool)
        }

        this.$router.push({
          path: '/'
        })
      }
      else {
        return false
      }
    }
  },
  head () {
    return {
      title: 'New Tool'
    }
  },
  mounted () {
    if (this.$route.params.id) {
      const tool = this.$store.state.localStorage.tools[this.$route.params.id]

      this.name = tool.name
      this.quantity = tool.quantity
      this.date = new Date(tool.warrantyDate).toISOString().substr(0, 10)
      this.notes = tool.notes
    }
  }
}
</script>
