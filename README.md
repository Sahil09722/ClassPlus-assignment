# Custom Greeting & Wishes Generator 

A production-ready web application that enables users to create, personalize, and share custom greeting cards. This project leverages the **HTML5 Canvas API** for real-time client-side image processing, allowing for seamless overlay of user metadata onto high-quality templates.

## Key Features

* **Authentication & Profile Setup:** Supports user onboarding via simple login, capturing persistent user names and profile pictures for use across all templates.


* **Dynamic Template Engine:** A categorized gallery (Shayari, Birthday, Festivals, etc.) with a responsive grid layout.


* **Real-time Personalization:** Automatic live preview that overlays a circular-cropped user profile picture and name onto selected backgrounds.


* **Monetization Framework:** Built-in logic to distinguish between "Free" and "Premium" content, featuring an integrated upsell/subscription modal.


* **Native Share Integration:** Uses the **Web Share API** to convert canvas compositions into shareable image files for WhatsApp, Instagram, and other social platforms.



## Tech Stack

* **Frontend:** React.js / Next.js
* **Styling:** Tailwind CSS (Responsive Design)
* **Image Processing:** HTML5 Canvas API (Client-side rendering)


* **State Management:** React Hooks (`useContext`, `useRef`, `useState`)
* **Storage:** LocalStorage / Firebase Auth (for persistent user profiles)

GitHub Link :- https://github.com/Sahil09722/ClassPlus-assignment
Video Link :- https://drive.google.com/file/d/1DcW_jMvxC6YejPpcXyTUZj0RvSk27C1K/view?usp=drive_link

## Project Structure

```text
src/
├── components/
│   ├── Home.jsx           # Dashboard & Category Filters
│   ├── Editor.jsx         # Canvas Personalization Engine
│   ├── PremiumModal.jsx   # Upsell Logic & UI
│   └── ProfileSetup.jsx   # User Data Capture
├── data/
│   └── templates.js       # Mock Template Database (ID, Category, isPremium)
├── utils/
│   └── canvasHelper.js    # Logic for Circular Clipping & Merging
└── App.jsx                # Routing & Global State

```

##  Technical Approach: Image Personalization

The core technical challenge involved merging multiple visual layers—a background image, a circular profile picture, and text—into a single flattened file.

### The Clipping Logic

To achieve a professional "circular cutout" for the profile picture, the application utilizes the Canvas `clip()` method:

1. **State Management:** The canvas state is saved using `ctx.save()`.
2. **Path Definition:** A circular path is defined using the `arc()` function.
3. **Masking:** `ctx.clip()` is invoked to restrict all subsequent drawing to the circular path.
4. **Layering:** The profile image is drawn, and `ctx.restore()` is called to allow the user's name to be rendered normally without clipping.

##  Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/greetings-app.git
cd greetings-app

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run in development mode:**

```bash
    npm run dev
    ```

##  Roadmap

- [x] Phase 1: Auth & Profile Capture[cite: 1]
- [x] Phase 2: Category Filters & Responsive Grid[cite: 1]
- [x] Phase 3: Canvas Personalization Engine[cite: 1]
- [ ] Phase 4: Backend Integration (Node.js/MongoDB) for Template Management[cite: 1]
- [ ] Phase 5: Advanced Image Filters (Sepia, Grayscale) for user photos

---
**Submission for:** Classplus Internship Assignment[cite: 1]  
**Developer:** [Your Name]

```
