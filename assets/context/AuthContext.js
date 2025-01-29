// AuthContext.js
export const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    email: '',
    phone: '',
    name: '',
    dob: '',
    hometown: ''
  });

  const updateData = (newData) => {
    setOnboardingData(prev => ({ ...prev, ...newData }));
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateData }}>
      {children}
    </OnboardingContext.Provider>
  );
};