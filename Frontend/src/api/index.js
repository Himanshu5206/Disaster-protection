const BASE_URL = 'http://localhost:5000'; // Replace this with your backend URL

// Function to submit disaster report
export const submitReport = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit report');
    }

    const data = await response.json();
    return data;  // Return the API response (report data)
  } catch (error) {
    console.error('Error submitting report:', error);
    throw error;
  }
};
