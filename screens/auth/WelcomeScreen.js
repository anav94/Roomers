// WelcomeScreen.js
export default ({ navigation }) => (
    <>
      <Button 
        title="Login" 
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Signup')}
      />
    </>
  );