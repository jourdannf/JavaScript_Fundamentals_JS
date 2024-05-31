// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  //ERROR CHECKING
  try {

    //Checks if all numbers are numbers
    const numberKeys = ["id", "course_id", "group_weight", "points_possible", "learner_id", "assignment_id", "score"];
    
    //CourseInfo
    for (key in CourseInfo){
        if (numberKeys.includes(key) && typeof CourseInfo[key] !== "number"){
            throw new Error("The Course Info id is supposed to be a number.");
        }
    }

    //Assignments
    for (key in AssignmentGroup){
        if (key === "assignments"){
            for (assignment in AssignmentGroup[key]){ //Loop through assignments array
                for (assignmentKey in assignment){ //Loop through keys of assignments
                    if (numberKeys.includes(assignmentKey) && typeof CourseInfo[assignmentKey] !== "number"){
                        throw new Error("The Assignment " + assignmentKey + " is supposed to be a number.");
                    }
                }
            }
        }

        if (numberKeys.includes(key) && typeof AssignmentGroup[key] !== "number"){
            throw new Error("The Assignment Group " + key + " is supposed to be a number.");
        }
    }

    //Submissions
    for (index in LearnerSubmissions){
        let submission = LearnerSubmissions[index];
        for (key in LearnerSubmissions[index]){
            if (key === "submission"){
                let submissionInfo = submission[key]
                for (submissionKey in submission[key]){ //Loop through assignments array
                    if (numberKeys.includes(submissionKey) && typeof submissionInfo[submissionKey] !== "number"){
                        throw new Error("The Submission " + submissionKey + " is supposed to be a number.");
                    }
                }
            }
    
            if (numberKeys.includes(key) && typeof submission[key] !== "number"){
                throw new Error("The Learner Submission " + key + " is supposed to be a number.");
            }
        }
        
    }

    //Check if assignment belongs to the right course
    if (CourseInfo.id !== AssignmentGroup.course_id){
        throw new Error("This assignment group doesn't belong to this course");
    }

    //Checks if possible points is greater than 0
    AssignmentGroup.assignments.forEach(assignmentInfo => {
        if (assignmentInfo.points_possible <= 0){
            throw new Error("Point's possible has to be greater than 0");
        }
    });
    
    console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
}catch(err){
    console.log(err);
}
//ERROR CHECKING COMPLETE
//
//
//
  
  function getLearnerData(courseInfo, assignmentGroup, learnerSubmission){
    //Return an array of objects that contains learner id, weighted average, and assignment_id
    let learnerCourseScores = [];
    let learner = {};

    //get the ID for each learner in learnerSubmission file
    function getIDs(){
        let ids = [];
        learnerSubmission.forEach((submission) => {
            if(!ids.includes(submission.learner_id)){
                ids.push(submission.learner_id);
            }
        });
        return ids;
    }

    //Returns true is the assignment due date has already passed
    function isDue(assignmentDueDate){
        let today = new Date();
        let dueDate = new Date(assignmentDueDate);

        return dueDate < today;

    }

    //Returns true if the assignment is late
    function isLate(submittedAtDate, assignmentDueDate){
        let submitDate = new Date(submittedAtDate);
        let assignmentDate = new Date(assignmentDueDate);

        if (submitDate > assignmentDate) {
            return true;
        }else {
            return false;
        }
    }


    let ids = getIDs();

    //Assign id key and push learner onto the learnerCoursesScores
    ids.forEach((num) => {
        learner.id = num;
        learnerCourseScores.push({...learner});
    });

    function getCorrectAssignment(assignment_id){

        for (let i = 0; i < AssignmentGroup.assignments.length; i ++){
            if (AssignmentGroup.assignments[i].id === assignment_id){
                return(AssignmentGroup.assignments[i]);
            }
            
        }
    }

    let completedAssignByLearner = {}; // all assignments each user completed; 
                                        //key is id and value is array of asssignments completed

    //After this code, all the averages should be the total of all the scores from each learner
    learnerSubmission.forEach((submissionData)=> {

        //This will look for the assignments completed by each learner while calculating their scores
        //This will be used to determine the possible score each learner could possible get for
        //the weighted average later on
        //In the case that learners completes a different amount of assignment, this keeps track of that
        if (!Object.keys(completedAssignByLearner).includes(String(submissionData.learner_id))){
            completedAssignByLearner[submissionData.learner_id] = [];
        }
        completedAssignByLearner[submissionData.learner_id].push(submissionData.assignment_id);

        

        //Each learner is represented by an index in the learnerCourseScores
        //This part of the code should update with the total scores for all assignments
        //completed by each user
        for (let i = 0; i < learnerCourseScores.length; i ++){
            if (!Object.keys(learnerCourseScores[i]).includes("avg")){
                learnerCourseScores[i].avg = 0;
            }

            
            //Get the due date for the assignment
            let assignmentDueDate  = getCorrectAssignment(submissionData.assignment_id).due_at;
            
            //If the assignment is due, the score will be added to the weighted average
            //If the assignment is late, the score will be deducted by 10% of the possible score
            if(submissionData.learner_id === learnerCourseScores[i].id && isDue(assignmentDueDate)){
                
                //The assignment being deducted by 10% of the possible score if the assignment is late
                if (isLate(submissionData.submission.submitted_at, assignmentDueDate)){
                    submissionData.submission.score -= getCorrectAssignment(submissionData.assignment_id).points_possible * .1
                }

                //Adding the scores together
                let learnerData = learnerCourseScores[i];
                learnerCourseScores[i].avg += submissionData.submission.score;
                learnerData[submissionData.assignment_id] = submissionData.submission.score;
                break;
            }
        }
    });
    
    //The amount of total points possible for each learner

    let allAssignments = assignmentGroup.assignments; //array of all the assignments

    learnerCourseScores.forEach((learnerGrades) => {
        //Total of all possible scores from each assignment
        let totalScores = 0;

        let assignmentsDone = completedAssignByLearner[learnerGrades.id];

        assignmentsDone.forEach((id)=> {
            // for each id find the matching assignment
            
            for (let i = 0; i < allAssignments.length; i++){

                //Assignment has to be due and the learner has to have done the assignment in order for it to be
                //added to the totalScores and as one of the assignments
                if (allAssignments[i].id === id && isDue(allAssignments[i].due_at)){
                    learnerGrades[id] /= allAssignments[i].points_possible;
                    totalScores += allAssignments[i].points_possible;
                    break;
                }
            }
            
        });
        
        learnerGrades.avg /=totalScores;

    });

    
    return learnerCourseScores;
  }