import { Button } from '@/presentation/components/ui/button'
import { Text, View } from 'react-native'

const Home = () => {
  return (
    <View className='flex-1 items-center justify-center'>
      <Button variant='outline'>
        <Text>Click me</Text>
      </Button>
      <Button variant='destructive'>
        <Text>Click me</Text>
      </Button>
      <Button variant='secondary'>
        <Text>Click me</Text>
      </Button>
      <Text>Home</Text>
    </View>
  )
}

export default Home
