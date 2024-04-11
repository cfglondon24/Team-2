
import numpy as np

def select_questions(questions):
    rate_parameter = 0.95  # Adjust as needed

    # Calculate probabilities using exponential distribution with adjustable rate parameter
    def calculate_probability(probability):
        return rate_parameter * np.exp(-rate_parameter * probability)

    # Calculate probabilities for each question
    probabilities = [calculate_probability(probability) for _, probability in questions]

    # Sort questions based on probabilities in descending order
    sorted_indices = np.argsort(probabilities)[::-1]
    sorted_questions = [questions[i][0] for i in sorted_indices]

    return sorted_questions

# Example usage
questions = [('question 1', 0.7), ('question 2', 0.3), ('question 3', 0.5)]  # Example data

sorted_questions = select_questions(questions)
print(sorted_questions)