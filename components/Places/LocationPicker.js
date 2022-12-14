import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { getAddress, getMapPreview } from "../../utils/location";
import OutlinedButton from "../UI/OutlinedButton";

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const isFocused = useIsFocused();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && params) {
      const mapPickedLocation = {
        lat: params.latitude,
        lng: params.longitude,
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [params, isFocused]);

  useEffect(() => {
    if (pickedLocation) {
      getAddress(pickedLocation).then((address) =>
        onPickLocation({ ...pickedLocation, address })
      );
    }
  }, [onPickLocation, pickedLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const { granted } = await requestPermission();
      return granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficent permissions!",
        "You need to grant location permission to use this app"
      );

      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const { coords } = await getCurrentPositionAsync();
    setPickedLocation({ lat: coords.latitude, lng: coords.longitude });
  }

  function pickOnMapHandler() {
    navigate("Map");
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <Image
            source={{ uri: getMapPreview(pickedLocation) }}
            style={styles.image}
          />
        ) : (
          <Text>No location picked yet.</Text>
        )}
      </View>

      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate user
        </OutlinedButton>

        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 6,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
