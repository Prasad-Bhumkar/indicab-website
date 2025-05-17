import React from 'react';

const _LoadingSpinner = (): JSX.Element => {
    return (
        <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    );
};

export default _LoadingSpinner;
