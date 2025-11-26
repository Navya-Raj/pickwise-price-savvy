# PickWise - E-Commerce Price Comparison System
## Project Report

---

## 1. Introduction

PickWise is a web-based e-commerce price comparison platform designed to help Indian consumers make informed purchasing decisions by comparing product prices across multiple online retailers. The application aggregates pricing information from major e-commerce platforms including Amazon, Flipkart, Myntra, Nykaa, and AJIO, presenting users with a unified view of available options and potential savings.

In today's competitive online marketplace, consumers often struggle to find the best deals across multiple platforms. PickWise addresses this challenge by providing a centralized search interface that displays real-time price comparisons, highlights the best deals, and allows users to track products of interest through a wishlist feature.

---

## 2. Objectives

### Primary Objectives:
- **Price Transparency**: Provide users with comprehensive price comparisons across multiple e-commerce platforms in a single interface
- **User Empowerment**: Enable consumers to make informed purchase decisions by identifying the best available prices
- **Time Efficiency**: Reduce the time spent manually checking multiple websites for price comparisons
- **Deal Discovery**: Highlight the lowest prices and potential savings for each product

### Secondary Objectives:
- **User Engagement**: Implement wishlist functionality to help users track products of interest
- **Intuitive Design**: Create a clean, responsive interface that works seamlessly across devices
- **Quick Access**: Provide fast, hassle-free authentication to access comparison features
- **Sorting Capabilities**: Allow flexible price sorting to match different user preferences

---

## 3. Tech Stack

### Frontend Framework
- **React 18.3.1**: Component-based UI library for building interactive user interfaces
- **TypeScript**: Type-safe JavaScript superset for enhanced code quality and developer experience
- **Vite**: Next-generation frontend build tool for fast development and optimized production builds

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Headless UI component library for accessible, customizable components
- **shadcn/ui**: Pre-built component system built on Radix UI
- **Lucide React**: Icon library for consistent iconography

### Routing & State Management
- **React Router DOM 6.30.1**: Client-side routing for single-page application navigation
- **TanStack Query 5.83.0**: Server state management and data fetching (prepared for future API integration)

### Form & Validation
- **React Hook Form 7.61.1**: Performant form management library
- **Zod 3.25.76**: TypeScript-first schema validation

### Additional Libraries
- **class-variance-authority**: Utility for managing component variants
- **clsx & tailwind-merge**: Conditional class name management
- **sonner**: Toast notification system

### Development Tools
- **ESLint**: Code linting for consistent code quality
- **TypeScript Compiler**: Type checking and transpilation

---

## 4. System Architecture

### Architecture Pattern
PickWise follows a **client-side rendered (CSR) Single Page Application (SPA)** architecture with component-based design principles.

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│                    (React Components)                        │
└───────────────┬─────────────────────────────────────────────┘
                │
┌───────────────▼─────────────────────────────────────────────┐
│                     Routing Layer                            │
│                  (React Router DOM)                          │
│  Routes: / | /auth | /dashboard | /wishlist                 │
└───────────────┬─────────────────────────────────────────────┘
                │
┌───────────────▼─────────────────────────────────────────────┐
│                    State Management                          │
│           • Local Component State (useState)                 │
│           • localStorage (Auth & Wishlist)                   │
│           • TanStack Query (Future API calls)                │
└───────────────┬─────────────────────────────────────────────┘
                │
