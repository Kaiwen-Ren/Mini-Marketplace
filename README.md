# Mini-Marketplace 

A simple campus marketplace demo with basic listing creation, booking, selling, canceling, and image upload support.

Tech stacks: Next.js + Prisma + MySQL + Tailwind

# How to install

1. Clone the repository
```
git clone https://github.com/Kaiwen-Ren/Mini-Marketplace.git
cd Mini-Marketplace
```
2. Install dependencies for frontend & backend

The project has two folders:
```
cd frontend
npm install

cd ../backend
npm install
```
3. Setup database (MySQL)
You should have MySQL running locally.

Example .env for backend:
```
DATABASE_URL="mysql://root:password@localhost:3306/mini_marketplace"
```
Make sure to create the database manually:
```
CREATE DATABASE mini_marketplace;
```
4. Run Prisma migrations

Inside `/backend`:
```
npx prisma migrate dev
```
This creates the required tables: User & Listing.

5. Open Prisma Studio and update default users information (Alice / Bob / Charlie)

Run:
```
npx prisma studio
```
This opens the database studio. You can add some default data in it. e.g.,

| id | acatarUrl | name |
| :------ | :---------: | -----: |
| alice | https://ui-avatars.com/api/?name=Alice | Alice |
| bob | https://ui-avatars.com/api/?name=Bob | Bob |
| charlie | https://ui-avatars.com/api/?name=Charlie | Charlie |

6. Start the backend server

Inside `backend` folder:
```
npm run dev
```
The backend runs on `http://localhost:3001`

7. Start the frontend

Inside `/frontend`:

```
npm run dev
```

Frontend runs on `http://localhost:3000`

# How to switch users (Alice/Bob/Charlie)

The navbar contains a User dropdown.

Open the top-right dropdown. Select Alice, Bob, or Charlie. The pages will automatically reload with that user's data.

# Known limitations

User profile and user login page are not implemented.

