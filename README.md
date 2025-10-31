# BookIt: Experiences & Slots

A modern, full-stack web application for discovering travel experiences, selecting available slots, and completing bookings. Built with React, TypeScript, Express.js, and Tailwind CSS.

## 🎯 Features

- **Experience Discovery**: Browse a curated collection of travel experiences
- **Detailed Information**: View detailed experience information with ratings, reviews, and highlights
- **Slot Selection**: Choose available dates and times for your preferred experience
- **Flexible Booking**: Select number of participants and customize your booking
- **Promo Code Support**: Apply discount codes (SAVE10, FLAT100, WELCOME20, SUMMER25)
- **Booking Confirmation**: Receive instant confirmation with booking details
- **Responsive Design**: Fully responsive across all device sizes
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## 🏗️ Tech Stack

### Frontend

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Routing**: React Router 6
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Data Fetching**: Fetch API

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Development**: Vite (with server plugin)

### Development Tools

- **Testing**: Vitest
- **Package Manager**: pnpm
- **Code Quality**: TypeScript, ESLint

## 📋 Prerequisites

- Node.js (v16 or higher)
- pnpm (v10 or higher) - Install with `npm install -g pnpm`

## 🚀 Local Development

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd bookit

# Install dependencies
pnpm install
```

### 2. Run Development Server

```bash
# Start both frontend and backend
pnpm dev
```

The application will be available at `http://localhost:5173`

### 3. Build for Production

```bash
# Build both frontend and backend
pnpm build

# Start production server
pnpm start
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test -- --watch
```

## 📊 Project Structure

```
bookit/
├── client/                 # React frontend
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Experience listing
│   │   ├── Details.tsx    # Experience details and slot selection
│   │   ├── Checkout.tsx   # Booking form and summary
│   │   ├── Result.tsx     # Booking confirmation
│   │   └── NotFound.tsx   # 404 page
│   ├── components/
│   │   ├── Header.tsx     # Shared header component
│   │   └── ui/            # Pre-built UI components
│   ├── App.tsx            # App routing setup
│   ├── global.css         # Global styles and theme
│   └── vite-env.d.ts      # Vite types
├── server/                # Express backend
│   ├── index.ts           # Server setup and routes
│   ├── routes/
│   │   ├── experiences.ts # Experience API routes
│   │   ├── bookings.ts    # Booking creation route
│   │   ├── promo.ts       # Promo code validation
│   │   └── demo.ts        # Demo endpoint
│   ├── data/
│   │   ├── experiences.ts # Mock experience data
│   │   ├── bookings.ts    # Booking storage and management
│   │   └── promos.ts      # Promo code data
│   └── node-build.ts      # Production server build
├── shared/                # Shared types
│   └── api.ts             # API interfaces
├── vite.config.ts         # Frontend Vite config
├── vite.config.server.ts  # Backend Vite config
├── tailwind.config.ts     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── package.json           # Dependencies and scripts

```

## 🛣️ API Endpoints

### Experiences

- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience details with available slots

### Bookings

- `POST /api/bookings` - Create a new booking

**Request Body:**

```json
{
  "experienceId": "string",
  "slotId": "string",
  "participants": "number",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "totalPrice": "number",
  "discountApplied": "number",
  "promoCode": "string|null"
}
```

### Promo Codes

- `POST /api/promo/validate` - Validate a promo code

**Request Body:**

```json
{
  "code": "string",
  "totalPrice": "number"
}
```

**Available Promo Codes:**

- `SAVE10` - 10% discount
- `FLAT100` - 15% discount
- `WELCOME20` - 20% discount
- `SUMMER25` - 25% discount

## 🎨 Design System

The application follows a modern design system with:

- **Color Palette**: Blue-based primary colors with slate neutrals
- **Typography**: Inter font family with semantic heading scales
- **Spacing**: Consistent spacing tokens (xs, sm, md, lg, xl, 2xl, 3xl)
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first responsive design approach

## 🔄 Booking Flow

1. **Home Page** → Browse available experiences
2. **Details Page** → View full details, select date/time slot, choose number of participants
3. **Checkout Page** → Enter customer information, apply promo codes, review pricing
4. **Result Page** → View booking confirmation with confirmation number

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All pages are fully responsive and optimized for all screen sizes.

## 🚀 Deployment

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist/spa`
   - Functions directory: `netlify/functions`
3. Deploy

The application includes a Netlify Functions configuration for serverless deployment.

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Vercel automatically detects the configuration
3. Deploy with a single click

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - Build command: `pnpm build`
   - Start command: `pnpm start`
4. Deploy

### Deploy to AWS

1. Build the application: `pnpm build`
2. The `dist/server` directory contains the production server
3. Deploy using your preferred AWS service (EC2, Elastic Beanstalk, etc.)

## 🔐 Environment Variables

Currently, no environment variables are required for basic functionality. The application uses mock data.

For production with a real database, you would add:

```
DATABASE_URL=your_database_connection_string
API_KEY=your_api_key
```

## 🛠️ Development Tips

### Add a New Experience

1. Add data to `server/data/experiences.ts`
2. Include all required fields: title, description, location, price, rating, image, availableSlots

### Add a New Promo Code

1. Add to the `promoCodes` Map in `server/data/promos.ts`
2. Specify: code, discountPercentage, maxUses, expiresAt

### Create a New Page

1. Create component in `client/pages/NewPage.tsx`
2. Add route to `client/App.tsx`:
   ```typescript
   <Route path="/new-page" element={<NewPage />} />
   ```

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port.

### API Not Responding

1. Ensure the dev server is running with `pnpm dev`
2. Check that both frontend and backend compiled successfully
3. Check browser console for errors

### Styling Issues

1. Clear browser cache (Ctrl+Shift+Del)
2. Ensure Tailwind CSS is properly configured
3. Check `tailwind.config.ts` for correct content paths

## 📝 License

This project is part of a fullstack assignment. See LICENSE file for details.

## 👨‍💻 Support

For issues or questions:

1. Check the troubleshooting section
2. Review the code comments
3. Check browser console for error messages

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js Guide](https://expressjs.com)
- [React Router Documentation](https://reactrouter.com)

## 🚀 Next Steps for Production

1. **Database Integration**: Replace mock data with a PostgreSQL database (Neon recommended)
2. **Authentication**: Add user authentication with JWT or OAuth
3. **Payment Processing**: Integrate Stripe or similar payment gateway
4. **Email Notifications**: Add email service for booking confirmations
5. **Analytics**: Implement analytics tracking
6. **Rate Limiting**: Add rate limiting to API endpoints
7. **Logging**: Implement structured logging
8. **Error Monitoring**: Set up error tracking with Sentry

## 📞 Contact

For deployment or technical support, refer to the hosted application or contact the development team.

---

Built with ❤️ using modern web technologies
