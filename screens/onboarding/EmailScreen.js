// EmailScreen.js
export default ({ navigation }) => {
    const [email, setEmail] = useState('');
  
    return (
      <>
        <TextInput 
          placeholder="Email" 
          value={email}
          onChangeText={setEmail}
        />
        <Button
          title="Next"
          onPress={() => navigation.navigate('Phone', { email })}
        />
      </>
    );
  };