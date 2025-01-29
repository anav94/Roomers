// DOBScreen.js
export default ({ navigation, route }) => {
    const [date, setDate] = useState(new Date());
  
    return (
      <>
        <DatePicker date={date} onDateChange={setDate} />
        <Button
          title="Next"
          onPress={() => navigation.navigate('Hometown', {
            ...route.params,
            dob: date.toISOString()
          })}
        />
      </>
    );
  };