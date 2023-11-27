"use client"
import React, { useState, FormEvent } from 'react';

export default function BirthdayCakeRecipeGenerator() {
    const [userInputCondition, setUserInputCondition] = useState('');
    const [userInputCuisine, setUserInputCuisine] = useState('');
    const [recipe, setRecipe] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function downloadRecipe(recipeText: string, fileName: string) {
        const element = document.createElement('a');
        const file = new Blob([recipeText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element); // Clean up after download
    }

    function handleDownload() {
        downloadRecipe(recipe, "Dog-Friendly-Cake-Recipe.txt");
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/birthdaycakeBuilder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userInputCondition, userInputCuisine }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setRecipe(data.recipe);
        } catch (error) {
            console.error('Fetch error:', error);
            setRecipe('Failed to fetch recipe. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-blue rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Dog-Friendly Recipes</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">
                        Condition
                        <input 
                            type="text" 
                            value={userInputCondition} 
                            onChange={(e) => setUserInputCondition(e.target.value)} 
                            placeholder="e.g., Gluten-free"
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </label>
                </div>
                
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">
                        Cuisine
                        <input 
                            type="text" 
                            value={userInputCuisine} 
                            onChange={(e) => setUserInputCuisine(e.target.value)}
                            placeholder="e.g., Chicken flavored"
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </label>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-2 px-4 rounded-md transition duration-200"
                >
                    {isLoading ? 'Generating Recipe...' : 'Generate Recipe'}
                </button>
            </form>
            
            {recipe && 
            <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Generated Recipe:</h3>
                     <ol className="list-decimal list-inside">
                     {recipe.split('\n').map((step, index) => (
                    <li key={index}>{step}</li>
            ))}
        </ol>
        <div>
        <button 
                   onClick={handleDownload}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-2 px-4 rounded-md transition duration-200 mt-4"
                    >
                        Download Recipe
                    </button>
                    </div>
    </div>
}

        </div>
    );
}
