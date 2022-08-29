import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utils/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    try {
      await insertPlace(place);
    } catch (err) {
      console.log(err);
    } finally {
      navigation.navigate("AllPlaces");
    }
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