┌───────────────▼─────────────────────────────────────────────┐
│                      Data Layer                              │
│               • Mock Product Data (Client-side)              │
│               • localStorage API                             │
└──────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App.tsx
├── BrowserRouter
│   ├── Index (Landing Page)
│   ├── Auth (Sign In/Sign Up)
│   ├── Dashboard
│   │   ├── Navbar
│   │   ├── Search Bar
│   │   ├── Filter Buttons
│   │   └── ProductCard (multiple instances)
│   ├── Wishlist
│   │   ├── Navbar
│   │   └── ProductCard (multiple instances)
│   └── NotFound (404 Page)
```

### Data Flow

1. **Authentication Flow**:
   - User enters credentials → Stored in localStorage → Redirected to Dashboard
   - Protected routes check localStorage for auth token

2. **Product Search Flow**:
   - User enters search query → Filter mock products → Display matching results
   - Sort selection → Re-order displayed products

3. **Wishlist Flow**:
   - User clicks heart icon → Toggle product in localStorage → Update UI
   - Wishlist page reads from localStorage → Displays saved products

---

## 5. Features

### 5.1 Authentication System
- **Dummy Sign Up**: Email and password registration (stored locally)
- **Dummy Sign In**: Email and password authentication
- **Session Management**: localStorage-based session persistence
- **Protected Routes**: Automatic redirect to auth page for unauthenticated users
- **Logout**: Clear session and return to landing page

### 5.2 Product Search & Display
- **Search Bar**: Real-time filtering of products by name
- **Product Grid**: Responsive card-based layout showing 25+ products
- **Product Information**: 
  - Product image
  - Product name
  - Description
  - Category tag
  - Price comparison across 5 platforms

### 5.3 Price Comparison
- **Multi-Platform Support**: Amazon, Flipkart, Myntra, Nykaa, AJIO
- **Price Display**: Clear presentation of prices for each platform
- **Lowest Price Highlight**: Visual emphasis on the best deal (green badge)
- **Savings Calculation**: Automatic computation of potential savings
- **Platform Icons**: Visual identification of each e-commerce site

### 5.4 Sorting & Filtering
- **Sort by Lowest Price**: Ascending price order
- **Sort by Highest Price**: Descending price order
- **Dynamic Re-ordering**: Instant sorting without page reload

### 5.5 Wishlist Management
- **Add to Wishlist**: Save favorite products for later viewing
- **Remove from Wishlist**: Delete saved products
- **Persistent Storage**: Wishlist data survives browser sessions
- **Dedicated Wishlist Page**: Separate view for saved products
- **Empty State Handling**: Helpful messaging when wishlist is empty

### 5.6 User Interface
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints
- **Dark/Light Mode Support**: Theme variables ready for theme switching
- **Toast Notifications**: User feedback for actions (add/remove from wishlist)
- **Loading States**: Skeleton loading for better UX (prepared)
- **Navigation**: Sticky navbar with active route highlighting

### 5.7 User Experience
- **Buy Now Links**: Direct links to product pages on each platform
- **Visual Hierarchy**: Clear distinction between important information
- **Accessibility**: Semantic HTML and ARIA labels
- **Fast Performance**: Optimized build with Vite

---

## 6. Workflow

### 6.1 User Registration & Login Workflow

```
Start
  │
  ├─→ Visit Homepage (/)
  │       │
  │       ├─→ Click "Sign Up"
  │       │     │
  │       │     ├─→ Enter Email & Password
  │       │     ├─→ Submit Form
  │       │     ├─→ Store credentials in localStorage
  │       │     └─→ Redirect to Dashboard (/dashboard)
  │       │
  │       └─→ Click "Sign In"
  │             │
  │             ├─→ Enter Email & Password
  │             ├─→ Submit Form
  │             ├─→ Verify credentials from localStorage
  │             └─→ Redirect to Dashboard (/dashboard)
  │
  └─→ Access Protected Route
          │
          ├─→ Check localStorage for auth
          │
          ├─→ If Authenticated: Show Dashboard
          └─→ If Not: Redirect to /auth
```

### 6.2 Product Search & Comparison Workflow

```
Dashboard Page
  │
  ├─→ Enter Product Name in Search Bar
  │     │
  │     ├─→ Filter mock products by search term
  │     └─→ Display matching results
  │
  ├─→ View Product Cards
  │     │
  │     ├─→ See product details (image, name, description)
  │     ├─→ View prices from all 5 platforms
  │     ├─→ Identify lowest price (green badge)
  │     └─→ See potential savings amount
  │
  ├─→ Sort Products
  │     │
  │     ├─→ Click "Lowest Price First"
  │     │     └─→ Re-order by ascending price
  │     │
  │     └─→ Click "Highest Price First"
  │           └─→ Re-order by descending price
  │
  ├─→ Click "Buy Now" on specific platform
  │     └─→ (Placeholder - would open store page)
  │
  └─→ Add/Remove from Wishlist
        │
        ├─→ Click heart icon
        ├─→ Toggle product in localStorage
        ├─→ Show toast notification
        └─→ Update heart icon state
```

### 6.3 Wishlist Management Workflow

```
Wishlist Page (/wishlist)
  │
  ├─→ Load saved products from localStorage
  │
  ├─→ If Empty Wishlist
  │     │
  │     ├─→ Display empty state message
  │     └─→ Show "Browse Products" button
  │           └─→ Navigate to Dashboard
  │
  └─→ If Has Products
        │
        ├─→ Display product cards
        ├─→ View product details & prices
        ├─→ Click heart icon to remove
        │     │
        │     ├─→ Remove from localStorage
        │     ├─→ Update UI
        │     └─→ Show toast notification
        │
        └─→ Click "Buy Now" to purchase
```

### 6.4 Navigation & Logout Workflow

```
Authenticated User
  │
  ├─→ Click "Home" in Navbar
  │     └─→ Navigate to Dashboard
  │
  ├─→ Click "Wishlist" in Navbar
  │     └─→ Navigate to Wishlist Page
  │
  └─→ Click "Logout"
        │
        ├─→ Remove auth data from localStorage
        ├─→ Clear session
        └─→ Redirect to /auth
