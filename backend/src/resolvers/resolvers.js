import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';

const saltRounds = 10;

const resolvers = {
    // Query
    Query: {
        // User Data
        users: async (parent, args, contextValue, info) => {
            const {UserModel} = contextValue;
            const users = await UserModel.find({});
            return users;
        },
        userByUID: async (parent, args, contextValue, info) => {
            const {UserModel} = contextValue;
            const {UID} = args;
            const user = await UserModel.findOne({UID});
            return user;
        },
        userByUsername: async (parent, args, contextValue, info) => {
            const {UserModel} = contextValue;
            const {username} = args;
            const user = await UserModel.findOne({username});
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
            const old = UserModel.findOne({username});
            if (!old) {
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
            console.log(args);
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
                    cookie: 'cookie'
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
            const {UID, content} = args;
            if (!UID || !content) {
                return null;
            }

            const {PostModel} = contextValue;
            const post = await new PostModel({
                PID: uuid(),
                UID: UID,
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
            }).save();
            return post;
        },
        createComment: async (parent, args, contextValue, info) => {
            const {PID, UID, comment} = args;
            if (!PID || !UID || !comment) {
                return null;
            }

            const {PostModel} = contextValue;
            const post = await PostModel.findOne({PID});
            if (!post) {
                return null;
            }

            console.log(post);

            const newComment = {
                CID: uuid(),
                UID: UID,
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