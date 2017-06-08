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
    user: {
        update: '/auth/user'
    },
    application: {
        stats: {
            index: applicationPrefix + 'stats'
        },
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
            latest: applicationPrefix + 'posts/latest',
            newQuote: (childShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/quote/new';
            },
            getPosts: (childShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/posts';
            },
            getPost: (childShortId, postShortId) => { //
                return applicationPrefix + 'children/' + childShortId + '/posts/' + postShortId;
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
            updateQuote: (childShortId, postShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/quotes/' + postShortId;
            },
            share: (childShortId, postShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/posts/' + postShortId + '/share';
            }
        },
        story: {
            newStory: (childShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/story/new';
            },
            updateStory: (childShortId, postShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/story/' + postShortId;
            }
        },
        achievement: {
            index: applicationPrefix + 'achievements'
        },
        book: {
            index: applicationPrefix + 'books',
            generateNewBook: applicationPrefix + 'books/generate',
            newBook: applicationPrefix + 'books/new',
            getBook: (bookShortId) => {
                return applicationPrefix + 'books/' + bookShortId;
            },
            editBook: (bookShortId) => {
                return applicationPrefix + 'books/' + bookShortId;
            },
            deleteBook: (bookShortId) => {
                return applicationPrefix + 'books/' + bookShortId + '/delete';
            }
        },
        flip_book: {
            generateNewBook: applicationPrefix + 'books/generate?is_flip_over=1',
            newBook: applicationPrefix + 'books/new',
            getBook: (bookShortId) => {
                return applicationPrefix + 'books/' + bookShortId;
            },
            editBook: (bookShortId) => {
                return applicationPrefix + 'books/' + bookShortId + '?is_flip_over=1';
            },
            deleteBook: (bookShortId) => {
                return applicationPrefix + 'books/' + bookShortId + '/delete';
            }
        },
        tutorial: {
            skipTutorialBook: applicationPrefix + 'books/seen-tutorial',
            completedTutorialBook: applicationPrefix + 'books/seen-tutorial',
        },
        check_out: {
            prices: applicationPrefix + 'orders/prices',
            checkout: applicationPrefix + 'orders/checkout'
        },
        news: {
            index: applicationPrefix + 'news',
            getUnreadCount: applicationPrefix + 'news/unread'
        }
    }

};
