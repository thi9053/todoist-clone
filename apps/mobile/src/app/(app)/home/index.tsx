import { Button } from '@/presentation/components/ui/button'
import { useAppStore } from '@/shared/store'
import { Text, View } from 'react-native'

const Home = () => {
  const { text, setText, count, setCount } = useAppStore()
  return (
    <View className='flex-1 items-center justify-center'>
      <Button variant='outline' onPress={() => setText('Hello')}>
        <Text>Click me</Text>
      </Button>
      <Text>{text}</Text>
      <Button variant='outline' onPress={() => setCount(count + 1)}>
        <Text>Increment</Text>
      </Button>
      <Text>{count}</Text>
    </View>
  )
}

export default Home
