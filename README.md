# LinkVault Pro

A modern, vibrant personal digital library for organizing, managing, and discovering your favorite web resources. Built with React, TypeScript, and Vite.

![React](https://img.shields.io/badge/React-19.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Smart Link Organization** - Save and organize links with titles, URLs, descriptions, and custom tags
- **Flexible Tagging System** - Add multiple tags to categorize and filter your links
- **Powerful Search Engine** - Search across titles, URLs, descriptions, and tags in real-time
- **Fully Responsive Design** - Works seamlessly on mobile, tablet, and desktop devices
- **Lightning Fast Performance** - Built with Vite for instant hot module replacement
- **Secure Local Storage** - All data stored locally in your browser with persistent storage
- **Beautiful Gradient Cards** - Modern, colorful card-based UI with smooth animations
- **Edit & Delete** - Full CRUD operations for managing your links

## 🎨 Design

LinkVault Pro features a premium, vibrant design with:
- **Gradient Card Layout** - Each link displays as a colorful gradient card with unique color combinations
- **Smooth Animations** - Cards lift and scale on hover with backdrop blur effects
- **Responsive Grid** - 1 column on mobile, 2-3 columns on larger screens
- **Glassmorphism UI** - Frosted glass effect on tags and action buttons
- **White Typography** - High-contrast white text on colorful backgrounds
- **Hidden Actions** - Edit and delete buttons appear on hover for a clean interface

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Links-Vault-V2
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 📖 Usage

### Adding a Link

1. Click the **"Add Link"** button in the app
2. Fill in the form:
   - **Title** (required) - A descriptive name for the link
   - **URL** (required) - The web address (https://example.com)
   - **Description** - Optional context or notes about the link
   - **Tags** - Comma-separated labels (e.g., "design, tutorial, tools")
3. Click **"Save Link"** to add to your collection

### Editing a Link

1. Hover over any link card
2. Click the **✏️ Edit** button
3. Modify the details in the form
4. Click **"Update Link"** to save changes

### Deleting a Link

1. Hover over any link card
2. Click the **🗑️ Delete** button
3. Confirm deletion in the popup dialog

### Searching Links

1. Use the search bar at the top of your links
2. Type to search by:
   - Link title
   - URL
   - Description
   - Tags
3. Results update in real-time as you type

### Using Tags

- Add multiple tags separated by commas when creating/editing links
- Tags appear as frosted glass badges on each card
- Search for links by their tags to filter your collection

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AddLinkButton/      # Button for adding new links
│   ├── FormField/          # Reusable form input components
│   ├── LinkForm/           # Form for creating/editing links
│   ├── LinkItem/           # Individual link card component
│   ├── LinkList/           # Grid of link cards
│   ├── Modal/              # Modal dialog for forms
│   └── SearchBar/          # Search input component
├── types/
│   └── index.ts            # TypeScript interfaces
├── utils/
│   └── localStorage.ts     # Local storage utilities
├── App.tsx                 # Main application component
├── App.css                 # Global styles & design system
├── main.tsx                # React entry point
└── index.css               # Base styles
```

## 🎯 Key Components

### LinkForm
Handles creating and editing links with form validation:
- Title and URL validation
- Real-time error messages
- Success/error feedback
- Form state management

### LinkItem
Displays individual link cards with:
- Gradient background (9 unique color combinations)
- Title with sparkle emoji
- Description (2-line clamp)
- Tag badges with glassmorphism effect
- Hidden edit/delete buttons on hover

### LinkList
Manages the grid layout and search functionality:
- Responsive grid (1/2/3 columns based on screen size)
- Real-time search filtering
- Staggered animations on load
- Empty state messaging

### Modal
Provides dialog functionality for:
- Backdrop blur overlay
- Smooth slide-up animation
- Responsive sizing
- Click-outside-to-close behavior

## 🎨 Design System

### Colors
- **Gradients**: 9 unique gradient combinations for cards
- **Accents**: Blue (#3b82f6) for interactive elements
- **Backgrounds**: Neutral grays (50-900)
- **Text**: White on gradients, gray on light backgrounds

### Typography
- **Display**: SF Pro Display (serif/system fonts)
- **Body**: System font stack for consistency
- **Weights**: 400, 500, 600, 700

### Spacing
- 24-level spacing scale (space-1 through space-20)
- Based on 0.25rem units
- Responsive adjustments at breakpoints

### Breakpoints
- **Mobile**: 480px and below
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Wide**: 1025px+
- **Ultra-wide**: 1400px+

## 💾 Data Storage

LinkVault Pro uses browser localStorage to persist your links:
- Data stored under key: `links-vault`
- Stored as JSON array of Link objects
- Survives browser restarts
- Private to your device (no server sync)

### Link Object Structure
```typescript
interface Link {
  id: string;           // Unique identifier (UUID)
  title: string;        // Link title
  url: string;          // Full URL
  description: string;  // Optional description
  tags: string[];       // Array of tag strings
}
```

## 🔧 Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

## 🛠️ Technologies Used

- **React 19.1** - UI library
- **TypeScript 5.8** - Type safety
- **Vite 7.0** - Build tool and dev server
- **CSS3** - Styling with custom properties and animations
- **localStorage API** - Client-side data persistence

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learning Resources

This project demonstrates:
- React Hooks (useState, useEffect)
- TypeScript interfaces and types
- CSS Grid and Flexbox layouts
- CSS custom properties (variables)
- CSS animations and transitions
- localStorage API
- Form validation
- Component composition
- Responsive design patterns

## 🐛 Known Issues & Limitations

- Max 9 unique gradient colors (repeats after)
- No export/import functionality
- No cloud sync or backup
- No user authentication
- Search is case-insensitive only

## 🚀 Future Enhancements

Potential features for future versions:
- [ ] Dark mode theme
- [ ] Link categories/collections
- [ ] Sort options (by date, name, tags)
- [ ] Bulk actions (delete multiple, batch tag)
- [ ] Import/export links as JSON or CSV
- [ ] Link preview/screenshot
- [ ] Favorites/starred links
- [ ] PWA support for offline access
- [ ] Cloud sync with backend
- [ ] Mobile app version

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📞 Support

For issues or questions:
1. Check the [Issues](https://github.com/your-username/Links-Vault-V2/issues) page
2. Create a new issue with detailed description
3. Include screenshots if possible

---

**Made with ❤️ by CodeTribe**

Start organizing your digital discoveries today! 🎉
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
