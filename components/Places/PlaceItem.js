import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function PlaceItem({ place, onSelect }) {
  const { title, imageUri, address, id } = place;

  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && pressed]}
      onPress={onSelect.bind(this, id)}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
