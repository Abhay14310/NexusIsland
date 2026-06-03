# Esport Nexus

A comprehensive esports gaming platform connecting gamers, tournaments, and gaming gear.

## 🎮 Features

- **Game Showcase** - Browse and explore popular esports titles
- **Tournament Hub** - Discover and register for competitive tournaments  
- **Gear Store** - Purchase gaming equipment and peripherals
- **User Authentication** - Secure login and registration system
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
Esport-Nexus/
├── index.html              # Landing page
├── style.css               # Landing page styles
├── script.js               # Landing page scripts
├── Game/                   # Game showcase section
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Assets/            # Game images
├── Tournament/             # Tournament selection
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Assets/            # Tournament images
├── Purchase/               # Gaming gear store
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Log-In/                 # Authentication pages
│   ├── index.html          # Login form
│   ├── registrationform.html
│   ├── forgetpassword.html
│   ├── style.css
│   └── script.js
├── main Site/              # Main landing/home page
│   ├── index.html
│   ├── style.css
│   └── script.js
├── vercel.json             # Vercel configuration
├── package.json            # Project metadata
└── README.md              # This file
```

## 🔗 Navigation Guide

- **Landing Page** (`index.html`) → Log In button → Main Site
- **Main Site** (`main Site/index.html`) → Navigation menu with links to:
  - Games → Game showcase
  - Tournament → Tournament selection
  - Purchase → Gaming gear store
  - Profile → Login page
- **Log In** (`Log-In/index.html`) → Register or Forgot Password pages

## 🚀 Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))

### Step-by-Step Deployment

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Esport Nexus"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/Esport-Nexus.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect it as a static site
   - Click "Deploy"

3. **Custom Domain** (Optional)
   - In Vercel project settings
   - Go to "Domains"
   - Add your custom domain
   - Follow DNS configuration steps

### Vercel Configuration
The project includes `vercel.json` with optimized settings for static hosting:
- Static framework detected
- Root directory set to `./`
- SPA routing configured

## 🛠️ Local Development

1. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

2. **Access local server**
   - Navigate to `http://localhost:8000`

## 📝 Navigation Links

All navigation links have been updated to use relative paths for proper deployment:
- Links use `../` for parent directory navigation
- Links use `./` for same directory navigation
- No absolute paths that depend on `/PROJECT/` structure

## 🔧 Troubleshooting

### Links not working locally
- Make sure to use a local server (not `file://` protocol)
- Check that relative paths match your folder structure

### Assets not loading
- Verify Asset folders exist in Game/ and Tournament/ directories
- Check file paths are relative (`./Assets/filename.jpg`)

### Vercel deployment fails
- Ensure all files are committed to git
- Check that no files have `/PROJECT/` paths
- Verify package.json exists

## 📧 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review your Vercel deployment logs
3. Ensure all links use relative paths

## 📄 License

MIT License - Feel free to use and modify

---

**Created by**: Abhay Kapoor

**Live at**: [Your Vercel URL will appear here after deployment]
