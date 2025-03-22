import json
import re

def extract_questions():
    questions = []
    current_question = None
    
    with open('extracted_questions.md', 'r') as file:
        content = file.read()
        
        # Split content by ### to separate questions
        question_blocks = content.split('###')[1:]  # Skip first empty element
        
        for block in question_blocks:
            lines = block.strip().split('\n')
            
            # Get question text (first line)
            question_text = lines[0].strip()
            
            # Extract options
            options = []
            correct_answers = []
            
            for line in lines[1:]:
                line = line.strip()
                if line.startswith('- '):
                    # Remove the checkbox markers and spaces
                    option = re.sub(r'- \[[ x]\] ', '', line)
                    options.append(option)
                    
                    # Check if this option is marked as correct
                    if '[x]' in line:
                        correct_answers.append(option)
            
            if question_text and options:
                questions.append({
                    'question': question_text,
                    'options': options,
                    'correct_answers': correct_answers
                })
    
    # Print first 5 questions to verify extraction
    print("\nFirst 5 questions extracted:")
    print("-" * 50)
    for i, q in enumerate(questions[:5], 1):
        print(f"\nQuestion {i}:")
        print(f"Question text: {q['question']}")
        print("Options:")
        for opt in q['options']:
            print(f"- {opt}")
        print("Correct answers:")
        for ans in q['correct_answers']:
            print(f"✓ {ans}")
        print("-" * 50)

    # Save to JSON file
    with open('extracted_questions.json', 'w') as json_file:
        json.dump(questions, json_file, indent=2)
        print(f"\nTotal questions extracted: {len(questions)}")
        print("Questions have been saved to 'extracted_questions.json'")

if __name__ == "__main__":
    extract_questions()
