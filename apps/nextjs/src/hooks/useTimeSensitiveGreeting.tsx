const useTimeSensitiveGreeting = () => {
  const date = new Date();
  const greetings = ["Good Morning", "Good Afternoon", "Good Evening"];

  const getGreeting = () => {
    const hour = date.getHours();
    if (hour < 12) return greetings[0];
    else if (hour < 17) return greetings[1];
    else return greetings[2];
  };

  return getGreeting();
};

export default useTimeSensitiveGreeting;
