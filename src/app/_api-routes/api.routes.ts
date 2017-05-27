let applicationPrefix = '/application/';

import { environment } from '../../environments/environment';

export const API_ROUTES = {
    baseUrl: environment.baseUrl,
    registerRoutes: {
        newUser: '/auth/register'
    },
    loginRoutes: {
        loginUser: '/auth/login'
    },
    getUserRoute: '/auth/user',
    logoutUser: '/auth/logout',
    application: {
        child: {
            index: applicationPrefix + 'children',
            newChild: applicationPrefix + 'children/new',
            getChild: (shortId) => {
                return applicationPrefix + 'children/' + shortId;
            },
            uploadChildImage: (shortId) => {
                return applicationPrefix + 'children/' + shortId + '/upload';
            },
            deleteChild: (shortId) => {
                return applicationPrefix + 'children/' + shortId + '/delete';
            },
            editChild: (shortId) => {
                return applicationPrefix + 'children/' + shortId + '/edit';
            },
            getAvatar: (shortId, avatarURLId) => {
                return applicationPrefix + 'children/' + shortId + '/avatar/' + avatarURLId;
            }
        },
        posts: {
            fonts: applicationPrefix + 'fonts',
            presetImg: applicationPrefix + 'presets',
            index: applicationPrefix + 'posts',
            newPost: (shortId) => {
                return applicationPrefix + 'children/' + shortId + '/posts/new';
            },
            getPost: (shortId) => {
                return applicationPrefix + 'children/' + shortId + '/posts';
            },
            deletePost: (childShortId, postShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/posts/' + postShortId + '/delete';
            },
            imageOriginal: (childShortId, postShortId, img_original_url_id) => {
                return applicationPrefix + 'children/' + childShortId + '/posts/' + postShortId + '/img-original/' + img_original_url_id;
            },
            imageBaked: (childShortId, postShortId, img_baked_url_id) => {
                return applicationPrefix + 'children/' + childShortId + '/posts/' + postShortId + '/img-baked/' + img_baked_url_id;
            },
            updatePost: (childShortId, postShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/posts/' + postShortId;
            }
        },
        achievement: {
            index: applicationPrefix + 'achievements'
        },
        book: {
            index: applicationPrefix + 'books',
            generateNewBook: applicationPrefix + 'books/generate',
            generateNewBookForChild: (childShortId) => {
                return applicationPrefix + 'books/generate?c=' + childShortId;
            },
            newBook: applicationPrefix + 'books/new',
            newBookForChild: (childShortId) => {
                return applicationPrefix + 'books/new?c=' + childShortId;
            },
            getBook: (bookShortId) => {
                return applicationPrefix + 'books/' + bookShortId;
            },
            deleteBook: (bookShortId) => {
                return applicationPrefix + 'books/' + bookShortId + '/delete';
            }
        },
        tutorial: {
            skipTutorialBook: applicationPrefix + 'book/seen-tutorial',
            completedTutorialBook: applicationPrefix + 'book/seen-tutorial',
        }
    }

};
