import * as SQLite from "expo-sqlite";

/**
 * @function
 * @description Function used for creating the database and the token and settings tables
 * on the devise
 */
export const setupDB = () => {
  try {
    const db = SQLite.openDatabase("TOURISTER.db");
    db.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS settings (
          id INTEGER NOT NULL PRIMARY KEY,
          language TEXT NOT NULL,
          theme TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS token (
          id INTEGER NOT NULL PRIMARY KEY,
          value TEXT NOT NULL
        );
         `
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
      const db = SQLite.openDatabase("TOURISTER.db");
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
    const db = SQLite.openDatabase("TOURISTER.db");
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
    const db = SQLite.openDatabase("TOURISTER.db");
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
export const deleteTokenTable = () => {
  try {
    const db = SQLite.openDatabase("TOURISTER.db");
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
    console.log("Error deleteTokenTable");
    console.log(err);
  }
};

/**
 * @function
 * @param language string
 * @param theme string
 * @description Function used for inserting a user's language and theme strings
 * to the database
 */
export const saveSettings = (language: string, theme: string) => {
  try {
    const db = SQLite.openDatabase("TOURISTER.db");
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO settings (language, theme) values (?, ?)`,
        [language, theme]
        // (_: any, { rows }: any) => {
        //   console.log(JSON.stringify(rows));
        // }
      );
    });
  } catch (err) {
    console.log("Error saveSettings");
    console.log(err);
  }
};

/**
 * @function
 * @description Function used for searching the database for a user's preffered language setting
 * @returns string language or null if the query fails
 */
export const getLanguageSetting: () => Promise<string | null> = () => {
  return new Promise((resolve) => {
    try {
      const db = SQLite.openDatabase("TOURISTER.db");
      let language: string | null = null;
      db.transaction(
        (tx) => {
          tx.executeSql("select language from settings", [], (_, { rows }) => {
            // console.log(JSON.stringify(rows));
            if (rows.length > 0) {
              language = rows._array[0].language;
              // console.log(token);
            }
            resolve(language);
          });
        },
        (error) => {
          console.error(error);
          // return null;
          throw Error("Failed to get language!");
        }
        // () => {
        //   console.log(language);
        //   return language;
        // }
      );
      // console.log(language);
      return language;
    } catch (err) {
      console.log("Error getLanguageDB");
      console.log(err);
      // return null;
      throw Error("Failed to get language!");
    }
  });
};

/**
 * @function
 * @description Function used for searching the database for a user's preffered theme setting
 * @returns string theme or null if the query fails
 */
export const getThemeSetting: () => Promise<string | null> = () => {
  return new Promise((resolve) => {
    try {
      const db = SQLite.openDatabase("TOURISTER.db");
      let theme: string | null = null;
      db.transaction(
        (tx) => {
          tx.executeSql("select theme from settings", [], (_, { rows }) => {
            // console.log(JSON.stringify(rows));
            if (rows.length > 0) {
              theme = rows._array[0].theme;
              // console.log(theme);
            }
            resolve(theme);
          });
        },
        (error) => {
          console.error(error);
          // return null;
          throw Error("Failed to get theme!");
        }
        // () => {
        //   console.log(theme);
        //   return theme;
        // }
      );
      // console.log(theme);
      return theme;
    } catch (err) {
      console.log("Error getThemeDB");
      console.log(err);
      // return null;
      throw Error("Failed to get theme!");
    }
  });
};

/**
 * @function
 * @description Function used for deleting the entire settings table from the device
 */
export const deleteSettingsTable = () => {
  try {
    const db = SQLite.openDatabase("TOURISTER.db");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE from settings`,
        []
        // (_, { rows }) => {
        // console.log(JSON.stringify(rows))
        // }
      );
    });
  } catch (err) {
    console.log("Error deleteSettingsTable");
    console.log(err);
  }
};
