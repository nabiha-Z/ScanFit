import { render, screen } from '@testing-library/react';
import App from './App';

<<<<<<< HEAD

=======
>>>>>>> 5540d54a8763a067394209d24c81b73923fb9850
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
