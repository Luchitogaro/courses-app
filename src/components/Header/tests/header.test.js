import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '../Header';
import { Provider } from 'react-redux';
import { mockedStore } from '../../../store/tests/mockedStore';
import { BrowserRouter } from 'react-router-dom';

describe('Header tests', () => {
	test('renders Header component with name and logo', () => {
		render(
			<BrowserRouter>
				<Provider store={mockedStore}>
					<Header />
				</Provider>
			</BrowserRouter>
		);
		expect(screen.queryByText('Test Name')).toBeInTheDocument();
		expect(screen.queryByAltText('Logo')).toBeInTheDocument();
	});
});
