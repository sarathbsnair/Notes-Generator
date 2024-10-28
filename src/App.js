import Autocomplete from "./componants/Autocomplete";

function App() {

  const staticData =[
    'Apple','banana', 'pumpkin'
  ];

  const fetchSuggestions = async (query) => {
    try {
      const url = `https://dummyjson.com/recipes/search?q=${query}`
      const responseData = await fetch(url);
      const data = await responseData.json();
      console.log('response - ',data);
      return data?.recipes;
    } catch (error) {
      throw new Error('Error Fetching Data');
    }
  }

  return (
    <div className="container">
      <h1>Seach Box - Auto Suggestions + Text Highlighting</h1>
      <Autocomplete
        staticData={staticData}
        placeholderText={'Enter Recipe ...'}
        customLoading={'Loading...'}
        customErrorMessage={'Error Fetching Data'}
        fetchSuggestions={fetchSuggestions}
        dataKey={'name'}
      />
    </div>
  );
}

export default App;