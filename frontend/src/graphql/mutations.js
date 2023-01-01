import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
    mutation createUser($username: String!, $password: String!, $nickname: String!) {
        createUser(username: $username, password: $password, nickname: $nickname) {
            success
            msg
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            success
            UID
            username
            nickname
        }
    }
`

export const CREATE_POST_MUTATION = gql`
    mutation createPost($UID: String!, $title: String!, $content: String!) {
        createPost(UID: $UID, title: $title, content: $content) {
            PID
            UID
            title
            username
            nickname
            content
            timestamp    
        }
    }
`

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($PID: String!, $UID: String!, $comment: String!) {
        createComment(PID: $PID, UID: $UID, comment: $comment) {
            CID
            UID
            username
            nickname
            message
            timestamp
        }
    }
`

export const UPDATE_POST_MUTATION = gql`
    mutation updatePost($PID: String!, $title: String!, $content: String!) {
        updatePost(PID: $PID, title: $title, content: $content) {
            success
            msg
        }
    }
`

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($PID: String!) {
        deletePost(PID: $PID) {
            success
            msg
        }
    }
`

export const UPDATE_RATING_MUTATION = gql`
    mutation updateRating($UID: String!, $PID: String!, $action: String!) {
        updateRating(UID: $UID, PID: $PID, action: $action) {
            success
            msg
        }
    }
`

export const UPDATE_USER_MUTATION = gql`
    mutation updateUser($UID: String!, $nickname: String!, $intro: String) {
        updateUser(UID: $UID, nickname: $nickname, intro: $intro) {
            success
            msg
        }
    }
`