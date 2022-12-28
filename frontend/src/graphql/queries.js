import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
    query users {
        users {
            UID
            username
            nickname
        }
    }
`

export const USER_BY_UID_QUERY = gql`
    query userByUID($UID: String!) {
        userByUID(UID: $UID) {
            UID
            username
            nickname
        }
    }
`

export const USER_BY_USERNAME_QUERY = gql`
    query userByUsername($username: String!) {
        userByUsername(username: $username) {
            UID
            username
            nickname
        }
    }
`

export const POSTS_QUERY = gql`
    query posts {
        posts {
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

export const POST_BY_PID_QUERY = gql`
    query postByPID {
        postByPID {
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

export const POSTS_BY_UID_QUERY = gql`
    query postsByUID {
        postsByUID {
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