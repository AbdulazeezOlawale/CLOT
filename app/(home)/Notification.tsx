import { SafeAreaView, View } from 'react-native'
import React from 'react'
import styles from '../styles';
import CustomFlatList from '@/components/products/CustomFlatList';
const data = Array(10).fill(1);

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={() => <View style={styles.item} />}
        HeaderComponent={<View style={styles.header} />}
        StickyElementComponent={<View style={styles.sticky} />}
        TopListElementComponent={<View style={styles.topList} />}
      />
    </SafeAreaView>
  );
}

export default Notification