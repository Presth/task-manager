import * as SQLite from "expo-sqlite";

export const createTask = (name, schedule, time, notificationId) =>
  new Promise(async (resolve, reject) => {
    try {
      const db = await SQLite.openDatabaseAsync("task_manager.db");

      const createTable = await db.execAsync(
        "CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY NOT NULL, name varchar(255), schedule varchar(255), time varchar(255), notificationId varchar(255), created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
      );

      const createTask = await db.runAsync(
        "INSERT INTO tasks (name, schedule, time, notificationId) VALUES(?, ?, ?, ?)",
        name,
        schedule,
        time,
        notificationId
      );
      resolve(createTask);
    } catch (error) {
      reject(error);
    }
  });

export const getAlltasks = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("task_manager.db");
    const tasks = await db.getAllAsync("SELECT * FROM tasks");
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const db = await SQLite.openDatabaseAsync("task_manager.db");
    const deletion = await db.runAsync("DELETE FROM tasks where id= ? ", id);
    alert("Task Deleted");
    // return deletion;
  } catch (error) {
    alert("Unable to delete task");
  }
};
