import { Text, View } from 'react-native';

export default function PageWrapper({ children }) {
  return (
    <View>
      {children}
    </View>
  );
}
