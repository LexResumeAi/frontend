import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function PortfolioScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">My Portfolio</ThemedText>
          <ThemedText type="subtitle">Your saved resumes and cover letters</ThemedText>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle">Resumes</ThemedText>
          <ThemedView style={styles.emptyState}>
            <IconSymbol size={48} name="doc.text" color="#808080" />
            <ThemedText style={styles.emptyStateText}>
              No resumes created yet. Start by creating your first resume!
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle">Cover Letters</ThemedText>
          <ThemedView style={styles.emptyState}>
            <IconSymbol size={48} name="envelope" color="#808080" />
            <ThemedText style={styles.emptyStateText}>
              No cover letters created yet. Create a resume first, then generate matching cover letters!
            </ThemedText>
          </ThemedView>
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
    backgroundColor: '#1e1e1e',
  },
  titleContainer: {
    gap: 8,
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1e1e1e',
  },
  sectionContainer: {
    padding: 16,
    gap: 12,
    backgroundColor: '#1e1e1e',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#808080',
  },
});