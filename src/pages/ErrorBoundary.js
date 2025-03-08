import React from 'react';
import { Button } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught by ErrorBoundary:", error, info);
    }

    handleRefresh = () => {
        // Refresh the page
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>Something went wrong.</h1>
                    <Button 
                        variant="primary" 
                        onClick={this.handleRefresh} 
                        style={{ marginTop: '10px' }}
                    >
                        Refresh
                    </Button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
