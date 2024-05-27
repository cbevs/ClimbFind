# Boulder Buddy

## Introduction

Boulder Buddy v0.1

Find climbs that suit your fancy and keep track of your sends!

## Installation

For a copy of this repository please `Download ZIP` (found under the green `Code` button).

After unpacking the ZIP you can rename the folder/ directory for your new project.

## Usage

1. Install necessary dependencies with `yarn`:

   ```sh
   yarn install
   ```

2. In the root of the `server` folder, create a `.env` file to hold the session secret. This will allow Passport to keep track of the currently signed-in user in session. Include a SESSION_SECRET in the `.env`:

   ```env
   SESSION_SECRET="ff521741-6d5a-48d2-96a9-b95bbcf60bc4"
   ```

3. Create your base PostgreSQL database. Check the `server/src/config/getDatabaseUrl` file for the name of the `development` database. For example:

   ```sh
   createdb climb-find_development
   ```

4. Run the included table migrations:

   ```sh
   cd server
   yarn migrate:latest
   ```

5. Run the included seeder:
   
   ```sh
   cd server
   yarn db:seed
   ```

6. Start up the application, from the root folder:

   ```sh
   cd .. # if in the server folder

   yarn run dev
   ```

6. Navigate to <http://localhost:3000>. You should see the Boulder Buddy home page.

7. A user has been seeded for use on the site
   - Username: admin@boulderbuddy.com
   - Password: boulderBuddy2024
