import { Stack, Tabs } from "expo-router";
import "@/global.css";
import TaskContextProvider from "@/contexts/tasks";

export default function RootLayout() {
  return (
    <TaskContextProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TaskContextProvider>
  );
}
