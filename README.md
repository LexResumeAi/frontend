# LexAi Documentation

## Overview
LexAi is a mobile application developed using React Native and Node.js (TypeScript). It enables users to input details and generate professional PDFs using LaTeX. The app leverages AI to enhance content structuring and best practices for each section and paragraph.

## Features
- **User Input:** Users enter their details through the app interface.
- **AI-powered Optimization:** The app uses Gemini AI API to enhance structuring and formatting.
- **LaTeX PDF Generation:** Converts user input into a well-formatted PDF using LaTeX.
- **Cross-platform Support:** Built using Expo for easier development and deployment.
- **Customizable Templates:** Users can select different LaTeX templates for various document types.
- **Real-time Preview:** A live preview is available to show document structure before generating the final PDF.
- **Cloud Storage Integration:** Supports saving PDFs to cloud storage services like Google Drive and Dropbox.
- **Offline Mode:** Basic functionalities work without an internet connection.
- **User Authentication:** Secure login and user data storage.
- **Multi-language Support:** Users can generate documents in multiple languages.

## Technologies Used
- **Frontend:** React Native with Expo
- **Backend:** Node.js with TypeScript
- **AI Integration:** Gemini AI API for content enhancement
- **PDF Generation:** LaTeX
- **Database:** PostgreSQL for user data and document storage
- **Cloud Services:** Firebase for authentication and cloud storage

## Installation & Setup
### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Install dependencies

```sh
npm install
```

### Running the App
```sh
expo start
```

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/LexResumeAi/LexAi.git
   cd LexAi
   ```
2. Install backend dependencies:
   ```sh
   cd server
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   DATABASE_URL=<your_database_url>
   GEMINI_API_KEY=<your_api_key>
   ```
4. Run the backend server:
   ```sh
   npm start
   ```

## API Integration
LexAi communicates with the backend via a REST API built with Node.js and TypeScript. The Gemini AI API is used for processing and enhancing user input before LaTeX processing.

### API Endpoints
- **User Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - User login
  - `POST /api/auth/logout` - User logout

- **Document Processing**
  - `POST /api/document/create` - Create a new document
  - `GET /api/document/:id` - Retrieve a document
  - `DELETE /api/document/:id` - Delete a document

- **AI Optimization**
  - `POST /api/ai/optimize` - Enhance content structure

- **PDF Generation**
  - `POST /api/pdf/generate` - Convert structured content to a PDF
  - `GET /api/pdf/download/:id` - Download a generated PDF

## PDF Generation Workflow
1. **User Inputs Details:** Users enter relevant information in the app.
2. **AI Refines Content:** The Gemini AI API processes and enhances input for better readability and structure.
3. **LaTeX Compilation:** The structured content is compiled into a professional PDF using LaTeX.
4. **User Downloads PDF:** The final document is made available for download and sharing.

## Contribution Guidelines
- Follow the existing project structure.
- Use TypeScript for type safety.
- Ensure AI-generated content improves document readability.
- Submit pull requests with clear commit messages.
- Document new features in the README file.

## Repository
The source code for LexAi is available at: [LexAi GitHub Repository](https://github.com/LexResumeAi/LexAi)

## License
LexAi is a personal organization project and is released under the MIT License.

## Future Enhancements
- **Voice-to-Text Integration:** Allow users to dictate content.
- **Enhanced AI Suggestions:** More advanced AI-driven text improvements.
- **Collaboration Features:** Real-time document collaboration.
- **Blockchain Security:** Secure document verification using blockchain technology.

For any questions or contributions, feel free to raise an issue on GitHub or contact the development team.

