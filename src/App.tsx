// App.tsx
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './store';
import { fetchUsers } from './userSlice';
import UserDetails from './components/UserDetails';

const MainApp: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (users.length === 0) {
    return <Text style={styles.error}>No users found</Text>;
  }

  return <UserDetails />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <MainApp />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
