export const state = () => ({
  tools: [
    {
      name: 'Merda'
    }
  ]
})

export const mutations = {
  addTool (state, tool) {
    state.tools.push(tool)
  }
}
