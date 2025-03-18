import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as SecureStore from "expo-secure-store";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

// Import environment variables
import Constants from "expo-constants";

type FormStep = {
  title: string;
  icon: string;
  fields: FormField[];
};

type FormField = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea" | "date" | "array";
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
};

const formSteps: FormStep[] = [
  // All existing form steps remain unchanged
  {
    title: "Personal Details",
    icon: "person.fill",
    fields: [
      {
        id: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        required: true,
      },
      {
        id: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter your last name",
        required: true,
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
      },
      {
        id: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter your phone number",
      },
      {
        id: "location",
        label: "Location",
        type: "text",
        placeholder: "Enter your location",
      },
      {
        id: "portfolio",
        label: "Portfolio Website",
        type: "url",
        placeholder: "Enter your portfolio URL",
      },
      {
        id: "linkedin",
        label: "LinkedIn Profile",
        type: "url",
        placeholder: "Enter your LinkedIn URL",
      },
    ],
  },
  {
    title: "Objective",
    icon: "target",
    fields: [
      {
        id: "objective",
        label: "Career Summary",
        type: "textarea",
        placeholder: "Brief summary of your career goals and aspirations",
        multiline: true,
        required: true,
      },
      {
        id: "experience",
        label: "Years of Experience",
        type: "text",
        placeholder: "Enter your total years of experience",
      },
      {
        id: "desiredRoles",
        label: "Desired Job Roles",
        type: "text",
        placeholder:
          "e.g., Software Engineer, Tech Lead (separate with commas)",
      },
    ],
  },
  {
    title: "Education",
    icon: "graduationcap.fill",
    fields: [
      {
        id: "degree",
        label: "Degree Name",
        type: "text",
        placeholder: "Enter your degree name",
        required: true,
      },
      {
        id: "university",
        label: "University Name",
        type: "text",
        placeholder: "Enter your university name",
        required: true,
      },
      {
        id: "gradYear",
        label: "Graduation Year",
        type: "text",
        placeholder: "Enter your graduation year",
        required: true,
      },
      {
        id: "coursework",
        label: "Relevant Coursework",
        type: "text",
        placeholder: "Enter relevant courses (separate with commas)",
      },
    ],
  },
  {
    title: "Skills",
    icon: "hammer.fill",
    fields: [
      {
        id: "technicalSkills",
        label: "Technical Skills",
        type: "text",
        placeholder: "Enter technical skills (separate with commas)",
        required: true,
      },
      {
        id: "softSkills",
        label: "Soft Skills",
        type: "text",
        placeholder: "Enter soft skills (separate with commas)",
      },
      {
        id: "additionalSkills",
        label: "Additional Skills",
        type: "text",
        placeholder:
          "Enter additional skills, certifications (separate with commas)",
      },
    ],
  },
  {
    title: "Experience",
    icon: "briefcase.fill",
    fields: [
      {
        id: "jobTitle",
        label: "Job Title",
        type: "text",
        placeholder: "Enter your job title",
        required: true,
      },
      {
        id: "company",
        label: "Company Name",
        type: "text",
        placeholder: "Enter company name",
        required: true,
      },
      {
        id: "jobLocation",
        label: "Location",
        type: "text",
        placeholder: "Enter job location",
      },
      {
        id: "startDate",
        label: "Start Date",
        type: "date",
        placeholder: "MM/YYYY",
        required: true,
      },
      {
        id: "endDate",
        label: "End Date",
        type: "date",
        placeholder: "MM/YYYY or Present",
      },
      {
        id: "achievements",
        label: "Achievements/Responsibilities",
        type: "textarea",
        placeholder: "Enter your key achievements and responsibilities",
        multiline: true,
        required: true,
      },
    ],
  },
  {
    title: "Projects",
    icon: "folder.fill",
    fields: [
      {
        id: "projectTitle",
        label: "Project Title",
        type: "text",
        placeholder: "Enter project title",
        required: true,
      },
      {
        id: "projectDesc",
        label: "Description",
        type: "textarea",
        placeholder: "Enter project description including technologies used",
        multiline: true,
        required: true,
      },
      {
        id: "projectLink",
        label: "Project Link",
        type: "url",
        placeholder: "Enter project URL (if applicable)",
      },
    ],
  },
  {
    title: "Extra-Curricular",
    icon: "person.2.fill",
    fields: [
      {
        id: "activities",
        label: "Activities",
        type: "textarea",
        placeholder: "Describe your extra-curricular activities",
        multiline: true,
      },
      {
        id: "socialLinks",
        label: "Social Media Links",
        type: "text",
        placeholder: "Enter relevant social media links (separate with commas)",
      },
    ],
  },
  {
    title: "Leadership",
    icon: "star.fill",
    fields: [
      {
        id: "leadershipRole",
        label: "Leadership Role",
        type: "text",
        placeholder: "Enter your leadership role",
      },
      {
        id: "organization",
        label: "Organization Name",
        type: "text",
        placeholder: "Enter organization name",
      },
      {
        id: "responsibilities",
        label: "Responsibilities",
        type: "textarea",
        placeholder: "Describe your leadership responsibilities",
        multiline: true,
      },
    ],
  },
];

// Get API URL from environment variables
const API_URL =
  Constants.expoConfig?.extra?.API_URL ||
  "https://e612-102-0-11-108.ngrok-free.app";

