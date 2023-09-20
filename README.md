
<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
  - [Built With](#built-with)
- [Features](#features)
- [How To Use](#how-to-use)

<!-- OVERVIEW -->

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [Nextjs](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com/)
- [React-dnd - for drag and drop](https://react-dnd.github.io/react-dnd/about)
- [Supabase - for database and auth](https://supabase.com/)
  
## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to HNGX frontend track stage three task. The task was to build an application to complete the given user stories.

- User can drag and drop images to reposition them
- User can search for images
- Only authorized users can view image gallery
## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Rd-Trends/HNGX-drag-and-drop-image-gallery.git
```

create a .env.local file in your root directory and add the following environment variables,
visit [Supabase](https://supabase.com) to create an account and get your url and anon key for a specific project

```env
NEXT_PUBLIC_SUPABASE_URL=your_superbase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_superbase_anon_key
```

```bash
# Install dependencies
$ yarn install or npm install

# Run the app
$ yarn dev or npm run dev
```