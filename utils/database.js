import * as SQLite from "expo-sqlite";
import Place from "../models/Place";

const database = SQLite.openDatabase("places.db");

export function init() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function insertPlace({ title, imageUri, address, lat, lng }) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng ) VALUES (?, ?, ?, ?, ?)`,
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function fetchPlaces() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) =>
          resolve(
            result.rows._array.map(
              ({ title, imageUri, address, lat, lng, id }) =>
                new Place(title, imageUri, address, lat, lng, id)
            )
          ),
        (_, error) => reject(error)
      );
    });
  });
}

export function fetchPlaceDetails(id) {
  return new Promise((resolve, reject) => {
    return database.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM places WHERE id = ?",
        [id],
        (_, result) => resolve(result.rows._array[0]),
        (_, error) => reject(error)
      )
    );
  });
}
