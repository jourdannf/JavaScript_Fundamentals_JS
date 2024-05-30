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

    let ids = getIDs();

    //Assign id key and push learner onto the learnerCoursesScores
    ids.forEach((num) => {
        // console.log(learner);
        learner.id = num;
        learnerCourseScores.push({...learner});
    });

    //Get totalScores from learnerSubmission
    //Get totalPossibleScores from assignmentGroup.submission
    //Divide the two values and put it as the avg key in each learner person

    let completedAssignByLearner = {}; // all assignments each user completed; 
                                        //key is id and value is array of asssignments completed

    //After this code, all the averages should be the total of all the scores from each learner
    learnerSubmission.forEach((person)=> {

        //Get the ids for the assignments each learner completed
        //If learner_id is not a key in completedAssignByLearner, then make an empty array
        if (!Object.keys(completedAssignByLearner).includes(String(person.learner_id))){
            completedAssignByLearner[person.learner_id] = [];
        }
        completedAssignByLearner[person.learner_id].push(person.assignment_id);

        //Add the scores for each assignment per learner
        for (let i = 0; i < learnerCourseScores.length; i ++){
            if (!Object.keys(learnerCourseScores[i]).includes("avg")){
                learnerCourseScores[i].avg = 0;
            }
            
            if(person.learner_id === learnerCourseScores[i].id){
                learnerCourseScores[i].avg += person.submission.score;
                break;
            }
        }
    });

    // console.log(completedAssignByLearner);

    

    //The amount of total points possible for each learner

    let allAssignments = assignmentGroup.assignments; //array of all the assignments

    learnerCourseScores.forEach((learnerGrades) => {
        //Total of all possible scores from each assignment
        let totalScores = 0;

        let assignmentsDone = completedAssignByLearner[learnerGrades.id];

        assignmentsDone.forEach((id)=> {
            // for each id find the matching assignment
            
            for (let i = 0; i < allAssignments.length; i++){
                if (allAssignments[i].id === id){
                    totalScores += allAssignments[i].points_possible;
                    break;
                }
            }
            
        });
        
        learnerGrades.avg /=totalScores;
    });

    // assignmentGroup.assignments.forEach((assignment) => {
    //     totalScores += assignment.points_possible;
    // })

    // learnerCourseScores.forEach((person) => person.avg/=totalScores);

    //Divide and add that to the object

    console.log(learnerCourseScores)
    
    return learnerCourseScores;
  }

  getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)