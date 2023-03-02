# **geekMonk** 
My React App is a web application that allows users to manage projects, collaborate with coworkers, and stay organized.

### **Table of Contents**
- Technologies
- Getting Started
- Features
- Custom Hooks
- Protected Routes
- Online Users
- Project Management
- Comments
- Filtering
### **Technologies**
The App is built using the following technologies:
- React
- Firebase
- React Router
- React Select
- date-fns

### **Getting Started**
To get started, simply clone the repository and run ```npm install``` to install the necessary dependencies. You will also need to add your Firebase configuration details to the ```src/firebase/firebase.js``` file.

Once you have installed the dependencies and added your Firebase configuration, you can start the development server by running ```npm start```.

### **Features**
The app has the following features:

- User authentication (login and signup)
- Online user list
- Project creation
- Project assignment
- Due date selection
- Project category selection
- Mark project as completed (by project creator)
- Commenting system
- Project filtering (by all, by mine, by category)

### **Custom Hooks**
I make use of the following custom hooks:

- useAuthContext
- useCollection
- useDocument
- useFirestore
- useLogin
- useSignup
- useLogout

### **Protected Routes**
**geekMonk** uses protected routes to ensure that only authenticated users can access certain pages. The login and signup pages are accessible to all users, but all other pages require authentication.

### **Online Users**
The app displays a list of online users in real-time, using Firebase's Realtime Database.

### **Project Management**
The app allows users to create new projects, assign them to coworkers, and set a due date. Projects can also be marked as completed by the project creator.

### **Comments**
The app features a commenting system that allows users to leave comments on projects. The time at which each comment was added is displayed using date-fns **```formatDistanceToNow```** function.

### **Project Filtering**
My React App allows users to filter projects by all, by mine, and by category using React Select

