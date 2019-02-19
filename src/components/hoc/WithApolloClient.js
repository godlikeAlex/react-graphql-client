import React from 'react';
import { ApolloConsumer } from "react-apollo";

const WithApolloClient = () => Wrapped => {
    return (props) => (
        <ApolloConsumer>
            {
                client => {
                    return <Wrapped {...props} client={client} />
                }
            }
        </ApolloConsumer>
    )
};

export default WithApolloClient;