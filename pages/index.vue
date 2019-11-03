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
            <v-btn text @click.stop="removeTool(tool, index)">
              <v-icon color="error">mdi-delete-circle</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn :to="'/new/' + index" text>Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-container>

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
      return this.$store.state.localStorage.tools
    }
  },
  methods: {
    removeTool (tool, index) {
      const message = `Are you sure you want to remove ${tool.name}?`

      if (confirm(message)) {
        this.$store.commit('localStorage/removeTool', index)
      }
    }
  },
  head () {
    return {
      title: 'Tools'
    }
  }
}
</script>
