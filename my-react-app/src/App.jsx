import QuestionCard from "./components/QuestionCard";
import { questions } from "./data/questions";
import React from "react";
import Confetti from "react-confetti";


function App() {
  const[currentQuestion, setCurrentQuestion] = React.useState(0);
  const[selectedAnswer, setSelectedAnswer] = React.useState(null);
  const[score, setScore] = React.useState(0);
  const[isFinished, setIsFinished] = React.useState(false);
  const[showFeedback, setShowFeedback] = React.useState(false);

  const handleAnswer = (option) =>
     {
    if (showFeedback) return; // Prevent multiple selections
    
    setSelectedAnswer(option);

    setShowFeedback(true);
  
    if (option === questions[currentQuestion].answer) 
      {
      setScore(score + 1);
    };
  };

  const goToNext = () => 
    {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);

    } else {
      setIsFinished(true);
    }

  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  const calculateProgress = () => {
    if (isFinished) return 100;
    const baseProgress = (currentQuestion / questions.length) * 100;
    const questionProgress = selectedAnswer ? (1 / questions.length) * 100 : 0;
    return baseProgress + questionProgress;
  }

  const percent = (score / questions.length) * 100;
  const showConfetti = isFinished && percent >= 80;

  //ADD THE SOUND EFFECT HERE

  //ADD THE SOUND EFFECT HERE
 React.useEffect(() => {
 if (isFinished){
 const percent = (score / questions.length) * 100;
 // Ensure you have audio files for these paths
 const audio = new Audio(); 

if (percent < 50) {
// Sad sound effect
audio.src = "/audio/sadtrombone.mp3"; // <--- Add the path to your sad sound file here
 } 
 else {
// Positive sound effect for 50% or more
 audio.src = "/audio/yay.mp3"; // <--- Add the path to your good sound file here
  
}
      
 audio.play().catch(error => console.log("Audio play failed:", error));

}
}, [isFinished, score, questions.length]); // Dependencies


  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 flex-col gap-8">
      {showConfetti && <Confetti />}
      {/* {audio && <audio src={audio.src} autoPlay />} */}
      <div className="text-center mb-8"> 
        <h1 className="text-4xl font-bold text-gray-600 mb-">QUIZ QUEST</h1>
        <p className="text-gray-400">TEST YOUR KNOWLEDGE</p>
      </div>


      <div className="w-full max-w-xl mb-6 ">
        <div className="bg-gray-700 h-3 rounded-full overflow-hidden" >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-500 ease-out" style={{ width: `${calculateProgress()}%` }}>

          </div>
        </div>
      </div>
      
 
      {!isFinished ? (
        <>
        < QuestionCard
      showFeedback={showFeedback}
        onAnswer={handleAnswer} 
        data={questions[currentQuestion]}
        current={currentQuestion}
        total={questions.length}
        selected = {selectedAnswer }
        />

        <div className="mt-6 min-h-[60px]">
          {showFeedback && 
            (
              <button 
                className ="bg-gradient-to-r from-indigo-600 to-purple-600
                py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer"
                onClick={goToNext}
              >

                {currentQuestion + 1 < questions.length 
                  ?" Continue"
                  :  "See Results"} 
              </button>
            )
          }
        </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">QUIZ COMPLETED!</h2>
          <p className="text-xl mb-6">
            You scored <span>{score}</span> out of {" "}
            <span className="font-bold">{questions.length}</span> 
            and it is {" "} 
            {Math.round((score / questions.length) * 100)}%
            
          </p>
          <button  className ="bg-gradient-to-r from-indigo-600 to-purple-600
                py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer"
                onClick={restartQuiz}>
                  Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
