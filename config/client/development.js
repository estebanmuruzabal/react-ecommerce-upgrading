// App config the for development environment.
// Do not require this directly. Use ./src/config instead.
export default {
    app: {
        title: 'Instituto Alemán de idioma y cultura'
    },
    api: {
        atlas: {
            baseUrl: 'http://localhost:8000/v1'
        },
        enabled: true,
    },
    googleAnalytics: {
        enabled: false,
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID, // Development Property
        options: {
            debug: true
        }
    },
    facebookPixel: {
        enabled: false,
        id: '247941852357863'
    },
    crisp: {
        enabled: false,
        websiteID: '049630c3-f078-4289-997f-97893b01f723'
    },
    mailChimp: {
        signupFormPostURL: 'https://institutoaleman.us14.list-manage.com/subscribe/post'
    },
    switchPayments: {
        enabled: false,
        environment: 'https://api-test.switchpayments.com/v2/',
        publicKey: process.env.SWITCH_PUBLIC_KEY
    }
};
