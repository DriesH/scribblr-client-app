let applicationPrefix = '/application/';

export const API_ROUTES = {
    baseUrl: 'http://scribblr-dev.local/api',
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
            newChild: applicationPrefix + 'new',
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
            }
        },
        quotes: {
            newQuote: (shortId) => {
                return applicationPrefix + 'children/' + shortId + '/quotes/new';
            },
            getAllQuotes: (shortId) => {
                return applicationPrefix + 'children/' + shortId + '/quotes';
            },
            deletQuote: (childShortId, QuoteShortId) => {
                return applicationPrefix + 'children/' + childShortId + '/quotes/' + QuoteShortId + '/delete';
            }
        }
    }

};
