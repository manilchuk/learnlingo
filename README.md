# LearnLingo

A web application for finding language tutors online. Users can browse teachers, filter by language, level, and price, add favorites, and book trial lessons.

## 🚀 Live Demo

[Add link to deployed app here after deployment]

## 📋 Features

- **Home page** with a hero section, call-to-action button, and company statistics
- **Teachers page** with:
  - Fetching teachers from Firebase Realtime Database
  - Filtering by language, level of knowledge, and maximum price
  - Pagination (3 cards per page with "Load more" button)
  - Expandable cards with detailed info and student reviews
  - Add to favorites (authorized users only)
  - Booking trial lesson modal with form validation
- **Favorites page** (private, accessible only to authorized users)
- **Authentication** with Firebase:
  - Registration, login, logout
  - Form validation using `react-hook-form` + `yup`
  - Persistent session (survives page reload)
- **Responsive design** matching the provided mockup

## 🛠️ Tech Stack

- **React** (with Vite)
- **React Router** for client-side routing
- **Firebase** (Authentication + Realtime Database)
- **react-hook-form** + **yup** for forms and validation
- **CSS Modules** for component-scoped styling

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/learnlingo.git
   cd learnlingo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory with your Firebase config:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

## 🎨 Mockup

The design follows the provided Figma mockup (yellow color palette variant).

## 📄 Technical Requirements

- React SPA with React Router
- Firebase Authentication (email/password) and Realtime Database
- Form validation with react-hook-form + yup
- Favorites stored in localStorage (per user)
- Private route protection for the Favorites page
- Modal windows with Esc / backdrop / close-button handling
- Deployed to Netlify / Vercel / GitHub Pages

## 👤 Author

[Manylchuk Valentyn](https://github.com/manilchuk)
