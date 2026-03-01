# Use Cases

## Overview

This document outlines the primary use cases for the Under Armour E-Commerce Platform, describing how different users interact with the system.

## User Personas

### 1. Athletic Shopper (Primary User)
- **Age**: 18-45
- **Goals**: Find quality athletic gear quickly
- **Tech Savvy**: Moderate to high
- **Shopping Behavior**: Research-driven, price-conscious

### 2. Casual Browser
- **Age**: 16-60
- **Goals**: Browse products, save favorites
- **Tech Savvy**: Low to moderate
- **Shopping Behavior**: Impulse buyer, visual-driven

### 3. Gift Buyer
- **Age**: 25-55
- **Goals**: Find gifts for athletes
- **Tech Savvy**: Moderate
- **Shopping Behavior**: Quick decision, needs guidance

## Core Use Cases

### UC-001: Browse Products

**Actor**: Any User

**Preconditions**: None

**Main Flow**:
1. User visits the website
2. User navigates to a category (Men, Women, Shoes, Sports)
3. System displays products in grid layout
4. User views product cards with images, prices, and quick actions
5. User can hover over products for visual feedback

**Postconditions**: User sees available products

**Alternative Flows**:
- User clicks on product for detailed view
- User adds product to cart directly from grid
- User adds product to wishlist

---

### UC-002: View Product Details

**Actor**: Any User

**Preconditions**: User is on a category page

**Main Flow**:
1. User clicks on a product card
2. System navigates to product detail page
3. User views:
   - Product images (gallery with thumbnails)
   - Product information (name, price, description)
   - Available colors and sizes
   - Customer reviews
4. User can interact with:
   - Image gallery (next/previous, thumbnails)
   - Color selection
   - Size selection
   - Quantity selector
   - Add to cart button
   - Add to wishlist button
   - Share button

**Postconditions**: User has detailed product information

**Alternative Flows**:
- User shares product on social media
- User writes a review
- User adds product to cart
- User adds product to wishlist

---

### UC-003: Add to Cart

**Actor**: Any User

**Preconditions**: User is viewing a product

**Main Flow**:
1. User selects product size (if applicable)
2. User selects product color (if applicable)
3. User sets quantity
4. User clicks "Add to Cart" button
5. System validates selection
6. System adds product to cart
7. System shows success toast notification
8. Cart icon updates with item count

**Postconditions**: Product is in cart

**Alternative Flows**:
- User hasn't selected size → System shows error toast
- Product out of stock → Button is disabled
- User clicks cart icon → Cart sidebar opens

---

### UC-004: Manage Shopping Cart

**Actor**: Any User

**Preconditions**: User has items in cart

**Main Flow**:
1. User clicks cart icon in header
2. System opens cart sidebar
3. User views cart items with:
   - Product image
   - Product name
   - Price
   - Quantity controls
   - Remove button
4. User can:
   - Increase/decrease quantity
   - Remove items
   - View subtotal
   - Proceed to checkout

**Postconditions**: Cart is updated

**Alternative Flows**:
- User removes all items → Empty cart state shown
- User clicks outside sidebar → Sidebar closes
- User proceeds to checkout → Navigates to checkout page

---

### UC-005: Add to Wishlist

**Actor**: Any User

**Preconditions**: User is viewing a product

**Main Flow**:
1. User clicks heart icon (wishlist button)
2. System adds product to wishlist
3. System shows success toast notification
4. Wishlist icon updates with item count

**Postconditions**: Product is in wishlist

**Alternative Flows**:
- Product already in wishlist → System shows notification
- User clicks wishlist icon → Wishlist sidebar opens

---

### UC-006: Manage Wishlist

**Actor**: Any User

**Preconditions**: User has items in wishlist

**Main Flow**:
1. User clicks wishlist icon in header
2. System opens wishlist sidebar
3. User views wishlist items
4. User can:
   - Remove items from wishlist
   - Add items to cart
   - View product details

**Postconditions**: Wishlist is updated

**Alternative Flows**:
- User removes all items → Empty wishlist state shown
- User adds item to cart → Item moves to cart
- User navigates to wishlist page → Full wishlist view

---

### UC-007: Checkout Process

**Actor**: Any User

**Preconditions**: User has items in cart

**Main Flow**:
1. User clicks "Proceed to Checkout" in cart
2. System navigates to checkout page
3. User enters:
   - Full name
   - Email
   - Phone number
   - Shipping address
4. User reviews order summary
5. User clicks "Proceed to Payment"
6. System redirects to Stripe checkout
7. User enters payment information
8. User completes payment
9. System redirects to success page
10. User views order confirmation

**Postconditions**: Order is placed

**Alternative Flows**:
- User cancels payment → Returns to checkout
- Payment fails → Error message shown
- User closes checkout → Returns to cart

---

### UC-008: Track Order

**Actor**: Registered User

**Preconditions**: User has placed an order

**Main Flow**:
1. User navigates to account page
2. User clicks "Orders" in sidebar
3. System displays order history
4. User clicks "Track Order" on an order
5. System opens tracking modal
6. User views:
   - Tracking number
   - Carrier information
   - Estimated delivery
   - Tracking timeline
   - Order items

