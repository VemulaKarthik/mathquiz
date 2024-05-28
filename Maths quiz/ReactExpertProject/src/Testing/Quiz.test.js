import React from 'react';
import { render, fireEvent, waitFor, getByRole,screen } from '@testing-library/react';
import Quiz from '../Components/Quiz.jsx';


jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn()
}));

describe('Quiz Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(<Quiz />);
    });

    test('initial state is set correctly', () => {
        const { getByText } = render(<Quiz />);
        expect(getByText(/Question: 1 \/ \d+/)).toBeInTheDocument();
        expect(getByText(/Timer: 1:00/)).toBeInTheDocument();
    });

    test('navigation between questions works correctly', () => {
        const { getByText } = render(<Quiz />);
        fireEvent.click(getByText('Next'));
        expect(getByText(/Question: 2 \/ \d+/)).toBeInTheDocument();
        fireEvent.click(getByText('Previous'));
        expect(getByText(/Question: 1 \/ \d+/)).toBeInTheDocument();
    });

    test('option selection updates state correctly', () => {
        const { getByLabelText } = render(<Quiz />);
        fireEvent.click(getByLabelText('7'));
        expect(getByLabelText('7')).toBeChecked();
    });

    test('timer updates correctly', async () => {
        const { getByText } = render(<Quiz />);
        await waitFor(() => {
            const timerElement = getByText(/Timer: \d{1}:\d{2}/);
            expect(timerElement).toBeInTheDocument();
        });
    });

});
