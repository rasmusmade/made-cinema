# made-cinema
A web-application for recommending movies and seats to cinema customers. Made for CGI 2024 summer internship application.

# How to start
Your computer needs to have git, JDK, maven and docker installed. 

Git download links and instructions: https://git-scm.com/downloads

JDK download links and instructions: https://www.oracle.com/java/technologies/downloads/

Maven download links and instructiojns: https://maven.apache.org/download.cgi

Don't forget to add both the Maven and JDK 21 binary directories to the environment path!

Docker download: https://www.docker.com/products/docker-desktop/

1. Open terminal. Navigate to the directory where you want to clone the project.
1. Clone the repo: git clone https://github.com/rasmusmade/made-cinema.git
2. Navigate to the backend home directory: /made-cinema/cinema/cinema
3. run: mvn package -DskipTests
4. After the build is complete navigate back to the project home directory: /made-cinema
5. After making sure your docker desktop is running, run the following command in the project home directory: docker-compose up --build
6. go to localhost:3000 to access the application

# How the project was built

# General Information

As I had very limited experience with Spring Boot and React applications, the project presented a rather high learning curve for me. I began by watching a video on creating a very basic Spring Boot and React cinema application. (https://www.youtube.com/watch?v=5PdEmeopJVQ&t=4578s) Since the code provided was somewhat full of errors, I spent too much time trying to fix them. In the end, I used almost nothing from this tutorial; it was mainly beneficial to introduce me to Spring Boot and React.
I decided that I wanted to use a PostgreSQL relational database, as I studied it in one university class and wanted to refresh my knowledge. I also set up Docker at the beginning because it was recommended to me by a more experienced friend. I populated the database with the following dataset I found on Kaggle: https://www.kaggle.com/code/stefanoleone992/rotten-tomatoes-eda. I used my pandas knowledge to edit the data to my liking and then imported it into my database. Later, I chose 12 movies to attach poster URLs to. These movies would make up the current movie selection in my cinema.
After completing the database part, I set up basic functionality for the back-end and then started to work simultaneously with the front-end and back-end. On the front end, I used React-Bootstrap to make the designing easier.
My seating system's front-end is inspired by a pre-made project (https://github.com/somanath-goudar/20-Web-Projects-Using-Vanilla-JavaScript/tree/master/2-movie-seat-booking). Here, I used ChatGPT to convert it into a React component, but I modified it according to my own standards. I also utilized ChatGPT a bit with another front-end component, mainly to optimize the code, as my experience with React and JavaScript is limited. The back-end code is entirely authored by me.

# Functionality
I investigated Estonian cinema homepages and decided to make the filtering a bit more intuitive than the guide explained. I separated screenings by date on the Screenings page and screenings based on movies on the homepage. On the homepage, users can also filter movies based on genres, although this filtering system was developed when I was running out of time, so it could use some improvement. For example, I would like all the unique genres to be selectable separately and also together. I could have also added filtering by rating, because I have the tomatometer rating information in the datavase.

The seat selection algorithm currently only recommends seats if the number of tickets the user wants to buy are available in a row. When the algorithm can't find the selected number of seats in a row, the user needs to manually select them. I used Manhattan distance to calculate distances from the middle point of the theater. I also decided that the cinema has square seating layouts with an odd number of rows and columns. However, if the theaters were different, the current algorithm wouldn't work with them, but redesigning the algorithm wouldn't be too difficult.
As usual, I underestimated the time each problem would take to solve, so in the final result, I am missing the user login functionality. That was supposed to be for watch history. The database has unpopulated tables; these were meant for the login functionality. I also would have liked to tweak the styling of the application a bit more, but I thought the functionality to be more important.

# Conclusion
The project took me 40+ hours to complete, and I would have loved to have had more time to complete all the functionalities. The hardest part was designing the front-end, as my experience with JavaScript was very limited.

