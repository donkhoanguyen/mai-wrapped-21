
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

### 1. The Annual Login (WINTER)
- **Visual**: Winter, light snow storm
- **Text**:  
  > Year `20.0` Complete.  
  > Version `21.0` Ready.
- **Interaction**: Enter Name → "Unlock the Memories"
- **Animation**: Frost melts → secret shared garden blooms.

---

### 2. Sticker Analytics (SPRING)
- **Visual**: Sticker Frequency Analysis — floating Loopy & Pocoyo stickers w/ soft glass cards.
- **Data Points**:
    - `Total Chaotic Loopys Sent`
    - `Pocoyo Hugs Recorded`
    - `Custom Sticker Peak Hours`
- **Effect**: Parallax sticker motion following cursor.

---

### 3. The Archetype (SPRING)
- **Visual**: Glossy Player Profile Card (Glassmorphism)
- **Content**:
    - Her Archetype:  
      > **"The Main Character"**  
      > **"The Joy Generator"**
    - Traits: Always Iconic, Professional Overthinker, The Sweetest ABC

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

- **WrappedContainer**: manages `currentStep` (1-9)
- **Capybara Verifier**: takes `status` (`neutral`, `error`, `success`), swaps images and Framer Motion animates
- **LoveSlider**: input range (0-100), mapped to 5 stages
- **Sticker Parallax**: Loopy/Pocoyo images float slightly w/ mouse
- **Bottom Status**: `"System Syncing..."` (current distance note)

---

> _No matter the season or background, it’s always us, always connected. Happy Birthday, Version 21.0!_


