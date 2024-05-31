This JavaScript file has a main function called getLearnerData() that takes in three paramaters: CourseInfo, AssignmentGroup, and LearnerSubmission.
Based on the paramaters provided, the function parses through the code to create an aray of objects called learnerCourseScores.
Each object in learnerCourseScores contains the keys for id which provides the id of the learner, avg which provides the weighted average of the learner (weighted average only inlcudes assignments that were submitted after the due date has passed), and their score for each assignment whose due date has passed.
Additionally, if an assignment is late, the learner's score is deducted by 10% of what the possible score could've been.
There are several error checking measures. 
If the course id doesn't made the id in the AssignmentsGroup, an error is thrown.
If any of the values that are supposed to be numbers are passed as a string, an error is thrown.
If the amount of points possible is 0, an error is thrown.
