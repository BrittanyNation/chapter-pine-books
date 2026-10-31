# Chapter & Pine Books — Bookstore E-Commerce Website

An original, fully functional e-commerce website for a fictional independent bookstore: a shop page with live search, genre filters, and sorting, book detail views where format choices update the price, a wishlist, a persistent shopping bag, and a checkout that validates, applies a promo code, and ends in a real confirmation with an order reference.

**Live demo:** https://brittanynation.github.io/chapter-pine-books/
- Shop: https://brittanynation.github.io/chapter-pine-books/
- Bag & Checkout: https://brittanynation.github.io/chapter-pine-books/cart.html
- Visit & Events: https://brittanynation.github.io/chapter-pine-books/visit.html

## Roles this supports
Built to support applications for **Front-End Designer**, **Web Designer**, and **Website Designer** roles — front-end design work: designing websites and building them with real code.

## What it demonstrates
- **A shop that actually works** — 9 books rendered from data, live search by title/author, genre filter chips, and sorting by price, title, and rating, with a live result count and an honest empty state
- **Format pricing that updates** — each book's Details view offers Paperback / Hardcover / Ebook at different prices; the price updates on change and the chosen format is what lands in the bag
- **A real cart** — add, increase, decrease, and remove in both the slide-in bag drawer and the full checkout page; quantities and totals stay correct, free shipping applies at $50+ after discounts (otherwise $4.95), and the bag persists in localStorage across pages and visits
- **A working promo code** — PINEREAD10 takes 10% off the book subtotal with a clear applied / not-recognised message
- **Validated checkout with a real end state** — name, email, address, and card validate inline; a valid order generates a CP-XXXXXX reference, shows the charged total, saves the order to localStorage, and clears the bag
- **Wishlist, events, and newsletter** — Save toggles persist per book, event and FAQ sections use native accordions, and the Friday Letter form validates email and confirms signup
- **Accessibility-minded choices** — aria-pressed on filters and wishlist, aria-live result and toast announcements, real labels, skip link, aria-current navigation, and Escape closes the detail view and bag
- **Responsive, framework-free build** — hand-written HTML/CSS with vanilla JavaScript, one stylesheet, no external images; book covers are styled panels

## Palette
| Token | Hex | Use |
| --- | --- | --- |
| Library Navy | `#22304A` | Header, summary panel, filter active state |
| Burgundy | `#7A2E3A` | Prices, primary actions, hero gradient |
| Brass | `#B9975B` | Bag button, logo accent |
| Parchment | `#F6EFE3` | Page background |
| Sage | `#9CAF88` | Book badges |
| Paper | `#FFFDF8` | Cards and panels |

## Contents
| Page | What it covers |
| --- | --- |
| `index.html` | Shop — hero, trust stat band, search / genre / sort controls, 9-book grid, detail modal with format pricing, bag drawer |
| `cart.html` | Bag & Checkout — quantity editing, promo code, order summary with shipping rule, validated checkout form, confirmation state |
| `visit.html` | Visit & Events — story, hours table, event and FAQ accordions, validated newsletter signup |

## Workflow note
My design workflow runs in **Sketch and Webflow**, where I design websites and systems visually. This demo is hand-built in HTML/CSS/JS to show the same front-end design thinking — honest pricing, real stock of functions, and plain words — expressed directly in code.

## Files
- `index.html` — shop page
- `cart.html` — bag and checkout page
- `visit.html` — visit and events page
- `styles.css` — design tokens and all component styles
- `shop.js` — catalog data, search/filter/sort, detail modal, cart, promo, checkout, and newsletter logic
- `og-image.png` — 1200x627 social preview image in the project palette

## Note
This is an original portfolio concept created by Brittany Nation. Chapter & Pine Books is a fictional business; this project is not affiliated with any real bookstore. All names, prices, and figures shown are sample data, and the site takes no real orders and processes no payments — orders are stored only in the visitor's browser.
