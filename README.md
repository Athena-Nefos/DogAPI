*    Objectives:
 *    
 *    - Use asynchronous JavaScript tools to build a responsive web application.
 *    - Demonstrate understanding of the JavaScript event loop.
 *    - Generate asynchronous code using Promises and async/await syntax.
 *    - Use fetch and/or Axios to interact with an external web API.
 *    - Organize files using modules and imports.

 /**
 *    SBA 308A - JavaScript Web Application
 *   
 *  
 *    Instructions:
 *  
 *    Create a small single-page web application. 
 *    You will need access to an external API in order to complete the requirements listed below. 
 *    Since the content of the API will largely determine the content of your application, it should be chosen first and carefully. 
 *    You can look for available APIs across the internet, 
 *    but make sure they include features that will allow you to implement the requirements listed below.
 *   
 *  
 *    Requirements:
 *    
 *    - 20%  --> Use the fetch API or Axios to communicate with an external web API. 
 *               Use the data provided by this API to populate your application's content and features.
 *  
 *    - 15%  --> Create user interaction with the API through a search feature, paginated gallery, or similar. 
 *               This feature should use GET requests to retrieve associated data.
 *  
 *    - 15%  --> Enable user manipulation of data within the API through the use of POST, PUT, or PATCH requests. 
 *               Ensure your chosen API supports this feature before beginning.
 *  
 *    - 15%  --> Make use of Promises and async/await syntax as appropriate.
 *  
 *    -  3%  --> Organize your JavaScript code into at least three (3) different module files, 
 *               and import functions and data across files as necessary.
 *  
 *    -  5%  --> Ensure the program runs as expected, without any undesired behavior caused by misunderstanding of the JavaScript event loop 
 *               (such as race conditions, API calls being handled out of order, etc.).
 *  
 *    -  5%  --> Create an engaging user experience through the use of HTML and CSS.
 *  
 *    - 10%  --> Ensure that the program runs without errors 
 *               (comment out things that do not work, and explain your blockers - you can still receive partial credit).
 *  
 *    -  5%  --> Commit frequently to the git repository.
 *  
 *    -  2%  --> Include a README file that contains a description of your application.
 *  
 *    -  5%  --> Level of effort displayed in creativity, presentation, and user experience.
 **/

 This is a simple single-page web application that allows users to select a dog breed from a dropdown menu, view and favourite images of the selected breed and make a purchase for their dog . The application interacts with the Dog API to fetch breed information and images.