# ARI Event Assistant - Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by Apple's clarity + Notion's playfulness + WhatsApp's conversational UI. Create a modern, sleek interface that feels effortless and smart with a friendly, conversational tone.

## Typography
- **Primary Font**: Modern sans-serif (SF Pro Text or equivalent system font) for body text and UI elements
- **Headings**: Merriweather or similar serif for impact headlines
- **Hierarchy**: 
  - Hero headline: text-5xl to text-6xl, bold
  - Section titles: text-4xl, semi-bold
  - Subheadings: text-2xl
  - Body: text-base to text-lg for readability
  - Conversational, witty copy throughout

## Layout System
**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, and 24 (e.g., p-6, py-12, gap-8)

**Structure**: Single-page scroll with 7 distinct sections, each full-width with centered max-w-6xl containers

## Core Sections

### 1. Hero Section
- Full viewport height with centered content
- Headline: "Let ARI handle your event chaos — one WhatsApp at a time."
- Subheadline below with clear value proposition
- Dual CTA buttons: "Try ARI" (primary) and "See How It Works" (secondary)
- **Hero Visual**: Animated WhatsApp-style chat window showing ARI's automated responses (RSVP confirmations, answering questions, sending reminders)
- Chat bubbles should appear with subtle fade-in animations

### 2. Problem Section
**Layout**: 2x2 grid on desktop, single column on mobile
- Title: "Let's be honest. Event planning can be a mess."
- 4 pain point cards with icons/illustrations:
  - Manual WhatsApp messaging 💬
  - Losing track of RSVPs 📊
  - Repetitive guest questions 🧠
  - Manual client updates 🕓
- Each card: icon + short blurb
- Closing statement below grid

### 3. Solution Section
**Layout**: Horizontal step-by-step flow with icons
- Title: "Meet ARI — your AI assistant for guest communication."
- 4-step visual flow showing: Upload → Setup → RSVP → Updates
- Large icons with connecting arrows or lines
- Clear, simple copy emphasizing "No coding. No stress."

### 4. Advanced Setup Section
**Layout**: 2-column split (text left, example chat right)
- Title: "Want to go deeper? ARI knows your event like you do."
- Left: Bulleted list of customization options
- Right: Mock WhatsApp conversation showing ARI answering dress code question
- Chat interface should match WhatsApp aesthetic (green bubbles for ARI)

### 5. Desktop Dashboard Section
**Layout**: Full-width showcase with mockup
- Title: "Everything tracked. Nothing lost."
- Large dashboard mockup image showing: RSVP stats, guest list, real-time updates
- Image should show clean UI with charts/graphs and guest status tracking

### 6. Event Planners Section
**Layout**: Centered content with supporting visuals
- Title: "Perfect for event agencies and planners."
- Value proposition for professional use
- Use case highlights (weddings, corporate, private events)

### 7. Final CTA Section
**Layout**: Centered, bold call-to-action
- Title: "Let ARI handle your next event."
- Dual buttons: "Get Started" (primary) + "Book a Demo" (secondary with modal form)
- Subline: "No setup cost. No coding. Just peace of mind."

## Navigation
**Sticky top navigation** with smooth scroll behavior:
- Logo/ARI branding left
- Menu items: Home • Features • How It Works • Contact (right-aligned)
- Mobile: hamburger menu
- Background: semi-transparent with backdrop blur

## Component Library

### Buttons
- **Primary**: ARI green background, white text, rounded-lg, px-8 py-3
- **Secondary**: White background, ARI green border/text, same sizing
- **Hover states**: Subtle scale/shadow effects

### Cards
- White background with subtle shadow
- Rounded corners (rounded-xl)
- Padding: p-6 to p-8
- Hover: gentle lift effect

### Chat Bubbles (for animations)
- WhatsApp-style: rounded corners, tail pointing left/right
- ARI messages: green background (#25D366 or similar)
- User messages: light gray background
- Animate entrance with fade + slide

### Form Elements (for demo modal)
- Input fields: border, rounded-lg, p-3
- Labels above inputs
- Validation states with clear error messaging
- Submit button matches primary button style

## Animations
Use sparingly and purposefully:
- **Hero**: Chat bubbles fade in sequentially on page load
- **Scroll reveals**: Sections fade up as they enter viewport
- **Hover effects**: Cards lift slightly, buttons scale 1.05
- **File upload visual**: Simple animation showing Excel → ARI processing
- Keep animations smooth (300-500ms duration)

## Images
**Required Images**:
1. **Hero Section**: Animated WhatsApp chat interface mockup (can be CSS/HTML recreation)
2. **Dashboard Section**: Desktop dashboard screenshot/mockup showing RSVP tracking, stats, and guest management interface
3. **Section decorative elements**: Consider subtle illustrations for pain points

**Style**: Clean, modern mockups with ARI's green accent color integrated

## Responsive Behavior
- **Mobile-first approach**
- Hero: Stack content vertically, reduce text sizes
- Grids: 2-column → 1-column transition at tablet breakpoint
- Navigation: Hamburger menu below desktop
- Chat windows: Full width on mobile, constrained on desktop
- Dashboard mockup: Ensure readability on all screen sizes

## Contact/Demo Form
- Modal overlay triggered by "Book a Demo" buttons
- Fields: Name, Email, Phone, Event Type, Message
- Real validation and submission handling
- Success state confirmation
- Close button and click-outside-to-close functionality

This design creates a playful yet professional experience that clearly communicates ARI's value proposition while maintaining visual interest through strategic animations and clean, modern aesthetics.