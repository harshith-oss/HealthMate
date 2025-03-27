class ReinforcementLearning {
    constructor(learningRate = 0.1, discountFactor = 0.9, explorationRate = 0.1) {
      this.learningRate = learningRate // Alpha: how much to update Q-values
      this.discountFactor = discountFactor // Gamma: importance of future rewards
      this.explorationRate = explorationRate // Epsilon: exploration vs exploitation
      this.qTable = {} // Q-table to store state-action values
    }
  
    // Initialize Q-table for a state if it doesn't exist
    initializeState(state) {
      if (!this.qTable[state]) {
        this.qTable[state] = {}
      }
    }
  
    // Initialize Q-value for a state-action pair if it doesn't exist
    initializeStateAction(state, action) {
      this.initializeState(state)
      if (this.qTable[state][action] === undefined) {
        this.qTable[state][action] = 0
      }
    }
  
    // Choose an action using epsilon-greedy policy
    chooseAction(state, availableActions) {
      // Exploration: choose a random action
      if (Math.random() < this.explorationRate) {
        const randomIndex = Math.floor(Math.random() * availableActions.length)
        return availableActions[randomIndex]
      }
  
      // Exploitation: choose the best action based on Q-values
      this.initializeState(state)
  
      let bestAction = null
      let bestValue = Number.NEGATIVE_INFINITY
  
      for (const action of availableActions) {
        this.initializeStateAction(state, action)
  
        if (this.qTable[state][action] > bestValue) {
          bestValue = this.qTable[state][action]
          bestAction = action
        }
      }
  
      // If all actions have the same value, choose randomly
      if (bestAction === null) {
        const randomIndex = Math.floor(Math.random() * availableActions.length)
        return availableActions[randomIndex]
      }
  
      return bestAction
    }
  
    // Update Q-value based on reward and next state
    updateQValue(state, action, reward, nextState, availableNextActions) {
      this.initializeStateAction(state, action)
  
      // Calculate maximum Q-value for the next state
      let maxNextQValue = 0
  
      if (nextState && availableNextActions.length > 0) {
        this.initializeState(nextState)
  
        maxNextQValue = Number.NEGATIVE_INFINITY
  
        for (const nextAction of availableNextActions) {
          this.initializeStateAction(nextState, nextAction)
          maxNextQValue = Math.max(maxNextQValue, this.qTable[nextState][nextAction])
        }
  
        if (maxNextQValue === Number.NEGATIVE_INFINITY) {
          maxNextQValue = 0
        }
      }
  
      // Q-learning update formula: Q(s,a) = Q(s,a) + α * [r + γ * max Q(s',a') - Q(s,a)]
      const currentQValue = this.qTable[state][action]
      const temporalDifference = reward + this.discountFactor * maxNextQValue - currentQValue
  
      this.qTable[state][action] = currentQValue + this.learningRate * temporalDifference
    }
  
    // Get the current Q-value for a state-action pair
    getQValue(state, action) {
      this.initializeStateAction(state, action)
      return this.qTable[state][action]
    }
  
    // Save the Q-table to a file or database
    saveQTable() {
      return JSON.stringify(this.qTable)
    }
  
    // Load the Q-table from a file or database
    loadQTable(qTableJson) {
      this.qTable = JSON.parse(qTableJson)
    }
  
    // Decrease exploration rate over time (for annealing)
    decreaseExplorationRate(decay = 0.999) {
      this.explorationRate *= decay
    }
  }
  
  module.exports = ReinforcementLearning
  
  