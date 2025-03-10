import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { nextUser, previousUser } from '../userSlice';

const UserDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { users, currentIndex } = useSelector((state: RootState) => state.user);
  const user = users[currentIndex];
  const userInfoList = [
    { label: 'ID', value: user.id },
    { label: 'UID', value: user.uid },
    { label: 'Password', value: user.password },
    { label: 'First Name', value: user.first_name },
    { label: 'Last Name', value: user.last_name },
    { label: 'Username', value: user.username },
    { label: 'Email', value: user.email },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        </View>
        <Text style={styles.welcomeText}>User Information</Text>

        <View style={styles.infoContainer}>
          {userInfoList.map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <Text style={styles.label}>{item.label}</Text>
              <View style={styles.inputLike}>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
              onPress={() => dispatch(previousUser())}
              disabled={currentIndex === 0}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navButton, currentIndex === users.length - 1 && styles.disabledButton]}
              onPress={() => dispatch(nextUser())}
              disabled={currentIndex === users.length - 1}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 20,
    minHeight: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1a73e8',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#202124',
  },
  username: {
    fontSize: 16,
    color: '#5f6368',
    textAlign: 'center',
    marginBottom: 24,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputLike: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#dadce0',
  },
  value: {
    fontSize: 16,
    color: '#202124',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#1a73e8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#dadce0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default UserDetails;