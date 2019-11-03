export const state = () => ({
  tools: []
})

export const mutations = {
  addTool (state, tool) {
    state.tools.push(tool)
  },
  removeTool (state, index) {
    state.tools.splice(index, 1)
  },
  saveTool (state, { index, tool }) {
    state.tools[index] = tool
  }
}
