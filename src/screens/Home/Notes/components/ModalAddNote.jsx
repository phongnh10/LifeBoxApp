import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { noteSelectors } from '../../../../redux/note/noteSlice';
import { BASE_COLORS, COLORS, SPACING } from '../../../../utils';
import { userSelectors } from '../../../../redux/user/userSlice';

const ModalAddNote = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors?.user);
  const { loading } = useSelector(noteSelectors?.create);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title.trim()) return alert('Please enter a title');
    const newNote = {
      user_id: user?.id,
      title,
      content,
      reminder: false,
    };
    dispatch(createRequest({ note: newNote }));
    onClose();
    setTitle('');
    setContent('');
    dispatch(resetCreateState());
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>Add New Note</Text>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Content"
            multiline
            value={content}
            onChangeText={setContent}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.cancel]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={[styles.button, styles.save]}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: COLORS.backgroundWhite,
    width: '100%',
    padding: SPACING.l,
    borderRadius: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: SPACING.m,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.s,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: BASE_COLORS.gray,
  },
  save: {
    backgroundColor: BASE_COLORS.primary,
  },
  buttonText: {
    color: COLORS.buttonP,
    fontWeight: 'bold',
    backgroundColor: COLORS.backgroundSecondary,
  },
});

export default ModalAddNote;
