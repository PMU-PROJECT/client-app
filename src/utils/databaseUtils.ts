import * as SQLite from "expo-sqlite";

/**
 * @function
 * @description Function used for creating the database and the token table
 * on the devise
 */
export const setupDB = () => {
  try {
    const db = SQLite.openDatabase("DBNAME.db");
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS token (
          id INTEGER NOT NULL PRIMARY KEY,
          value TEXT NOT NULL
          );`
      );
    });
  } catch (err) {
    console.log("Error setupDB");
    console.log(err);
  }
};

/**
 * @function
 * @description Function used for searching the database for a token
 * @returns string token or null if the query fails
 */
export const getToken: () => Promise<string | null> = () => {
  return new Promise((resolve) => {
    try {
      const db = SQLite.openDatabase("DBNAME.db");
      let token: string | null = null;
      db.transaction(
        (tx) => {
          tx.executeSql("select * from token", [], (_, { rows }) => {
            // console.log(JSON.stringify(rows));
            if (rows.length > 0) {
              token = rows._array[0].value;
              // console.log(token);
            }
            resolve(token);
          });
        },
        (error) => {
          console.error(error);
          // return null;
          throw Error("Failed to get token!");
        }
        // () => {
        //   console.log(token);
        //   return token;
        // }
      );
      // console.log(token);
      return token;
    } catch (err) {
      console.log("Error getTokenDB");
      console.log(err);
      // return null;
      throw Error("Failed to get token!");
    }
  });
};

/**
 * @function
 * @param token string
 * @description Function used for inserting a token string
 * to the database
 */
export const saveToken = (token: string) => {
  try {
    const db = SQLite.openDatabase("DBNAME.db");
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO token (value) values (?)`, [token]);
    });
    getToken();
  } catch (err) {
    console.log("Error saveTokenDB");
    console.log(err);
  }
};

/**
 * @function
 * @param id number of the token
 * @description Function used for deleting token from
 * the database based on given id number
 */
export const deleteToken = async (id: number) => {
  try {
    const db = SQLite.openDatabase("DBNAME.db");
    db.transaction((tx) => {
      tx.executeSql(`DELETE from token where id = (?)`, [id]);
    });
  } catch (err) {
    console.log("Error deleteTokenDB");
    console.log(err);
  }
};

/**
 * @function
 * @description Function used for deleting the entire database from the device
 */
export const deleteTable = () => {
  try {
    const db = SQLite.openDatabase("DBNAME.db");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE from token`,
        []
        // (_, { rows }) => {
        // console.log(JSON.stringify(rows))
        // }
      );
    });
  } catch (err) {
    console.log("Error deleteTable");
    console.log(err);
  }
};
