import { Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";

import RestaurantsContainer from 'containers/restaurants';
import Restaurant from 'containers/restaurant';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Route path="/" exact component={RestaurantsContainer} />
      <Route path="/:id" component={Restaurant} />
    </QueryClientProvider>
  );
}

export default App;
