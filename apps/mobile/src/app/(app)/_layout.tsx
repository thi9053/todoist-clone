import { Tabs } from 'expo-router'

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen name='home/index' options={{ title: 'Home' }} />
    </Tabs>
  )
}
