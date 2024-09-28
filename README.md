# Resume App with Multi-language Support

This project is a responsive resume webpage built using **Next.js**, **TypeScript**, and **Tailwind CSS**. It supports multiple languages with translations and provides dark/light mode toggle functionality. The app also simulates API loading with skeleton screens to enhance user experience.

## Features

- **Multi-language Support**: The app currently supports multiple languages, including:
  - English (`en`)
  - Hindi (`hi`)
  - Kannada (`kn`)
  - Chinese (`cn`)
  - Spanish (`es`)
  - Japanese (`jn`)
  - Korean (`ko`)
  - Portuguese (`po`)
  - Tamil (`tm`)
  - Telugu (`tl`)
  
- **Dark/Light Mode**: Users can toggle between dark and light themes using the theme switcher button.

- **Loading Skeletons**: Simulated API loading with skeleton screens for a smoother user experience while data is being fetched.

- **Responsive Design**: The resume is mobile-friendly and adapts to different screen sizes.

## Project Structure

```bash
├── components
│   └── ui
│       ├── button.tsx      # Reusable button component
│       ├── card.tsx        # Reusable card component
│       ├── skeleton.tsx    # Reusable skeleton loading component
├── locales
│   ├── en.json             # English translations
│   ├── hi.json             # Hindi translations
│   └── ...                 # Other language translations
├── pages
│   └── resume
│       └── [lang].tsx      # Resume component based on language selection
├── public
│   └── ...                 # Public assets
├── styles
│   └── globals.css         # Global CSS file with Tailwind integration
├── README.md               # Project documentation
└── ...
