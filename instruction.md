
# Age 21: Wrapped — "Us" Edition 🥂

> **Always together, through every season.**

---

## 🌲 Thematic & Tech Choices
- **Stack**: React + Tailwind CSS + Framer Motion
- **Aesthetic**: Pastel gradients, Glassmorphism, cozy sticker energy, premium "Wrapped" layouts
- **Seasonal Arc**: Winter ‘24 → Winter ‘25 (backgrounds, transitions, and content shift by season)
- **Atmosphere Transition**: Blue/White (Winter) → Green (Spring) → Yellow/Bright (Summer) → Orange/Gold (Fall) → Cozy Blue (End Winter)
- **Note**: "System Syncing..." for short distance, shown subtly as a status.

---

## 📖 9-Page Interactive Flow

### 1. The Annual Login (WINTER) ✅ IMPLEMENTED
- **Visual**: Winter gradient background with animated sparkles and snow particles
- **Text**:  
  > Happy 21 to em Mai
- **Interaction**: "Let's begin" button → transitions to garden
- **Animation**: Spring bloom transition effect (white circle expanding)
- **Components**: `LoginPage.jsx` with `SnowParticle` components

---

### 2. Sticker Analytics (SPRING)
- **Visual**: Sticker Frequency Analysis — floating Loopy & Pocoyo stickers w/ soft glass cards.
- **Data Points**:
    - `Total Chaotic Loopys Sent`
    - `Pocoyo Hugs Recorded`
    - `Custom Sticker Peak Hours`
- **Effect**: Parallax sticker motion following cursor.

---

### 3. The Archetype Garden (SPRING) ✅ IMPLEMENTED
- **Visual**: Interactive 3D tree garden with growing branches and blooming flowers
- **Features**:
    - **Sequential Tree Growth**: Trunk grows first, then primary branches, then secondary branches (seamless, no brown dots)
    - **5 Interactive Archetype Flowers**:
        1. "The Main Character" - Always iconic, turning every sidewalk into a runway
        2. "The Joy Generator" - Lighting up every room with that smile
        3. "Professional Overthinker" - Calculating every possibility, but we love that brain
        4. "The Sweetest Soul" - Kindness that makes the world softer
        5. "Adventure Ready" - Always down for a spontaneous trip or snack run
    - **Decorative Flowers**: 9 static flowers scattered across branches
    - **Animated Birds**: 8 birds that fly in, rest on branches (with head-bobbing), then fly away
    - **Rough Branch Texture**: SVG displacement filter for natural, organic bark appearance
    - **Zoom Interaction**: Clicking a flower zooms in (2.5x) and centers on it, then shows modal
    - **Blooming Effect**: Flowers bloom with scale animation after their branch finishes growing
    - **Continue Button**: Small, subtle button at bottom center that only appears after all 5 archetype flowers have been clicked
- **Components**: `ArchetypePage.jsx` with `FlowerSVG`, `Bird`, `SakuraPetal` components
- **Technical Details**:
    - SVG-based tree with viewBox "0 0 800 800"
    - Framer Motion for all animations
    - Branch growth uses `pathLength` animation
    - Flowers positioned using `translate3d` for 3D depth
    - Modal shows archetype details with gradient color matching

---

### 4. THE GAME: The Truth Detector (SUMMER)
- **Concept**: Correct the classic phrase:  
  _"Xin lỗi em chỉ là ABC"_  
- **Characters**: Capybara as "Verifier"
- **Logic**:
    - Wrong slot: Angry Capybara, screen shake, red flash
    - Right slot: Dancing Capybara, heart confetti, gold
- **Success**:  
  > System Correction: *You are perfect as ABC.*

---

### 5. Our "Heatmap" (SUMMER)
- **Visual**: Connectivity Map (no distance, just time together)
- **Content**:  
    - Top 3 places together  
    - "Total Hours spent on the same frequency"
- **Theme**: Focused on closeness, not separation

---

### 6. THE LOVE SLIDER (FALL)
- **UI**: Glassy colored slider (type=range)  
- **Stages**:
    1. Loopy: "Loopy loves you!"
    2. Pocoyo: "Pocoyo loves you!"
    3. Capybara: "Capybara loves you!"
    4. Tom Cruise: "Tom Cruise loves you!"
    5. **Final**: "I love you the most."
- **Logic**: 0-100 → 5 stages

---

### 7. Shared System Prompts (FALL)
- **Visual**: Code-style "Relationship Logic" snippets
- **Examples**:
    ```
    if (hungry) { get_snacks("her favorites"); }
    while (together) { happiness = infinity; }
    ```
- **Theme**: Cozy/cheeky "US code"

---

### 8. The Memory Vault (WINTER)
- **Visual**: Horizontal film strip/pixel-art gallery
- **Content**: Montage of top moments (age 20)
- **Vibe**: Warm lighting, soft cozy filter, snow outside

---

### 9. Still Life with GPU & Baguette ("US" Bday Update)
- **Visual**: High-fidelity pixel-art desk
    - 21st cake
    - Laptop w/ your photo
    - Half-eaten snack
    - Coffee
- **Caption**:  
  > Still Life with Us — 2025.  
  > Version 21.0 is now live.  
  > Prediction: *Our best year yet.*

---

## 🧩 Component/Dev Quick Reference

### Implemented Components ✅
- **App.jsx**: Manages `currentStep` (1-9) and page transitions
- **LoginPage.jsx**: Winter-themed login with animated particles
- **ArchetypePage.jsx**: Interactive garden with:
    - Sequential branch growth system
    - 5 interactive archetype flowers with zoom/modal
    - 9 decorative flowers
    - 8 animated birds
    - Conditional continue button (requires all flowers clicked)
- **Bottom Status**: `"System Syncing..."` (shown on all pages)

### To Be Implemented
- **Capybara Verifier**: takes `status` (`neutral`, `error`, `success`), swaps images and Framer Motion animates
- **LoveSlider**: input range (0-100), mapped to 5 stages
- **Sticker Parallax**: Loopy/Pocoyo images float slightly w/ mouse

---

> _No matter the season or background, it’s always us, always connected. Happy Birthday, Version 21.0!_


