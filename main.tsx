import { PluginContext } from "apyf";
import React, { useEffect, useState } from "react";

const WordScramble = () => {
  const words = [
    // 3 letters
    "CAT",
    "DOG",
    "SUN",
    "RUN",
    "FUN",
    "HAT",
    "BOX",
    "MAP",
    "CUP",
    "BAG",
    // 4 letters
    "FISH",
    "MOON",
    "STAR",
    "BOOK",
    "DESK",
    "JUMP",
    "CAKE",
    "BIRD",
    "HOME",
    "TREE",
    // 5 letters (common words)
    "HAPPY",
    "SMILE",
    "LIGHT",
    "PARTY",
    "WATER",
    "MUSIC",
    "PHONE",
    "HOUSE",
    "CLOUD",
    "DANCE",
    // Few longer words for challenge
    "RAINBOW",
    "MORNING",
    "SUMMER",
    "GARDEN",
    "COOKIE",
  ];

  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45); // Increased time to 45 seconds
  const [gameActive, setGameActive] = useState(false);
  const [message, setMessage] = useState("Press Start to play!");
  const [highScore, setHighScore] = useState(0);
  const [usedWords, setUsedWords] = useState(new Set());
  const [showHint, setShowHint] = useState(false);

  const scrambleWord = (word) => {
    const array = word.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  };

  const getNewWord = () => {
    let availableWords = words.filter((word) => !usedWords.has(word));
    if (availableWords.length === 0) {
      setUsedWords(new Set());
      availableWords = words;
    }

    const word =
      availableWords[Math.floor(Math.random() * availableWords.length)];
    let scrambled = scrambleWord(word);
    while (scrambled === word) {
      scrambled = scrambleWord(word);
    }
    setCurrentWord(word);
    setScrambledWord(scrambled);
    setUsedWords((prev) => new Set([...prev, word]));
    setShowHint(false);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(45);
    setGameActive(true);
    setMessage("Unscramble the word!");
    setUserInput("");
    setUsedWords(new Set());
    setShowHint(false);
    getNewWord();
  };

  const checkAnswer = () => {
    if (userInput.toUpperCase() === currentWord) {
      const pointsEarned = showHint ? 1 : 2; // Less points if hint was used
      setScore((prev) => prev + pointsEarned);
      setMessage(`Correct! ${showHint ? "+1 point" : "+2 points"} 🎉`);
      setUserInput("");
      getNewWord();
    } else {
      setMessage("Try again! 🤔");
    }
  };

  const getHint = () => {
    if (!showHint) {
      setShowHint(true);
      setMessage(
        `First letter is ${currentWord[0]} (using hints gives less points)`
      );
    }
  };

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setMessage(`Game Over! The word was: ${currentWord}`);
      if (score > highScore) {
        setHighScore(score);
      }
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameActive, score, highScore, currentWord]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && gameActive) {
      checkAnswer();
    }
  };

  const skipWord = () => {
    setMessage("Word skipped! No points lost 👍");
    getNewWord();
    setUserInput("");
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-gray-800 rounded-xl shadow-lg space-y-4 text-gray-100">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-purple-400">Word Scramble</h1>
        <div className="flex justify-between px-4">
          <span className="text-sm text-gray-300">Score: {score}</span>
          <span className="text-sm text-gray-300">High Score: {highScore}</span>
          <span className="text-sm text-gray-300">Time: {timeLeft}s</span>
        </div>
      </div>

      <div className="text-center space-y-4">
        {gameActive && (
          <>
            <div className="text-3xl font-bold tracking-wide text-cyan-400">
              {scrambledWord}
            </div>
            <div className="text-sm text-gray-400">
              Length: {currentWord.length} letters
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className="text-stone-900 placeholder:text-stone-500 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-center uppercase 
                       focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100 
                       placeholder-gray-400"
              maxLength={currentWord.length}
              placeholder="Your answer"
              autoFocus
            />
          </>
        )}
        <p className="text-sm text-gray-300">{message}</p>
      </div>

      <div className="flex justify-center space-x-2">
        <button
          onClick={gameActive ? checkAnswer : startGame}
          className="px-6 py-2 bg-purple-700 text-purple-100 rounded-lg 
                   hover:bg-purple-600 font-medium transition-colors"
        >
          {gameActive ? "Submit" : "Start"}
        </button>
        {gameActive && (
          <>
            <button
              onClick={getHint}
              disabled={showHint}
              className="px-4 py-2 bg-blue-700 text-blue-100 rounded-lg 
                       hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                       font-medium transition-colors"
            >
              Hint
            </button>
            <button
              onClick={skipWord}
              className="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg 
                       hover:bg-gray-600 font-medium transition-colors"
            >
              Skip
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const fusionApiPlugin = (context: PluginContext) => {
  return {
    onload: () => {
      const BirdGameWithContext = (props: any) => (
        <WordScramble {...props} pluginContext={context} />
      );

      const testPanel = {
        id: "test-panel",
        icon: "gamepad-2",
        title: "Test Panel",
        content: (
          <div className="p-2 space-y-2">
            <button
              onClick={() => {
                context.addTab("main", {
                  id: "test-panel",
                  title: "Test Panel",
                  icon: null,
                  props: {
                    content: "coming soon",
                  },
                });
              }}
              className="rounded bg-green-600 p-2"
            >
              Play game
            </button>
          </div>
        ),
      };
      context.registerSidebarTab("left", testPanel);

      context.registerPanel("main", {
        id: "test-panel",
        icon: "heart",
        title: "👾 Minigame",
        content: WordScramble,
      });
    },
    onunload: () => {
      console.log("hello plugin unloaded");
    },
  };
};

export default fusionApiPlugin;
