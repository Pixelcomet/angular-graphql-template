import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from './../environments/environment';

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
