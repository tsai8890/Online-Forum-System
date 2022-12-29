import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
    query users {
        users {
            UID
            username
            nickname
            intro
        }
    }
`

export const USER_BY_UID_QUERY = gql`
    query userByUID($UID: String!) {
        userByUID(UID: $UID) {
            UID
            username
            nickname
            intro
        }
    }
`

export const USER_BY_USERNAME_QUERY = gql`
    query userByUsername($username: String!) {
        userByUsername(username: $username) {
            UID
            username
            nickname
            intro
        }
    }
`

export const POSTS_QUERY = gql`
    query posts {
        posts {
            PID
            UID
            title
            username
            nickname
            comments {
                CID
                UID
                username
                nickname
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
                    username
                    nickname
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
                    timestamp
                }
                timestamp
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
            timestamp
        }
    }
`

export const POST_BY_PID_QUERY = gql`
    query postByPID($PID: String!) {
        postByPID(PID: $PID) {
            PID
            UID
            title
            username
            nickname
            comments {
                CID
                UID
                username
                nickname
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
                    username
                    nickname
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
                    timestamp
                }
                timestamp
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
            timestamp
        }
    }
`

export const POSTS_BY_UID_QUERY = gql`
    query postsByUID($UID: String!) {
        postsByUID(UID: $UID) {
            PID
            UID
            title
            username
            nickname
            comments {
                CID
                UID
                username
                nickname
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
                    username
                    nickname
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
                    timestamp
                }
                timestamp
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
            timestamp
        }
    }
`