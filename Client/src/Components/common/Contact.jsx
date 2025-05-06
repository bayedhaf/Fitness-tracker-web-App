import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('END POINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ fname: '', lname: '', email: '', message: '' }); 
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show success message in a modal instead of replacing the whole page
    if (submitStatus === 'success') {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full border border-orange-400">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-400 mb-4">
                            Your message was successfully sent!
                        </h2>
                        <p className="text-white mb-6">
                            We'll get back to you soon.
                        </p>
                        <button 
                            onClick={() => setSubmitStatus(null)}
                            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
            <div className="max-w-4xl mx-auto flex-1">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-wider">LET'S CHANGE YOUR FUTURE</h1>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label htmlFor="fname" className="block text-sm font-medium uppercase tracking-wider">First Name</label>
                            <input 
                                type="text" 
                                id="fname" 
                                name="fname" 
                                value={formData.fname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" 
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lname" className="block text-sm font-medium uppercase tracking-wider">Last Name</label>
                            <input 
                                type="text" 
                                id="lname" 
                                name="lname" 
                                value={formData.lname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" 
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium uppercase tracking-wider">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" 
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium uppercase tracking-wider">Message</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" 
                            required
                        ></textarea>
                    </div>
                    
                    <div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-wider rounded-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>

                    {submitStatus === 'error' && (
                        <div className="text-red-400 text-center">
                            Failed to send message. Please try again.
                        </div>
                    )}
                </form>
            </div>

            <footer className="mt-auto ml-32 mr-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="text-center md:text-left">
                        <Link to="/Schedule" className="underline text-white hover:text-blue-100">OUR HOURS</Link>
                        <div className="mt-4">MONDAY-FRIDAY
                            <br/>
                            <p className="text-xl mt-5 mb-3">5 AM - 9 PM </p>
                        </div>
                        <div className="">SATURDAY-SUNDAY
                            <br/>
                            <p className="text-xl mt-5 mb-3">8 AM - 12 PM </p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <span className="w-20 h-20 border-2 border-orange-400 rounded-full p-2 text-orange-400 flex items-center justify-center text-3xl font-bold">LAF</span>
                    </div>
                    <div className="text-center md:text-right space-y-2">
                        <Link to="/Schedule" className="underline text-white hover:text-blue-100 block">FOLLOW US</Link>
                        <div className="flex justify-center md:justify-end gap-4">
                            <Link to="/Schedule" className="underline text-white hover:text-blue-100"><FaInstagram /></Link>
                            <Link to="/Schedule" className="underline text-white hover:text-blue-100"><FaFacebook /></Link>
                        </div>
                    </div>
                </div>
                <hr className="border-white my-4"/>
                <p className="mt-4 text-center text-white uppercase text-sm">
                    COPYRIGHT LIFE ADVANCED FITNESS WEBSITE DEVELOPED BY TEAM OF ASTU STUDENTS
                </p>
            </footer>
        </div>
    );
};

export default Contact;