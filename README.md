# Moonlight - Chrome Extension for Business Search

A powerful Chrome extension built with React, TypeScript, and Vite that enables users to search for businesses using Google Maps API and export results seamlessly.

## 🚀 Features

- **Business Search**: Search for businesses by keyword with customizable result count
- **Interactive Maps**: Real-time Google Maps integration with location visualization
- **Data Export**: Export search results to external services
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for Chrome extension popup (400x580px)
- **Session Management**: Automatic session handling with 30-minute expiration
- **Modern UI**: Built with Tailwind CSS and styled-components

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS, styled-components
- **Maps**: Google Maps API, @react-google-maps/api
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Authentication**: Google Auth Library
- **APIs**: Google APIs (googleapis)

## 📋 Prerequisites

- Node.js (version 18+ or 20+)
- Chrome browser
- Google Maps API key
- Backend service running on `http://192.168.137.37:5000`

## 🔧 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd chrome-extension-react-template
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   - Set up your Google Maps API key in the code
   - Ensure backend service is running

## 🏗️ Development

Start the development server:
```bash
npm run dev
```

This launches the Vite development server for local testing.

## 📦 Build & Deploy

1. **Create production build**:
   ```bash
   npm run build
   ```

2. **Load extension in Chrome**:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `build` directory

## 🗂️ Project Structure

```
├── public/
│   ├── manifest.json          # Chrome extension manifest
│   ├── images/               # Extension icons and assets
│   └── sandbox.html          # Google Maps testing sandbox
├── src/
│   ├── components/           # Reusable React components
│   │   ├── header.tsx
│   │   ├── searchInput.tsx
│   │   ├── simpleButton.tsx
│   │   └── svg/             # SVG icon components
│   ├── pages/               # Application pages/routes
│   │   ├── homePage.tsx     # Main search interface
│   │   ├── resultPage.tsx   # Search results display
│   │   ├── detailPage.tsx   # Business detail view
│   │   ├── launchPage.tsx   # Welcome/launch screen
│   │   └── settingPage.tsx  # User settings
│   ├── utils/               # Utility functions
│   ├── mockData/            # Mock data for testing
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🔑 Key Components

### SearchInput Component
- Handles business search functionality
- Integrates with Google Maps for location services
- Manages search state and result export

### ResultPage
- Displays search results in a user-friendly format
- Provides export functionality
- Handles navigation between search and detail views

### Header Component
- Contains navigation menu, user avatar, and theme toggle
- Responsive design with modal menu support

## 🌐 API Integration

The extension integrates with:
- **Google Maps API**: For geocoding and map visualization
- **Backend Service**: For business search and data export
  - Search endpoint: `GET /api/search/search`
  - Export endpoint: `POST /api/result/export`

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Dark Mode**: Automatic theme switching support
- **Custom Fonts**: Arima font family for headings
- **Responsive**: Optimized for 400x580px popup window

## 📱 Chrome Extension Features

- **Manifest V3**: Latest Chrome extension format
- **Permissions**: Storage, activeTab, geolocation
- **Popup Interface**: Clean, intuitive user interface
- **Icon Set**: Multiple resolution icons (16px, 48px, 128px)

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🚨 Environment Setup

Ensure the following are configured:
1. Google Maps API key with proper permissions
2. Backend service accessible at specified endpoint
3. Chrome extension permissions granted

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🐛 Troubleshooting

- **Maps not loading**: Verify Google Maps API key and permissions
- **Search not working**: Check backend service connectivity
- **Extension not loading**: Ensure manifest.json is properly configured
- **Build issues**: Clear node_modules and reinstall dependencies
