// import { enablePromise, openDatabase } from "react-native-sqlite-storage"
import * as SQLite from 'expo-sqlite';

export const setupDB = () => {
  try{
    
    const db =  SQLite.openDatabase('DBNAME.db');
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS token (
          id INTEGER NOT NULL PRIMARY KEY,
          value TEXT NOT NULL
          );`
        )
    });
      } catch (err) {
        console.log('Error');
        console.log(err);
      } 

}

export const getToken = async ()  => {
  try {
    const db =  SQLite.openDatabase('DBNAME.db');
    db.transaction((tx) => {
      tx.executeSql("select * from token", [], (_, { rows }) => {
        console.log(JSON.stringify(rows))
        // console.log(rows._array[0])
      });
    });
    } catch (error) {
      console.error(error);
      throw Error('Failed to get token!');
    }
  };
  
export const saveToken = (token: string) => {
  try{
  const db =  SQLite.openDatabase('DBNAME.db');
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO token (value) values (?)`, [token],
      );
    });
  }catch(err){
    console.log('Error');
    console.log(err);
  }
};
  
export const deleteToken = async (id: number) => {
  try{
    const db =  SQLite.openDatabase('DBNAME.db');
      db.transaction((tx) => {
        tx.executeSql(`DELETE from token where id = (?)`, [id],
        );
      });
    }catch(err){
      console.log('Error');
      console.log(err);
    }
};
  
export const deleteTable = () => {
  try{
    const db =  SQLite.openDatabase('DBNAME.db');
      db.transaction((tx) => {
        tx.executeSql(`DELETE from token`, [], 
        // (_, { rows }) => {
          // console.log(JSON.stringify(rows))
        // }
        );
      });
    }catch(err){
      console.log('Error');
      console.log(err);
    }
};