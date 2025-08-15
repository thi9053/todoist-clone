import '@/shared/styles/global.css'

import { ThemeProvider } from '@/presentation/providers/ThemeProvider'
import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const RootLayout = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
          <Stack
            screenOptions={{
              headerShown: false
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default RootLayout
