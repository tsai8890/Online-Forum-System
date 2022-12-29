import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';

const saltRounds = 10;

const resolvers = {
    // Query
    Query: {
        // User Data
        users: async (parent, args, contextValue, info) => {
            const {UserModel} = contextValue;
            const users = await UserModel.find({}).select('-password');
            return users;
        },
        userByUID: async (parent, args, contextValue, info) => {
            const {UserModel} = contextValue;
            const {UID} = args;
            const user = await UserModel.findOne({UID}).select('-password');
            return user;
        },
        userByUsername: async (parent, args, contextValue, info) => {
            const {UserModel} = contextValue;
            const {username} = args;
            const user = await UserModel.findOne({username}).select('-password');
            return user;
        },

        // Post Data
        posts: async (parent, args, contextValue, info) => {
            const {PostModel} = contextValue;
            const posts = await PostModel.find({});
            return posts;
        },
        postByPID: async (parent, args, contextValue, info) => {
            const {PostModel} = contextValue;
            const {PID} = args;
            const posts = await PostModel.findOne({PID});
            return posts;
        },
        postsByUID: async (parent, args, contextValue, info) => {
            const {PostModel} = contextValue;
            const {UID} = args;
            const posts = await PostModel.find({UID});
            return posts;
        },
    },

    
    // Mutation
    Mutation: {
        createUser: async (parent, args, contextValue, info) => {
            const {username, password, nickname} = args;
            if (!username || !password) {
                return {
                    success: false,
                    msg: 'no username or password'
                };
            }

            const {UserModel} = contextValue;
            const old = await UserModel.findOne({username});
            if (old) {
                return {
                    success: false,
                    msg: 'user existed'
                };
            }
            
            const hashed = bcrypt.hashSync(password, saltRounds);
            const user = await new UserModel({
                UID: uuid(),
                username: username,
                password: hashed,
                nickname: (nickname) ? nickname : username
            }).save();
            
            if (user) {
                return {
                    success: true,
                    msg: 'successfully registered'
                };
            }
            else {
                return {
                    success: false,
                    msg: 'error: register unsuccessfully'
                };
            }
        },

        // Login
        login: async (parent, args, contextValue, info) => {
            const {UserModel} = contextValue;
            const {username, password} = args;

            if (!username || !password) {
                return {
                    success: false,
                    cookie: ''
                }
            }

            const user = await UserModel.findOne({username});
            if (!user) {
                return {
                    success: false,
                    cookie: ''
                }
            }
            
            if (bcrypt.compareSync(password, user.password)) {
                return {
                    success: true,
                    cookie: 'cookie',
                    UID: user.UID,
                    username: user.username,
                    nickname: user.nickname
                }
            }
            else {
                return {
                    success: false,
                    cookie: 'cookie'
                }
            }
        },

        createPost: async (parent, args, contextValue, info) => {
            const {UserModel} = contextValue;
            const {UID, title, content} = args;
            console.log(args);
            if (!UID || !title | !content) {
                return null;
            }

            const user = await UserModel.findOne({UID});
            if (!user) {
                return null;
            }

            const {PostModel} = contextValue;
            const post = await new PostModel({
                PID: uuid(),
                UID: UID,
                title: title,
                username: user.username,
                nickname: user.nickname,
                content: content, 
                comments: [],
                rating: {
                    push: {
                        total: 0,
                        stat: []
                    },
                    down: {
                        total: 0,
                        stat: []
                    }
                },
                timestamp: new Date().getTime().toString(),
            }).save();
            return post;
        },
        createComment: async (parent, args, contextValue, info) => {
            const {UserModel} = contextValue;
            const {PID, UID, comment} = args;
            if (!PID || !UID || !comment) {
                return null;
            }

            const user = await UserModel.findOne({UID});
            if (!user) {
                return null;
            }

            const {PostModel} = contextValue;
            const post = await PostModel.findOne({PID});
            if (!post) {
                return null;
            }

            const newComment = {
                CID: uuid(),
                UID: UID,
                username: user.username,
                nickname: user.nickname,
                message: comment,
                replies: [],
                rating: {
                    push: {
                        total: 0,
                        stat: []
                    },
                    down: {
                        total: 0,
                        stat: []
                    }
                },
                timestamp: new Date().getTime().toString(),
            };
            post.comments.push(newComment);
            await post.save(); 
            return newComment;
        },
    },


    // Data Models
    Post: {
        comments: (parent, args, contextValue, info) => {
            return parent.comments;
        },
        rating: (parent, args, contextValue, info) => {
            return parent.rating;
        },
    },
    Comment: {
        replies: (parent, args, contextValue, info) => {
            return parent.replies;
        },
        rating: (parent, args, contextValue, info) => {
            return parent.rating;
        }
    },
    Reply: {
        rating: (parent, args, contextValue, info) => {
            return parent.rating;
        }
    },
    Rating: {
        push: (parent, args, contextValue, info) => {
            return parent.push;
        },
        down: (parent, args, contextValue, info) => {
            return parent.down;
        } 
    }

};

export default resolvers;