"use client"
import React, { useState, FormEvent } from 'react';
// 
export default function PropertyDescriptionGenerator() {
    const [propertyAddress, setPropertyAddress] = useState('');
    const [propertyFeatures, setPropertyFeatures] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function downloadDescription(descText: string, fileName: string) {
        const element = document.createElement('a');
        const file = new Blob([descText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element); // Clean up after download
    }

    function handleDownload() {
        downloadDescription(description, "Property-Description-.txt");
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/prop-desc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ propertyAddress, propertyFeatures }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setDescription(data.description);
        } catch (error) {
            console.error('Fetch error:', error);
            setDescription('Failed to fetch property description. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-blue rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Quick & Professional Property Summaries </h2>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">
                        Property Address
                        <input 
                            type="text" 
                            value={propertyAddress} 
                            onChange={(e) => setPropertyAddress(e.target.value)} 
                            placeholder="e.g., Enter property address"
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </label>
                </div>
                
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">
                        What is Special? 
                        <input 
                            type="text" 
                            value={propertyFeatures} 
                            onChange={(e) => setPropertyFeatures(e.target.value)}
                            placeholder="e.g., Inviting, Spacious, Luminous"
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </label>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-2 px-4 rounded-md transition duration-200"
                >
                    {isLoading ? 'Generating Description...' : 'Generate Description'}
                </button>
            </form>
            
            {description && 
            <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Generated Description:</h3>
                     <ol className="list-decimal list-inside">
                     {description.split('\n').map((step, index) => (
                    <li key={index}>{step}</li>
            ))}
        </ol>
        <div>
        <button 
                   onClick={handleDownload}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-2 px-4 rounded-md transition duration-200 mt-4"
                    >
                        Download Property Description 
                    </button>
                    </div>
    </div>
}

        </div>
    );
}
