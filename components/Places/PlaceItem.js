import { Image, Pressable, View } from "react-native";

function PlaceItem({ place: { title, imageUri, address } }) {
  return (
    <Pressable>
      <Image source={{ uri: imageUri }} />

      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;
