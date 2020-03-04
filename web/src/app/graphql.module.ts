import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

/**
 *
 *
 *
 * YOU DO NOT HAVE TO UNDERSTAND OR WRITE THIS CODE, LOOK IT UP IN THE APOLLO
 * DOCUMENTATION OR REPLACE IT WITH WHICHEVER LIBRARY YOU WILL USE FOR
 * INTERFACING WITH GRAPHQL
 *
 *
 *
 *
 */

/** graphql endpoint */
const uri = 'http://localhost:4000';

/** apollo options */
const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore'
    },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
    }
};

/** create apollo link */
export function createApollo(httpLink: HttpLink) {
    return {
        link: httpLink.create({ uri }),
        cache: new InMemoryCache(),
        defaultOptions: defaultOptions
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink]
        }
    ]
})
export class GraphQLModule {}
