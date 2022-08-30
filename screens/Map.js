import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params && {
    latitude: route.params?.latitude,
    longitude: route.params?.longitude,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation?.latitude ?? 37.78,
    longitude: initialLocation?.longitude ?? -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation({ ...coordinate });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first."
      );
      return;
    }

    navigation.navigate("AddPlace", { ...selectedLocation });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    if (initialLocation) return;

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [initialLocation, navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Picked location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
