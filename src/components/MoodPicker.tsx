import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  // Image,
  // LayoutAnimation,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { useAppContext } from '../context/App.provider';
import { theme } from '../theme';
import { MoodOptionType } from '../types';

const moodOptions: MoodOptionType[] = [
  { emoji: '🤓', description: 'Studious' },
  { emoji: '🤔', description: 'Pensive' },
  { emoji: '🤗', description: 'Happy' },
  { emoji: '🤡', description: 'Celebratory' },
  { emoji: '😤', description: 'Frustrated' },
];

// const imgSource = require('../assets/happy.png');

export const MoodPicker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  // const [hasSelected, setHasSelected] = useState<boolean>(false);

  const { handleSelectedMood } = useAppContext();

  const handleSelectMood = useCallback(() => {
    if (selectedMood) {
      handleSelectedMood(selectedMood);
      setSelectedMood(undefined);
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      // LayoutAnimation.configureNext({
      //   duration: 500,
      //   create: { type: 'easeIn', property: 'opacity' },
      //   update: { type: 'linear', property: 'opacity' },
      //   delete: { type: 'easeOut', property: 'opacity' },
      // });
      // setHasSelected(true);
    }
  }, [handleSelectedMood, selectedMood]);

  // const hideHasSelected = () => {
  //   // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   // LayoutAnimation.configureNext({
  //   //   duration: 500,
  //   //   create: { type: 'easeInEaseOut', property: 'opacity' },
  //   //   update: { type: 'linear', property: 'opacity' },
  //   //   delete: { type: 'easeOut', property: 'opacity' },
  //   // });
  //   setHasSelected(false);
  // };

  // if (hasSelected) {
  //   return (
  //     <View style={styles.container}>
  //       <Image source={imgSource} style={styles.image} resizeMode="contain" />
  //       <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
  //         <Text style={styles.textButton}>Back</Text>
  //       </Pressable>
  //     </View>
  //   );
  // }

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(selectedMood ? 1 : 0.5, { duration: 1000 }),
      transform: [
        { scale: withTiming(selectedMood ? 1 : 0.8, { duration: 1000 }) },
      ],
    }),
    [selectedMood],
  );

  const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              style={[
                styles.moodItem,
                option === selectedMood ? styles.selectedMoodItem : null,
              ]}
              onPress={() => {
                setSelectedMood(option);
                ReactNativeHapticFeedback.trigger('impactLight', {
                  enableVibrateFallback: true,
                  ignoreAndroidSystemSettings: true,
                });
              }}>
              <Text>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.selectedMoodDescription}>
              {option === selectedMood ? option.description : ''}
            </Text>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.button, animatedStyle]}
        onPress={handleSelectMood}
        android_ripple={{
          color: theme.colorBlue,
          borderless: true,
          radius: 40,
        }}>
        <Text style={styles.textButton}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colorPurple,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  moodItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMoodItem: {
    borderColor: theme.colorRed,
    borderWidth: 1,
    backgroundColor: theme.colorPurple,
  },
  selectedMoodDescription: {
    fontSize: 10,
    fontFamily: theme.fontFamilyRegular,
    textAlign: 'center',
    color: theme.colorPurple,
  },
  button: {
    backgroundColor: theme.colorPurple,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  textButton: {
    color: theme.colorWhite,
  },
  textTitle: {
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyRegular,
    marginBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
  },
});
