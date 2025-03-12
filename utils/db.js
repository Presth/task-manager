import * as SQLite from "expo-sqlite";

export const createTask = (name, schedule, time) =>
  new Promise(async (resolve, reject) => {
    try {
      const db = await SQLite.openDatabaseAsync("task_manager.db");

      await db.execAsync(
        "CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY NOT NULL, name varchar(255), schedule varchar(255), time varchar(255), created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
      );

      const createTask = await db.runAsync(
        "INSERT INTO tasks (name, schedule, time) VALUES(?, ?, ?)",
        name,
        schedule,
        time
      );
      resolve(createTask);
    } catch (error) {
      reject(error);
    }
  });

export const getAlltasks = async () => {
  const db = await SQLite.openDatabaseAsync("task_manager.db");
  const tasks = await db.getAllAsync("SELECT * FROM tasks");
  return tasks;
};
