class DecisionTree {
    constructor() {
      this.root = null
    }
  
    // Build a decision tree from training data
    buildTree(data, features, target, depth = 0, maxDepth = 10) {
      // Base cases
      if (depth >= maxDepth || this.allSameClass(data, target) || features.length === 0) {
        return this.createLeafNode(data, target)
      }
  
      // Find the best feature to split on
      const bestFeature = this.findBestFeature(data, features, target)
  
      // Create a decision node
      const node = {
        feature: bestFeature,
        children: {},
        isLeaf: false,
      }
  
      // Get unique values for the best feature
      const featureValues = [...new Set(data.map((item) => item[bestFeature]))]
  
      // Create child nodes for each feature value
      for (const value of featureValues) {
        // Filter data for this feature value
        const subData = data.filter((item) => item[bestFeature] === value)
  
        if (subData.length === 0) {
          node.children[value] = this.createLeafNode(data, target)
        } else {
          // Remove the used feature from the feature list
          const remainingFeatures = features.filter((f) => f !== bestFeature)
  
          // Recursively build the subtree
          node.children[value] = this.buildTree(subData, remainingFeatures, target, depth + 1, maxDepth)
        }
      }
  
      this.root = node
      return node
    }
  
    // Check if all data points have the same target class
    allSameClass(data, target) {
      if (data.length === 0) return true
      const firstClass = data[0][target]
      return data.every((item) => item[target] === firstClass)
    }
  
    // Create a leaf node with the majority class
    createLeafNode(data, target) {
      if (data.length === 0) {
        return { isLeaf: true, prediction: null }
      }
  
      // Count occurrences of each class
      const classCounts = {}
      for (const item of data) {
        const cls = item[target]
        classCounts[cls] = (classCounts[cls] || 0) + 1
      }
  
      // Find the majority class
      let majorityClass = null
      let maxCount = 0
  
      for (const cls in classCounts) {
        if (classCounts[cls] > maxCount) {
          maxCount = classCounts[cls]
          majorityClass = cls
        }
      }
  
      return { isLeaf: true, prediction: majorityClass }
    }
  
    // Find the best feature to split on using information gain
    findBestFeature(data, features, target) {
      let bestFeature = null
      let maxInfoGain = Number.NEGATIVE_INFINITY
  
      const entropyBefore = this.calculateEntropy(data, target)
  
      for (const feature of features) {
        const infoGain = this.calculateInfoGain(data, feature, target, entropyBefore)
  
        if (infoGain > maxInfoGain) {
          maxInfoGain = infoGain
          bestFeature = feature
        }
      }
  
      return bestFeature
    }
  
    // Calculate entropy of a dataset
    calculateEntropy(data, target) {
      if (data.length === 0) return 0
  
      const classCounts = {}
      for (const item of data) {
        const cls = item[target]
        classCounts[cls] = (classCounts[cls] || 0) + 1
      }
  
      let entropy = 0
      for (const cls in classCounts) {
        const probability = classCounts[cls] / data.length
        entropy -= probability * Math.log2(probability)
      }
  
      return entropy
    }
  
    // Calculate information gain for a feature
    calculateInfoGain(data, feature, target, entropyBefore) {
      const featureValues = [...new Set(data.map((item) => item[feature]))]
  
      let entropyAfter = 0
      for (const value of featureValues) {
        const subset = data.filter((item) => item[feature] === value)
        const weight = subset.length / data.length
        entropyAfter += weight * this.calculateEntropy(subset, target)
      }
  
      return entropyBefore - entropyAfter
    }
  
    // Predict the class for a new data point
    predict(data) {
      if (!this.root) {
        throw new Error("Decision tree not built yet")
      }
  
      return this.predictRecursive(data, this.root)
    }
  
    // Recursive prediction helper
    predictRecursive(data, node) {
      if (node.isLeaf) {
        return node.prediction
      }
  
      const featureValue = data[node.feature]
  
      // If the feature value is not in the training data, return the most common prediction
      if (!node.children[featureValue]) {
        // Find the most common prediction among child nodes
        const predictions = Object.values(node.children)
          .filter((child) => child.isLeaf)
          .map((child) => child.prediction)
  
        if (predictions.length === 0) {
          // If no leaf children, use the first child
          return this.predictRecursive(data, Object.values(node.children)[0])
        }
  
        // Count occurrences of each prediction
        const predictionCounts = {}
        for (const pred of predictions) {
          predictionCounts[pred] = (predictionCounts[pred] || 0) + 1
        }
  
        // Find the most common prediction
        let mostCommonPrediction = null
        let maxCount = 0
  
        for (const pred in predictionCounts) {
          if (predictionCounts[pred] > maxCount) {
            maxCount = predictionCounts[pred]
            mostCommonPrediction = pred
          }
        }
  
        return mostCommonPrediction
      }
  
      return this.predictRecursive(data, node.children[featureValue])
    }
  }
  
  module.exports = DecisionTree
  
  