```

---

## 7. Database Design

### Current Implementation (No Database)

PickWise currently operates without a traditional database, using **browser localStorage** for data persistence. This is a prototype/demonstration approach suitable for development and testing.

### localStorage Schema

#### 7.1 Authentication Data
```javascript
// Key: "pickwise_auth"
{
  "email": "user@example.com",
  "password": "hashedPassword123",
  "timestamp": "2025-11-26T10:30:00Z"
}
```

#### 7.2 Wishlist Data
```javascript
// Key: "pickwise_wishlist"
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "Latest Apple smartphone with A17 Pro chip",
    "image": "/placeholder.svg",
    "category": "Electronics",
    "prices": {
      "amazon": 134900,
      "flipkart": 132900,
      "myntra": null,
      "nykaa": null,
      "ajio": null
    }
  },
  // ... more products
]
```

### Future Database Schema (Recommended for Production)

For a production-ready application, the following relational database schema is recommended:

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Prices Table
```sql
CREATE TABLE prices (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  platform VARCHAR(50) NOT NULL, -- amazon, flipkart, myntra, nykaa, ajio
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_available BOOLEAN DEFAULT true,
  product_url VARCHAR(500)
);
```

#### Wishlist Table
```sql
CREATE TABLE wishlist (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);
```

#### Entity Relationship Diagram
```
┌──────────────┐         ┌──────────────┐
│    Users     │         │   Products   │
├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │
│ email        │         │ name         │
│ password_hash│         │ description  │
│ created_at   │         │ image_url    │
│ updated_at   │         │ category     │
└──────┬───────┘         └──────┬───────┘
       │                        │
       │ 1:N                    │ 1:N
       │                        │
       │         ┌──────────────▼───────┐
       │         │     Prices           │
       │         ├──────────────────────┤
       │         │ id (PK)              │
       │         │ product_id (FK)      │
       │         │ platform             │
       │         │ price                │
       │         │ last_updated         │
       │         └──────────────────────┘
       │
       │ N:M
       │
       └────────►┌──────────────────────┐
                 │     Wishlist         │
                 ├──────────────────────┤
                 │ id (PK)              │
                 │ user_id (FK)         │
                 │ product_id (FK)      │
                 │ added_at             │
                 └──────────────────────┘
