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

Need to design responsive layout for mobile devices.

# Page Examples:

## Public Listings

<img width="2752" height="1588" alt="image" src="https://github.com/user-attachments/assets/0008cdb5-acc6-4a20-8b91-5ebe7c9e6120" />

## Create Listing

<img width="2760" height="1562" alt="image" src="https://github.com/user-attachments/assets/8d25237d-ca24-454b-b79d-74777c4d3537" />

## Book an Item

<img width="2748" height="1578" alt="image" src="https://github.com/user-attachments/assets/5dedef41-3db8-486a-bcad-7a8bb4b5e2b4" />

After click book button:

<img width="2766" height="1586" alt="image" src="https://github.com/user-attachments/assets/4f5f1176-211c-4173-a4e8-019a538790f5" />

## My Selling

<img width="2756" height="1580" alt="image" src="https://github.com/user-attachments/assets/faa1c6dc-b7cc-417d-8b8c-de9320d5201a" />

Mark an item as sold

<img width="2762" height="1582" alt="image" src="https://github.com/user-attachments/assets/e7fbbda6-f3de-4c9b-98c7-c5f3e42ea9af" />

Cancel a booking

<img width="2756" height="1590" alt="image" src="https://github.com/user-attachments/assets/fa5c73a8-4316-49a4-9db0-108078d047d3" />

Final status

<img width="2748" height="1566" alt="image" src="https://github.com/user-attachments/assets/b4a88679-d180-4bd7-9074-e230ea8b94cb" />

## My Buying

<img width="2752" height="1586" alt="image" src="https://github.com/user-attachments/assets/1a44555e-5424-4647-bde2-156d59856c6f" />

# Demo video


