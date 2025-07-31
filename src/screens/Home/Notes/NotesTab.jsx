import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../../../utils';
import i18n from '../../../../i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ICON_SIZES from '../../../utils/iconSize';
import { useDispatch } from 'react-redux';
import { createRequest } from '../../../redux/note/noteSlice';
import ModalAddNote from './components/ModalAddNote';

export default function NotesTab() {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: COLORS.backgroundPrimary,
          padding: SPACING.l,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: FONT_SIZES.bodyLarge,
            fontWeight: FONT_WEIGHTS.bold,
          }}
        >
          {i18n.t('notes.title')}
        </Text>
        <View style={{ flexDirection: 'row', gap: SPACING.l }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(createRequest());
            }}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={ICON_SIZES['2xl']}
              color="black"
            />
          </TouchableOpacity>

          {/* <MaterialCommunityIcons
              name="alert-circle-outline"
              size={ICON_SIZES['2xl']}
              color="black"
            /> */}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          backgroundColor: COLORS.backgroundPrimary,
          padding: SPACING.l,
        }}
      ></View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 0,
          end: 0,
          margin: SPACING.xxxl,
          backgroundColor: COLORS.backgroundSecondary,
          padding: SPACING.m,
          borderRadius: SPACING.m,
        }}
        onPress={() => {
          setModalVisible(prev => !prev);
        }}
      >
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={ICON_SIZES['2xl']}
          color={COLORS.buttonPrimary}
        />
      </TouchableOpacity>
      {isModalVisible && (
        <ModalAddNote
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    gap: SPACING.l,
  },
});