export default function CreateResumeScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateCurrentStep = () => {
    const currentFields = formSteps[currentStep].fields;
    const newErrors: Record<string, string> = {};

    currentFields.forEach((field) => {
      if (
        field.required &&
        (!formData[field.id] || formData[field.id].trim() === "")
      ) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    if (currentStep < formSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit form
      submitForm();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const submitForm = async () => {
    try {
      setIsSubmitting(true);

      console.log("Preparing to submit form data to API...");

      // Format form data for API
      const formattedData = {
        personalDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          portfolio: formData.portfolio,
          linkedin: formData.linkedin,
        },
        objective: {
          summary: formData.objective,
          yearsExperience: formData.experience,
          desiredRoles:
            formData.desiredRoles?.split(",").map((role) => role.trim()) || [],
        },
        education: [
          {
            degree: formData.degree,
            university: formData.university,
            graduationYear: formData.gradYear,
            coursework:
              formData.coursework?.split(",").map((course) => course.trim()) ||
              [],
          },
        ],
        skills: {
          technical:
            formData.technicalSkills?.split(",").map((skill) => skill.trim()) ||
            [],
          soft:
            formData.softSkills?.split(",").map((skill) => skill.trim()) || [],
          additional:
            formData.additionalSkills
              ?.split(",")
              .map((skill) => skill.trim()) || [],
        },
        experience: [
          {
            jobTitle: formData.jobTitle,
            company: formData.company,
            location: formData.jobLocation,
            startDate: formData.startDate,
            endDate: formData.endDate,
            achievements: formData.achievements,
          },
        ],
        projects: [
          {
            title: formData.projectTitle,
            description: formData.projectDesc,
            link: formData.projectLink,
          },
        ],
        extraCurricular: {
          activities: formData.activities,
          socialLinks:
            formData.socialLinks?.split(",").map((link) => link.trim()) || [],
        },
        leadership: {
          role: formData.leadershipRole,
          organization: formData.organization,
          responsibilities: formData.responsibilities,
        },
      };

      console.log("Submitting data to API:", API_URL);
      console.log(
        "Form data being sent:",
        JSON.stringify(formattedData, null, 2)
      );

      // Make API call
      const response = await fetch(`${API_URL}/api/resumes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);

        try {
          const errorData = JSON.parse(errorText);
          throw new Error(
            errorData.message || errorData.error || "Failed to submit resume"
          );
        } catch (e) {
          throw new Error(
            `Server error (${response.status}): ${
              errorText || "No error details available"
            }`
          );
        }
      }

      const responseData = await response.json();
      console.log("Resume created successfully:", responseData);

      // Save the resume ID for later reference
      if (responseData.id) {
        await SecureStore.setItemAsync("lastResumeId", responseData.id);
      }

      // Show success message
      Alert.alert("Success", "Your resume has been created successfully!", [
        { text: "OK", onPress: () => router.push("/portfolio") },
      ]);
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Submission Error",
        `There was a problem submitting your resume: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        [{ text: "Try Again" }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentFields = formSteps[currentStep].fields;

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <IconSymbol size={28} name="chevron.left" color="#007AFF" />
          </Pressable>
          <ThemedText style={styles.headerTitle}>
            {formSteps[currentStep].title}
          </ThemedText>
          <ThemedView style={styles.progressIndicator}>
            <ThemedText style={styles.progressText}>
              {`${currentStep + 1}/${formSteps.length}`}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <KeyboardAwareScrollView
          style={styles.formContainer}
          extraScrollHeight={10}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {currentFields.map((field) => (
            <ThemedView key={field.id} style={styles.fieldContainer}>
              <ThemedText style={styles.label}>
                {field.label}{" "}
                {field.required && (
                  <ThemedText style={styles.required}>*</ThemedText>
                )}
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  field.multiline && styles.multilineInput,
                  errors[field.id] ? styles.inputError : null,
                ]}
                placeholder={field.placeholder}
                placeholderTextColor="#666666"
                onChangeText={(value) => handleInputChange(field.id, value)}
                value={formData[field.id]}
                multiline={field.multiline}
                keyboardType={
                  field.type === "tel"
                    ? "phone-pad"
                    : field.type === "email"
                    ? "email-address"
                    : "default"
                }
                autoCapitalize={field.type === "email" ? "none" : "words"}
                autoComplete={
                  field.type === "email"
                    ? "email"
                    : field.type === "tel"
                    ? "tel"
                    : "off"
                }
              />
              {errors[field.id] && (
                <ThemedText style={styles.errorText}>
                  {errors[field.id]}
                </ThemedText>
              )}
            </ThemedView>
          ))}
          <ThemedView style={styles.spacer} />
        </KeyboardAwareScrollView>

        <ThemedView style={styles.buttonContainer}>
          <Pressable
            style={[styles.nextButton, isSubmitting && styles.disabledButton]}
            onPress={handleNext}
            disabled={isSubmitting}
          >
            {isSubmitting && currentStep === formSteps.length - 1 ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <ThemedText style={styles.buttonText}>
                {currentStep === formSteps.length - 1 ? "Submit" : "Next"}
              </ThemedText>
            )}
          </Pressable>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    marginLeft: 12,
  },
  progressIndicator: {
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  required: {
    color: "#FF453A",
  },
  input: {
    backgroundColor: "#1C1C1E",
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: "#FFFFFF",
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#1C1C1E",
  },
  inputError: {
    borderColor: "#FF453A",
  },
  errorText: {
    color: "#FF453A",
    fontSize: 14,
    marginTop: 4,
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  spacer: {
    height: 60, // Additional space at the bottom of the form
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: "#222222",
    backgroundColor: "#000000",
  },
  nextButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#007AFF80", // 50% opacity
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});
