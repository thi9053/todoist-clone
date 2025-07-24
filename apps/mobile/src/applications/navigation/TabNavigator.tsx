import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStack } from './home/HomeStack'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
