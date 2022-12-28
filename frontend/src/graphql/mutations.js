import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
    mutation createUser($username: String!, $password: String!, $nickname: String) {
        createUser(username: $username, password: $password, nickname: $nickname) {
            UID
            username
            nickname
        }
    }
`

export const CREATE_POST_MUTATION = gql`
    mutation createPost($UID: String!, $content: String!) {
        createPost(UID: $UID, content: $content) {
            PID
            UID
            comments {
                CID
                UID
                message
                rating {
                    down {
                        stat
                        total
                    }
                    push {
                        stat
                        total
                    }
                }
                replies {
                    UID
                    message
                    rating {
                        down {
                            stat
                            total
                        }
                        push {
                            stat
                            total
                        }
                    }
                }
            }
            content
            rating {
                down {
                    total
                    stat
                }
                push {
                    stat
                    total
                }
            }      
        }
    }
`

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($PID: String!, $UID: String!, $comment: String!) {
        createComment(PID: $PID, UID: $UID, comment: $comment) {
            CID
            UID
            message
            replies {
                UID
                message
            }
            rating {
                push {
                    total
                    stat
                }
                down {
                    total
                    stat
                }
            }
        }
    }
`