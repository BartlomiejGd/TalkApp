<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Simply chat application based on NestJS framework and SQLite database </p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/github/directory-file-count/bartlomiejgd/talkapp" alt="CircleCI" /></a>
<img src="https://img.shields.io/tokei/lines/github.com/bartlomiejgd/talkapp"</p>

## Description

TalkApp is example not real time chat application based on relational database and NestJS framework.

Repository contain .env file which allow to run application on your environment, all secret keys are in file.


## Techniques used in project

- Guards ✅
- Authentication /Authorization ✅
- Decorators ✅
- interfaces ✅
- Environment variables ✅
- Pipes ✅
- TypeORM ✅
- - SQLite
- Pagination 
- 3 layer pattern ✅
- E-mail confirmation account (not finished)
- CRUD ✅
- Filtered return ✅

## API Endpoits

```
/api/v1/user/register -[POST]

/api/v1/auth/login -[POST]

/api/v1/auth/logout -[GET]

/api/v1/message/sendTxtMessage -[POST]

/api/v1/message/GetConversation/:ConversationId -[GET]

/api/v1/connections/newConnection -[POST]

/api/v1/connections/getConnectionListToAccept -[GET]

/api/v1/connections/acceptConnection -[PUT]

/api/v1/connections/getAvailableConnectionsList -[GET]
```



## Installation / Running the app

```
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


