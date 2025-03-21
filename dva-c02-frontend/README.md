# Component structure

src/
  components/
    QuestionCard.tsx
    Navigation.tsx
    SubmitButton.tsx
  hooks/
    useQuestions.ts
  types/
    question.ts
  App.tsx


Backend API ←→ useQuestions Hook ←→ App Component
                                    ↓
                        ┌───────────┼───────────┐
                        ↓           ↓           ↓
                  QuestionCard  Navigation  SubmitButton


# Backend Integration Points:

# Initial Data Load:

Backend: /api/questions endpoint

Frontend: useQuestions hook fetches data

Future Integration Points:

Submit answers endpoint (to be implemented)

Score calculation

Results storage

# UI Flow:

App loads → Shows loading state

Questions fetched → Displays first question

# User can:

View question via QuestionCard

Select answer via radio buttons

Navigate via Previous/Next

Submit when all questions answered

# This modular structure allows for:

Easy maintenance

Clear separation of concerns

Scalable architecture

Type-safe development

Clear data flow