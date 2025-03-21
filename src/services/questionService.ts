class QuestionService {
    private questions: Array<{ questionText: string; options: string[]; correctAnswer: string }>;

    constructor() {
        this.questions = [
            {
                questionText: "A team of Developers must migrate an application running inside an AWS Elastic Beanstalk environment from a Classic Load Balancer to an Application Load Balancer. Which steps should be taken to accomplish the task using the AWS Management Console?",
                options: [
                    "1. Update the application code in the existing deployment. 2. Select a new load balancer type before running the deployment. 3. Deploy the new version of the application code to the environment.",
                    "1. Create a new environment with the same configurations except for the load balancer type. 2. Deploy the same application version as used in the original environment. 3. Run the swap-environment-cnames action.",
                    "1. Clone the existing environment, changing the associated load balancer type. 2. Deploy the same application version as used in the original environment. 3. Run the swap-environment-cnames action.",
                    "1. Edit the environment definitions in the existing deployment. 2. Change the associated load balancer type according to the requirements. 3. Rebuild the environment with the new load balancer type."
                ],
                correctAnswer: "1. Update the application code in the existing deployment. 2. Select a new load balancer type before running the deployment. 3. Deploy the new version of the application code to the environment."
            },
            {
                questionText: "A company needs a version control system for collaborative software development. Features of the system must include the following: Support for batches of changes across multiple files Parallel branching Version tracking Which AWS service will meet these requirements?",
                options: [
                    "AWS CodePipeline.",
                    "Amazon S3.",
                    "AWS Code Build.",
                    "AWS CodeCommit."
                ],
                correctAnswer: "AWS CodeCommit."
            },
            // Additional questions can be added here
        ];
    }

    public getQuestions() {
        return this.questions;
    }

    public checkAnswer(questionText: string, selectedAnswer: string): boolean {
        const question = this.questions.find(q => q.questionText === questionText);
        return question ? question.correctAnswer === selectedAnswer : false;
    }
}

export default QuestionService;