```

---

## 8. File Structure

```
pickwise/
│
├── public/
│   ├── favicon.ico                 # App favicon
│   ├── placeholder.svg             # Placeholder images
│   └── robots.txt                  # SEO crawler rules
│
├── src/
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx         # Customized button with variants
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── use-toast.ts       # Toast hook
│   │   │   └── [other UI components]
│   │   │
│   │   ├── Navbar.tsx              # Navigation bar with auth controls
│   │   └── ProductCard.tsx         # Product display with price comparison
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx          # Mobile detection hook
│   │   └── use-toast.ts            # Toast notification hook
│   │
│   ├── lib/
│   │   └── utils.ts                # Utility functions (cn, etc.)
│   │
│   ├── pages/
│   │   ├── Auth.tsx                # Sign in/up page
│   │   ├── Dashboard.tsx           # Main product search & comparison
│   │   ├── Index.tsx               # Landing page
│   │   ├── NotFound.tsx            # 404 error page
│   │   └── Wishlist.tsx            # Saved products page
│   │
│   ├── App.css                     # Global app styles
│   ├── App.tsx                     # Root component with routing
│   ├── index.css                   # Tailwind directives + design tokens
│   ├── main.tsx                    # App entry point
│   └── vite-env.d.ts               # Vite type definitions
│
├── .gitignore                      # Git ignore rules
├── components.json                 # shadcn/ui configuration
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point
├── package.json                    # Dependencies & scripts
├── postcss.config.js               # PostCSS configuration
├── README.md                       # Project documentation
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.app.json               # App-specific TS config
├── tsconfig.node.json              # Node-specific TS config
└── vite.config.ts                  # Vite build configuration
```

### Key Directory Purposes

- **`/components/ui/`**: Reusable UI components from shadcn/ui with custom styling
- **`/components/`**: Application-specific components (Navbar, ProductCard)
- **`/pages/`**: Route-level components for different pages
- **`/hooks/`**: Custom React hooks for shared logic
- **`/lib/`**: Utility functions and helpers

---

## 9. Advantages and Limitations

### 9.1 Advantages

#### Technical Advantages
1. **Fast Development**: Component-based architecture enables rapid feature development
2. **Type Safety**: TypeScript provides compile-time error checking and better IDE support
3. **Modern Build System**: Vite offers fast hot module replacement (HMR) and optimized builds
4. **Responsive Design**: Mobile-first approach ensures great UX across all devices
5. **Scalable Architecture**: Component structure allows easy addition of new features
6. **Maintainable Code**: Clear separation of concerns and well-organized file structure
7. **Performance**: Client-side rendering with optimized bundle size
8. **Accessibility**: Built on Radix UI primitives with ARIA support
9. **Design System**: Consistent theming through Tailwind CSS custom tokens

#### User Advantages
1. **Time Saving**: Compare prices across 5 platforms in seconds
2. **Cost Savings**: Easily identify the lowest prices and potential savings
3. **Simple Interface**: Clean, intuitive design requires no learning curve
4. **Quick Access**: Minimal authentication friction to access features
5. **Wishlist Feature**: Track favorite products without creating accounts on multiple platforms
6. **Mobile Friendly**: Shop and compare on-the-go with responsive design
7. **No Installation**: Web-based access from any browser

#### Business Advantages
1. **Low Infrastructure Cost**: Client-side architecture reduces server costs
2. **Easy Deployment**: Static site can be deployed to any CDN
3. **Quick Iterations**: Fast development cycle for feature additions
4. **Extensible**: Ready for API integration when needed

### 9.2 Limitations

#### Current Implementation Limitations
1. **Mock Data**: Uses static product data instead of real-time pricing
2. **No Real Authentication**: Dummy auth system not suitable for production
3. **localStorage Only**: Data not synchronized across devices
4. **No Backend**: Cannot perform server-side operations or secure data
5. **Limited Products**: Fixed set of 25 products in mock data
6. **No Real Buy Links**: Placeholder links instead of actual product URLs
7. **No Price Updates**: Prices are static and not refreshed
8. **Manual Price Entry**: No automated web scraping or API integration

#### Scalability Limitations
1. **Client-Side Filtering**: Search performance degrades with large datasets
2. **No Pagination**: All products loaded at once
3. **Memory Constraints**: localStorage has 5-10MB limit
4. **No Caching**: Repeated data fetching (when API integrated)
5. **Single User**: No multi-user support or collaboration features

#### Functional Limitations
1. **No User Profiles**: Cannot store preferences or history
2. **No Notifications**: No price drop alerts or wishlist updates
3. **No Reviews**: Cannot view or compare product ratings
4. **No Advanced Filters**: Limited to name search and price sorting
5. **Platform Coverage**: Only 5 platforms (many Indian e-commerce sites not included)
6. **No Price History**: Cannot track price trends over time
7. **No Comparison Analytics**: No insights or recommendations

#### Security Limitations
1. **Insecure Authentication**: Plain text password storage in localStorage
2. **No Session Management**: No token expiration or refresh
3. **No HTTPS Enforcement**: Depends on hosting configuration
4. **No Data Encryption**: User data stored without encryption
5. **XSS Vulnerable**: No input sanitization for user-generated content

#### Legal & Ethical Limitations
1. **No Terms of Service**: Web scraping may violate platform ToS
2. **No API Agreements**: Using unofficial data sources
3. **No Affiliate Links**: Missing monetization opportunities
4. **Copyright Concerns**: Product images may have usage restrictions

### 9.3 Recommended Improvements

#### Short-term (Prototype to MVP)
1. Implement real API integration with e-commerce platforms
2. Add proper backend authentication with JWT tokens
3. Implement database for users, products, and prices
4. Add pagination and infinite scroll
5. Implement real-time price updates
6. Add more filtering options (category, brand, ratings)

#### Medium-term (MVP to Production)
1. Implement web scraping or official API partnerships
2. Add price history tracking and charts
3. Implement price drop notifications
4. Add user profiles and preferences
5. Implement caching strategies (Redis/CDN)
6. Add product reviews and ratings aggregation
7. Implement advanced search with filters

#### Long-term (Production to Scale)
1. Mobile app development (React Native)
2. AI-powered recommendations
3. Price prediction algorithms
4. Affiliate partnership program
5. Browser extension for direct price comparison
6. Multi-region support (beyond India)
7. Social features (share deals, collaborative wishlists)

---

## Conclusion

PickWise demonstrates a solid foundation for an e-commerce price comparison platform with a clean, modern architecture and user-friendly interface. While the current implementation uses mock data and simplified authentication, the component-based architecture and technology choices position the application well for future enhancements.

The use of React, TypeScript, and Tailwind CSS provides a strong technical foundation, while the modular component structure allows for easy feature additions and improvements. To transform PickWise from a prototype to a production-ready application, the primary focus should be on implementing real-time data integration, proper backend infrastructure, and enhanced security measures.

With the recommended improvements, PickWise has the potential to become a valuable tool for Indian consumers seeking the best deals across multiple e-commerce platforms.

---

**Document Version**: 1.0  
**Last Updated**: November 26, 2025  
**Project**: PickWise - E-Commerce Price Comparison System
