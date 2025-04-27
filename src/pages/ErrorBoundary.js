import React from 'react';
import { Button } from 'react-bootstrap';
import "./ErrorBoundary.css";

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
    // Navigate back to the previous page
    window.history.back();
    
    // Refresh the previous page after navigating back
    setTimeout(() => {
        window.location.reload();
    }, 500); // Adjust the delay as needed
};

   
 
    render() {
         const backgroundImage = `${process.env.PUBLIC_URL}/errorlogo.png`;
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <img src={backgroundImage} alt="logo" className="image-container"/>
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
