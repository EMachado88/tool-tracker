<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-container>
      <v-col
        v-for="(tool, index) in tools"
        :key="index"
        v-show="tools.length"
        cols="12"
      >
        <v-card>
          <v-card-title class="headline">{{ tool.name }}</v-card-title>

          <v-card-text>
            <v-row>
              <v-col class="subtitle-1">
                <span class="font-weight-bold">Quantity:</span> {{ tool.quantity }}
              </v-col>
              <v-col class="subtitle-1 text-right">
                <span class="font-weight-bold">Warranty Date (expiry):</span> {{ tool.warrantyDate }}
              </v-col>
            </v-row>
            <v-row v-if="tool.notes" class="mt-3">
              <v-col class="subtitle-1" cols="12">
                <p class="font-weight-bold mb-0">Notes:</p>
                <p>{{ tool.notes }}</p>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn :to="'/new/' + index" text>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn text @click.stop="removeTool(tool, index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn @click.stop="openEstimate(tool, index)" text>
              Estimated failure
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-container>

    <v-dialog
      v-model="failure.dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Estimated Failure</span>
          <v-spacer></v-spacer>
          <span class="subtitle">{{ tool.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field type="number" value="1" min="1" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="failure.selected"
                  :items="failure.items"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mr-5" large text @click.stop="failure.dialog = false" dark>Close</v-btn>
          <v-btn large color="primary" @click.stop="saveEstimate" dark>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  data () {
    return {
      tool: {},
      failure: {
        dialog: false,
        items: ['Day(s)', 'Week(s)', 'Month(s)', 'Year(s)'],
        selected: 'Month(s)'
      }
    }
  },
  computed: {
    tools () {
      return this.$store.state.localStorage.tools
    }
  },
  methods: {
    removeTool (tool, index) {
      const message = `Are you sure you want to remove ${tool.name}?`

      if (confirm(message)) {
        this.$store.commit('localStorage/removeTool', index)
      }
    },
    openEstimate (tool, index) {
      this.tool = tool
      this.failure.dialog = true
    },
    saveEstimate (index) {

    }
  },
  head () {
    return {
      title: 'Tools'
    }
  }
}
</script>
