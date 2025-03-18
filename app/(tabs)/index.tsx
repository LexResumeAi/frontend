import { StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const navigateToForm = (type: 'resume' | 'cover-letter') => {
    router.push(`/create/${type}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">LexAi</ThemedText>
          <ThemedText type="subtitle">Create professional resumes and cover letters</ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <ThemedView 
            style={styles.button}
            onTouchEnd={() => navigateToForm('resume')}>
            <IconSymbol size={32} name="doc.text.fill" color="#ffffff" />
            <ThemedText style={styles.buttonText}>Create Resume</ThemedText>
          </ThemedView>

          <ThemedView 
            style={styles.button}
            onTouchEnd={() => navigateToForm('cover-letter')}>
            <IconSymbol size={32} name="envelope.fill" color="#ffffff" />
            <ThemedText style={styles.buttonText}>Create Cover Letter</ThemedText>
          </ThemedView>

          <ThemedView 
            style={[styles.button, styles.portfolioButton]}
            onTouchEnd={() => router.push('/portfolio')}>
            <IconSymbol size={32} name="folder.fill" color="#ffffff" />
            <ThemedText style={styles.buttonText}>View Portfolio</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.infoContainer}>
          <ThemedText type="subtitle">Getting Started</ThemedText>
          <ThemedText>
            1. Create a professional resume using our guided builder{'\n'}
            2. Generate targeted cover letters based on your resume{'\n'}
            3. Access all your documents in the portfolio section
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  container: {
    flex: 1,
    gap: 24,
    paddingTop: 16,
    backgroundColor: '#1e1e1e',
  },
  titleContainer: {
    gap: 8,
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1e1e1e',
  },
  buttonContainer: {
    gap: 16,
    padding: 16,
    backgroundColor: '#1e1e1e',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  portfolioButton: {
    backgroundColor: '#5856D6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 16,
    gap: 12,
    backgroundColor: '#1e1e1e',
  },
});