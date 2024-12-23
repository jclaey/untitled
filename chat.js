const chatBot = input => {
    let response

    return response
}

const conversations = [
    {
        label: 'greetings',
        input: ['hi', 'hey', 'hello', 'helo', 'whats up', 'what\'s up', 'sup', 'whassup', 'wassup', 'yo'],
        ouput: 'hi! what questions can i answer for you today?'
    },
    {
        label: 'cost',
        input: ['how much', 'money', 'what do you charge', 'price', 'what\'s the price for', 'dollars', 'cost'],
        output: 'Okay! I can tell you how much that costs! The price for [service] is [price]'
    },
    {
        label: 'price',
        input: [
                    'web development', 
                    'website', 
                    'web app', 
                    'web application', 
                    'hosting', 
                    'web hosting', 
                    'mobile app', 
                    'mobile application'
                ],
        output: {
            website: [],
            webApp: [],
            hosting: [],
            mobileApp: []
        }
    }
]