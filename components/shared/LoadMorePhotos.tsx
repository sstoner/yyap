// LoadMoreButton.tsx
import React from 'react';
//  { onClick: () => void, loading: Boolean 

function LoadMoreButton({ onClick, loading }) {
    return (
        <button onClick={onClick} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
        </button>
    )
}

export default LoadMoreButton;
