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
        quotes: {
            fonts: applicationPrefix + 'fonts',
            presetImg: applicationPrefix + 'presets',
            index: applicationPrefix + 'quotes',
            newQuote: (shortId) => {
                return applicationPrefix + 'children/' + shortId + '/quotes/new';
            },
            getQuote: (shortId) => {
                return applicationPrefix + 'children/' + shortId + '/quotes';
            },
            deleteQuote: (childShortId, quoteShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/quotes/' + quoteShortId + '/delete';
            },
            imageOriginal: (childShortId, quoteShortId, img_original_url_id) => {
                return applicationPrefix + 'children/' + childShortId + '/quotes/' + quoteShortId + '/img-original/' + img_original_url_id;
            },
            imageBaked: (childShortId, quoteShortId, img_baked_url_id) => {
                return applicationPrefix + 'children/' + childShortId + '/quotes/' + quoteShortId + '/img-baked/' + img_baked_url_id;
            },
            updateQuote: (childShortId, quoteShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/quotes/' + quoteShortId;
            }
        },
        achievement: {
            index: applicationPrefix + 'achievements'
        }
    }

};
