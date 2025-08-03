import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { timeAgo } from '../utils/timeAgo';

const regions = [
  '전체', '서울', '부산', '대구', '인천', '광주', '대전', '울산', 
  '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
];

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    let q;

    if (selectedRegion === '전체') {
      q = query(postsRef, orderBy('createdAt', 'desc'));
    } else {
      q = query(
        postsRef, 
        where('region', '==', selectedRegion),
        orderBy('createdAt', 'desc')
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        postsData.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        });
      });
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching posts:', error);
      Alert.alert('오류', '게시글을 불러오는데 실패했습니다.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedRegion]);

  const renderPost = ({ item }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postMeta}>
        {item.region} · 익명 · {timeAgo(item.createdAt)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 지역 필터 */}
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedRegion}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedRegion(itemValue)}
        >
          {regions.map((region) => (
            <Picker.Item key={region} label={region} value={region} />
          ))}
        </Picker>
      </View>

      {/* 게시글 목록 */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.postsList}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>게시글이 없습니다</Text>
          </View>
        }
      />

      {/* 글 작성 버튼 */}
      <TouchableOpacity
        style={styles.writeButton}
        onPress={() => navigation.navigate('Write')}
      >
        <Text style={styles.writeButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  picker: {
    height: 50,
    fontSize: 16,
  },
  postsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postMeta: {
    fontSize: 13,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  writeButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  writeButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});