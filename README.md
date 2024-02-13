# Event7-Dashboard

Design and implement a full stack application “Events7” and prepare unit and integration tests that will validate your solution.

## Main Tech Stack

- **Framework:** [Vue3 & NestJs]
- **ORM:** [TypeORM]
- **Validations:** [VeeValidation & Zod]
- **DB** [MySQL]
- **DB Management** [MySQL Workbench]
- **Styling:** [Tailwind CSS]
- **UI Components:** [shadcn/ui]

## Introduction Before Starting

Well, wow I must a little amazed! I have beed working my brain so hard these pas few days... Unfortunatly with not much successful results! Not very familiar with NestJs neither Vue3, It was a very interesting challenge for!

I should of probably asked.. But it was quite difficult to figure out, how to arhitecture the project. It's funny because, when i first read the assignement I was feeling very confident, a simple schema, some relations, some queries and voila... But in the end it didn't work out like aspected.

Big Fail ( NO task validated) ! Hope you will still find some interesting parts inside the project.

        ===  ASSUMPTIONS  ===

Like a said at the begening it looks simple, but here is the structure the assignemtn lead me to.

Many Games have mutliple events. The Outfit7 team can add mutltiple events from services like marketing, those events are assigned to a product, Talking Tom 3 for example. So many events means aswell lot of queries, read & writes to take in for the database, and for the money, so a good way would be to monitor these features (events), with event listeners and like TT 3 is all around the world lets use geolocation effienctly.

Now, regardless of where are the users around the world and wher eis the databse; I was more concern about this priotity number in the task!

I assumed that it would be and identifier to indicate how much effective a feature is or how much a an addvert has been click or not. But Is a priority 0 less important than a priority 10 or 100...? If the user never clicks on the button UP then priority would be set to 0 but indicates that the feature high priority to take care of. But the contrary would be a a button that is massively clicked but and demands a lot for the server and could be a high priority for unit test.

This is why monitoring is necessary, the more data is smartly structured and analyzez, the better quality and performance will of future features.

I would of Loved to manage to illustrate this with NestJs and Vue! Unfortunatly, I thougt the assignement would be much more easier for me than expected. NestJs was a great opportunaty to dive deep into the matrix of calling queries. I was not able to cast spells but slowly I understood the magic and the power of Nest especially. So I mainly focused on NEstJS rather than Vue3!

My biggest challenge was to seed data into the database.. I wanted to make a litle like I did in previous projects using fakerJs to generate some events to send to the database or generate numbers for clicking events to implement a linear graph that you could interact with while exploring the project. I saw too thinking big and got a little hyped too quickly and then had to recenter my work. But I run out of time.

## Clone the repository

git clone https://github.com/your-username/event7-dashboard.git

I assume that you have Mysql server, and is already set up quite warmly..
we use pnpm / replace pnpm by "npm run" if prefered

# Install dependencies using npm

pnpm setup

# Update the variables.

Get your Mysql server runnning and change .env accordinngly

# Start the development server

pnpm start:dev

# Push the database schema

pnpm migrations:run
pnpm dev

Et voila !

I must say I took really a long time to figure out how Nest Js works, they have good docs but stil time flows and you have to write and test. Nevertheless a lot have been learn, so Thank You :}
