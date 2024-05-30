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
        console.log(learner);
        learner.id = num;
        learnerCourseScores.push({...learner});
    });

    console.log(learnerCourseScores)
    
    return learnerCourseScores;
  }

  getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)