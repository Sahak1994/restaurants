import { Route } from 'react-router-dom';

import Layout from './hoc/layout';
import RestaurantsContainer from './containers/restaurants';
import Restaurant from './containers/restaurant';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Route path="/" exact component={RestaurantsContainer} />
        <Route path="/:id" component={Restaurant} />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
