Description

This project is a react-based web application designed to manage and review movie and TV series content. If they want to view movies for a particular actor, they can. The signed in users can create their own fantasy movies and can also submit and view reviews for movies and TV series. Also, the application uses AWS SDK to directly interact with DynamoDB and AWS Cognito for user authentication. The features to add fantasy movie, submit and view reviews are present only for registered users. However, not signed in users can still favourite their tvshows/movies.

The website can be found here: http://ambarish-react-website.s3-website-eu-west-1.amazonaws.com/

Features

1. User authentication via AWS Cognito
2. Submit reviews for movies and TV series
3. Store reviews in DynamoDB
4. Create own fantasy movie
5. React frontend with a modern and responsive UI
6. AWS SDK for direct DynamoDB interactions like viewing their reviews
7. Users can favourite their movies and tv shows
8. The application uses server state caching
9. Users can view on netflix/amazon prime
10. Users can delete their movies/tv shows
11. The application is deployed on aws using S3 bucket

API integration

The application uses serverless web API for authentication- https://90f9e12fo5.execute-api.eu-west-1.amazonaws.com/prod/auth/signin
For testing the complete features of the app, please use username: ambarish123 , password: @123Ambarish
Git repo- https://github.com/ambarishroy/Serverless-Web-API

