import React, { useState } from 'react';
import { SquarePen, Calendar } from 'lucide-react';

const GeneratedQA = () => {
  const [isPublishing, setIsPublishing] = useState(false);

  const questions = [
    {
      id: 1,
      number: 1,
      marks: 10,
      question: "Explain the working principle of the k-Nearest Neighbors (k-NN) algorithm with an example.",
      answer:
        "The k-Nearest Neighbors (k-NN) algorithm is a simple supervised learning method used for both classification and regression. Its working principle is based on the idea that similar data points exist close to each other in feature space. When a new data point arrives, the algorithm first chooses a value of k, which represents how many nearby neighbors will be considered. Next, it calculates the distance between the new point and all existing training points using a distance measure such as Euclidean distance. After computing all distances, it selects the k closest points—these are the nearest neighbors. For classification, the algorithm assigns the class that appears most frequently among these neighbors, while for regression, it predicts the average value of the neighbors.\n\nEuclidean distance formula between points A(x1, y1) and B(x2, y2): d=(x2−x1)2+(y2−y1)2d = √sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}d=(x2−x1)2+(y2−y1)2.",
    },
    {
      id: 2,
      number: 2,
      marks: 8,
      question: "What is the difference between supervised and unsupervised learning?",
      answer:
        "Supervised learning uses labeled data where the algorithm learns from input-output pairs to make predictions. The model is trained with examples that include both features and their corresponding target values. Common algorithms include linear regression, decision trees, and neural networks. Unsupervised learning, on the other hand, works with unlabeled data and tries to find hidden patterns or structures within the data. The algorithm explores the data without predefined outputs, commonly used in clustering (like K-means) and dimensionality reduction (like PCA).",
    },
    {
      id: 3,
      number: 3,
      marks: 12,
      question: "Describe the working of a Decision Tree algorithm and explain how it handles overfitting.",
      answer:
        "A Decision Tree is a tree-structured classifier where internal nodes represent features, branches represent decision rules, and leaf nodes represent outcomes. The algorithm works by recursively splitting the data based on feature values that best separate the classes, using metrics like Gini impurity or information gain. To handle overfitting, several techniques are employed: pruning (removing branches that have little importance), setting a maximum depth for the tree, requiring a minimum number of samples per leaf, and using ensemble methods like Random Forests that combine multiple trees to create a more robust model.",
    },
    {
      id: 4,
      number: 4,
      marks: 10,
      question: "Explain the concept of cross-validation and why it is important in machine learning.",
      answer:
        "Cross-validation is a statistical method used to estimate the performance of machine learning models. The most common approach is k-fold cross-validation, where the dataset is divided into k equal subsets. The model is trained k times, each time using k-1 folds for training and the remaining fold for validation. This process ensures that every data point gets to be in a validation set exactly once. Cross-validation is important because it helps prevent overfitting, provides a more reliable estimate of model performance, utilizes the entire dataset for both training and validation, and helps in selecting the best model parameters.",
    },
    {
      id: 5,
      number: 5,
      marks: 15,
      question: "What is gradient descent and how does it work in training neural networks?",
      answer:
        "Gradient descent is an optimization algorithm used to minimize the cost function in machine learning models, particularly in neural networks. It works by iteratively adjusting the model's parameters in the direction opposite to the gradient of the cost function. The algorithm calculates the partial derivatives of the cost function with respect to each parameter, then updates the parameters by subtracting a fraction of the gradient (controlled by the learning rate). In neural networks, this is implemented through backpropagation, where gradients are computed layer by layer from output to input. There are variants like Stochastic Gradient Descent (SGD), Mini-batch Gradient Descent, and adaptive methods like Adam that improve convergence speed and stability.",
    },
  ];

  const handleSchedulePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      alert("Questions scheduled for publishing!");
      setIsPublishing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="text-2xl sm:text-3xl font-semibold pb-5">
            Questions and Answers
          </div>

          <div className="space-y-6">
            {questions.map((q) => (
              <div
                key={q.id}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border border-purple-100 hover:shadow-md transition-shadow duration-300"
              >
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                  
                  {/* Question Number + Question */}
                  <div className="flex items-start gap-4 w-full sm:w-auto">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-200 rounded-full text-purple-700 font-semibold text-lg">
                      {q.number}
                    </div>

                    <h3 className="text-gray-800 font-medium text-base sm:text-lg leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  {/* Marks + Edit Button */}
                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <span className="bg-purple-200 text-purple-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-sm font-semibold whitespace-nowrap">
                      {q.marks} marks
                    </span>

                    <button className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md">
                      <SquarePen size={18} />
                    </button>
                  </div>
                </div>

                {/* Answer */}
                <div className="mt-2 sm:mt-4 sm:pl-16">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {q.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <button className="px-6 py-3 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors duration-200">
              ← Back
            </button>

            <button
              onClick={handleSchedulePublish}
              disabled={isPublishing}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors duration-200 shadow-md disabled:opacity-70"
            >
              <Calendar size={20} />
              {isPublishing ? "Publishing..." : "Schedule Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedQA;