**Postconditions**: User has tracking information

**Alternative Flows**:
- User clicks "View Details" → Full order details shown
- Order is delivered → Timeline shows completion

---

### UC-009: Manage Account

**Actor**: Registered User

**Preconditions**: User is logged in

**Main Flow**:
1. User clicks account icon in header
2. System navigates to account page
3. User views profile information
4. User can:
   - Edit personal information
   - Edit shipping address
   - View order history
   - Manage wishlist
   - Update settings

**Postconditions**: Account information is updated

**Alternative Flows**:
- User edits profile → Modal opens with form
- User saves changes → Success toast shown
- User navigates to orders → Order history shown
- User navigates to settings → Settings page shown

---

### UC-010: Update Account Settings

**Actor**: Registered User

**Preconditions**: User is logged in

**Main Flow**:
1. User navigates to account settings
2. User can update:
   - Password (Security section)
   - Notification preferences
   - Payment methods
   - Language and currency
3. User clicks save button
4. System validates input
5. System updates settings
6. System shows success toast

**Postconditions**: Settings are updated

**Alternative Flows**:
- Validation fails → Error toast shown
- User adds payment method → Payment form shown
- User removes payment method → Confirmation required

---

### UC-011: Write Product Review

**Actor**: Any User

**Preconditions**: User is on product detail page

**Main Flow**:
1. User clicks "Write a Review" button
2. System opens review modal
3. User enters:
   - Star rating (1-5)
   - Name
   - Email (optional)
   - Review title (optional)
   - Review text
4. User clicks "Submit Review"
5. System validates input
6. System submits review
7. System shows success toast
8. Modal closes

**Postconditions**: Review is submitted

**Alternative Flows**:
- Validation fails → Error toast shown
- User cancels → Modal closes without saving
- User hasn't selected rating → Error shown

---

### UC-012: Share Product

**Actor**: Any User

**Preconditions**: User is on product detail page

**Main Flow**:
1. User clicks "Share" button
2. System opens share dropdown
3. User selects sharing method:
   - Facebook
   - Twitter
   - LinkedIn
   - Email
   - Copy Link
4. System executes share action
5. System shows success toast (for copy link)

**Postconditions**: Product is shared

**Alternative Flows**:
- Facebook → Opens Facebook share dialog
- Twitter → Opens Twitter share dialog
- LinkedIn → Opens LinkedIn share dialog
- Email → Opens email client
- Copy Link → Copies URL to clipboard

---

### UC-013: Search Products

**Actor**: Any User

**Preconditions**: None

**Status**: Planned (not yet implemented)

**Main Flow**:
1. User enters search query in search bar
2. System searches products
3. System displays search results
4. User views matching products
5. User can filter/sort results

**Postconditions**: User sees search results

---

### UC-014: Filter Products

**Actor**: Any User

**Preconditions**: User is on a category page

**Status**: Planned (not yet implemented)

**Main Flow**:
1. User opens filter panel
2. User selects filters:
   - Price range
   - Size
   - Color
   - Brand
   - Rating
3. System applies filters
4. System updates product grid
5. User views filtered products

**Postconditions**: Products are filtered

---

### UC-015: Sort Products

**Actor**: Any User

**Preconditions**: User is on a category page

**Status**: Planned (not yet implemented)

**Main Flow**:
1. User clicks sort dropdown
2. User selects sort option:
   - Price: Low to High
   - Price: High to Low
   - Newest
   - Best Selling
   - Top Rated
3. System sorts products
4. System updates product grid

**Postconditions**: Products are sorted

---

## Edge Cases

### EC-001: Empty Cart Checkout
**Scenario**: User tries to checkout with empty cart
**Handling**: Redirect to home page with message

### EC-002: Out of Stock Product
**Scenario**: User tries to add out of stock product
**Handling**: Disable add to cart button, show "Out of Stock" badge

### EC-003: Invalid Payment
**Scenario**: Payment fails during checkout
**Handling**: Show error message, allow retry

### EC-004: Session Timeout
**Scenario**: User session expires during checkout
**Handling**: Save cart, prompt to log in again

### EC-005: Network Error
**Scenario**: Network connection lost
**Handling**: Show error message, allow retry

---

## Success Metrics

### User Engagement
- Average session duration
- Pages per session
- Bounce rate
- Return visitor rate

### Conversion
- Add to cart rate
- Checkout completion rate
- Average order value
- Conversion rate

### User Satisfaction
- Product review ratings
- Customer support tickets
- Net Promoter Score (NPS)
- User feedback

---

## Future Enhancements

1. **User Authentication**
   - Login/Register
   - Password reset
   - Social login

2. **Advanced Search**
   - Autocomplete
   - Search suggestions
   - Voice search

3. **Personalization**
   - Product recommendations
   - Recently viewed
   - Personalized homepage

4. **Social Features**
   - User reviews with photos
   - Q&A section
   - Share wishlist

5. **Mobile App**
   - Native iOS app
   - Native Android app
   - Push notifications

6. **Loyalty Program**
   - Points system
   - Rewards
   - Exclusive deals
