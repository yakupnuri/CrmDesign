# Freelancer Graphic Design CRM

A comprehensive CRM system built with Electron.js, React, Express.js, and PostgreSQL, specifically designed for freelance graphic designers.

## Features

- Dashboard with key metrics and calendar integration
- Project management with status tracking
- Client management
- Product and service catalog
- Invoice generation and tracking
- Work hour logging
- Google Calendar integration

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Express.js
- Database: PostgreSQL
- Desktop App: Electron.js
- Additional: Chart.js, FullCalendar

## Setup Instructions

1. Clone the repository:
\`\`\`bash
git clone [repository-url]
cd freelancer-crm
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up the database:
- Create a PostgreSQL database
- Copy .env.example to .env and update the database credentials
- Run the schema.sql file to create the tables:
\`\`\`bash
psql -U your_username -d your_database_name -f server/database/schema.sql
\`\`\`

4. Start the development servers:
\`\`\`bash
# Start both frontend and backend
npm run dev

# Or start them separately:
npm run server  # Start backend
npm start      # Start Electron app
\`\`\`

## Project Structure

- `/src` - React frontend code
  - `/components` - React components
  - `/pages` - Page components
  - `/context` - React context providers
  - `/utils` - Utility functions
- `/server` - Express.js backend
  - `/routes` - API routes
  - `/controllers` - Route controllers
  - `/database` - Database schema and migrations
- `/public` - Static assets

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
