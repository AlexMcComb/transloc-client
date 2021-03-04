const getCoordinates = async (query, setLoading) => {
  setLoading(true);
  const coordQuery = query.data[0].geometry.coordinates[0].flat();
  const queryURL = `${process.env.REACT_APP_DATABASE_URL}/api/coordinates/?left=${coordQuery[0]}&bottom=${coordQuery[1]}&right=${coordQuery[4]}&top=${coordQuery[5]}`;
  const response = await fetch(queryURL);
  let json = await response.json();

  if (response.ok) {
    setLoading(false);
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
};

export default getCoordinates;
