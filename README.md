# LexAI Resume Builder Frontend Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Screens and Navigation](#screens-and-navigation)
4. [Components](#components)
5. [Theming and Styling](#theming-and-styling)
6. [API Integration](#api-integration)
7. [Form Handling](#form-handling)
8. [Data Storage](#data-storage)
9. [Platform-Specific Considerations](#platform-specific-considerations)
10. [Environment Configuration](#environment-configuration)
11. [Building and Deployment](#building-and-deployment)
12. [Troubleshooting](#troubleshooting)

## Introduction

The LexAI Resume Builder is a cross-platform mobile application built with React Native and Expo. It allows users to create professional resumes and cover letters, with a streamlined form-based workflow and integrated document management.

### Key Features

- Resume creation with a multi-step form wizard
- Cover letter generation
- Portfolio view to manage created documents
- PDF generation and email delivery
- Dark mode UI

## Project Structure

The application follows the Expo Router file-based routing structure:

```
.expo/                  # Expo configuration files
app/                    # Main application code
  ├── (tabs)/           # Tab-based navigation screens
  │    ├── _layout.tsx  # Tab navigation layout
  │    ├── index.tsx    # Home screen
  │    └── portfolio.tsx # Portfolio screen
  ├── create/           # Document creation screens
  │    └── resume.tsx   # Resume creation form
  ├── _layout.tsx       # Root layout and theme setup
  └── +not-found.tsx    # 404 error screen
assets/                 # Images, fonts, and other static resources
components/             # Reusable UI components
  ├── ui/               # Basic UI components
  │    └── IconSymbol.tsx # Icon component
  ├── ThemedText.tsx    # Themed text component
  └── ThemedView.tsx    # Themed view component
constants/              # App-wide constant values
  └── Colors.ts         # Color definitions
hooks/                  # Custom React hooks
  └── useColorScheme.ts # Theme detection hook
services/               # API services and utilities
.env                    # Environment variables
```

## Screens and Navigation

The application uses Expo Router for navigation with a structured, file-based routing system.

### Navigation Structure

- **Root Layout** (`_layout.tsx`): Sets up the SafeAreaProvider, ThemeProvider, and StatusBar configuration
- **Tab Navigation** (`(tabs)/_layout.tsx`): Defines the bottom tab navigation between Home and Portfolio screens
- **Screens**:
  - `index.tsx`: Home screen with options to create resumes and cover letters
  - `portfolio.tsx`: Displays saved resumes and cover letters
  - `create/resume.tsx`: Multi-step form for creating a resume
  - `+not-found.tsx`: 404 error page for invalid routes

### Navigation Flow

1. The app starts at the Home screen
2. Users can navigate to the Portfolio tab or tap "Create Resume" or "Create Cover Letter"
3. The create screens follow a step-by-step form process with next/back navigation
4. After submission, users are directed back to the Portfolio screen to view their documents

## Components

### Core Components

- **ThemedView**: A wrapper around the standard View component that applies theme-aware styling
- **ThemedText**: A wrapper around the standard Text component that applies theme-aware styling and supports different text types
- **IconSymbol**: A component for displaying SF Symbols (iOS) or equivalent icons on Android

### UI Components

- **HapticTab**: Enhanced tab button with haptic feedback
- **KeyboardAwareScrollView**: Scrollable container that adjusts for keyboard display

### Form Components

The resume creation form (`resume.tsx`) uses standard React Native inputs with custom styling:

- TextInput for single-line text fields
- TextInput with multiline prop for text areas
- Custom styling for input validation and error states

## Theming and Styling

### Theme System

The app uses a dark theme with customized colors:

- Background: `#1e1e1e` (dark gray)
- Text: `#ffffff` (white)
- Primary: `#007AFF` (blue)
- Secondary: `#5856D6` (purple)
- Error: `#FF453A` (red)

The theme is applied via the React Navigation ThemeProvider and custom ThemedView and ThemedText components.

### Styling Approach

Styles are defined using React Native's StyleSheet API with a focus on:

- Consistent spacing and padding
- Platform-specific adaptations for shadow effects
- SafeArea considerations for notches and system UI
- Dark mode optimization
- Responsive layouts that work across device sizes

## API Integration

### Backend Communication

The app communicates with the backend API using the standard `fetch` API:

```javascript
// Example API call to create a resume
const response = await fetch(`${API_URL}/api/resumes`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formattedData),
});
```

### API URL Configuration

The API URL is stored in an environment variable and accessed via Expo's Constants:

```javascript
const API_URL =
  Constants.expoConfig?.extra?.API_URL ||
  "https://e612-102-0-11-108.ngrok-free.app";
```

## Form Handling

### Form Structure

The resume creation form is structured as a multi-step wizard with field groups organized by category:

1. Personal Details
2. Objective
3. Education
4. Skills
5. Experience
6. Projects
7. Extra-Curricular Activities
8. Leadership

### Form Data Management

Form data is managed using React's useState hook:

```javascript
const [formData, setFormData] = useState<Record<string, string>>({});

// Update function
const handleInputChange = (fieldId: string, value: string) => {
  setFormData((prev) => ({
    ...prev,
    [fieldId]: value,
  }));

  // Clear error for this field if it exists
  if (errors[fieldId]) {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldId];
      return newErrors;
    });
  }
};
```

### Validation

Form validation is performed on a per-step basis:

- Required fields are checked before proceeding to the next step
- Validation errors are displayed inline under the corresponding fields
- The submit button is only enabled when all required fields are filled

## Data Storage

### Local Storage

The app uses Expo's SecureStore for secure local storage:

```javascript
// Save resume ID after creation
if (responseData.id) {
  await SecureStore.setItemAsync("lastResumeId", responseData.id);
}
```

### Data Structure

The resume data is structured according to the backend API requirements:

```typescript
// Resume data structure
interface ResumeData {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    location?: string;
    portfolio?: string;
    linkedin?: string;
  };
  objective: {
    summary: string;
    yearsExperience?: string;
    desiredRoles?: string[];
  };
  education: Array<{
    degree: string;
    university: string;
    graduationYear: string;
    coursework?: string[];
  }>;
  skills: {
    technical: string[];
    soft?: string[];
    additional?: string[];
  };
  experience: Array<{
    jobTitle: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    achievements: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    link?: string;
  }>;
  extraCurricular?: {
    activities?: string;
    socialLinks?: string[];
  };
  leadership?: {
    role?: string;
    organization?: string;
    responsibilities?: string;
  };
}
```

## Platform-Specific Considerations

The app includes several platform-specific adaptations:

```javascript
// Platform-specific shadow styling
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

// Platform-specific tab bar positioning
tabBarStyle: {
  backgroundColor: '#1C1C1E',
  borderTopWidth: 0,
  position: Platform.select({
    ios: 'absolute',
    default: 'relative',
  }),
},

// Platform-specific animation
animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
```

## Environment Configuration

### Environment Variables

The app uses a `.env` file to store environment variables:

```
API_URL=https://e612-102-0-11-108.ngrok-free.app
```

### Accessing Environment Variables

Environment variables are accessed through Expo's Constants:

```javascript
import Constants from "expo-constants";

const API_URL =
  Constants.expoConfig?.extra?.API_URL ||
  "https://e612-102-0-11-108.ngrok-free.app";
```

## Building and Deployment

### Development

To start the development server:

```bash
npx expo start
```

This will open the Expo development server where you can:

- Run on iOS simulator
- Run on Android emulator
- Run on a physical device using the Expo Go app

### Production Build

To create a production build:

```bash
# For iOS
eas build --platform ios

# For Android
eas build --platform android
```

## Troubleshooting

### Common Issues

1. **API Connection Errors**

   - Check that the API URL in the .env file is correct
   - Ensure the backend server is running
   - For local development with ngrok, make sure the URL is updated when the tunnel changes

2. **Form Submission Issues**

   - Check the console logs for error details
   - Verify all required fields are completed
   - Ensure the data structure matches what the API expects

3. **UI Display Issues**
   - Check for SafeArea configuration issues
   - Verify that theme colors are applied correctly
   - Test on multiple device sizes for responsive layout issues

### Debugging Tools

- Use console.log statements for debugging (visible in the Expo dev tools)
- Enable the React Native Debugger for advanced debugging
- Check the network tab in development tools to inspect API requests/responses
