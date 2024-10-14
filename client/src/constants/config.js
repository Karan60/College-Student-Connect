// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES ={
    loading:{
        tittle: 'loading...',
        message: 'data succesfully loaded'
    },
    reponseFailure: {
        tittle: 'Error',
        message: 'An erroe occcured while fetching response from the server. Please try again'
    },
    requestFailure:{
        tittle: 'Error',
        message: 'An error occured while parsing requrest data'
    },
    networkError: {
        tittle: 'Error',
        message: 'unable to connect with the server. Please check internet connectivity and try again later'
    }
}

// API SERVICE CALL

export const SERVICE_URLS ={
    userSignup: { url: '/signup', method: 'POST'}
}