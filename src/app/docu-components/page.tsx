"use client";

import React from 'react';
import Link from 'next/link';
import Button from '@/components/skill-exchange/Button';
import Card from '@/components/skill-exchange/Card';
import Input from '@/components/skill-exchange/Input';
import Navbar from '@/components/skill-exchange/Navbar';

const DocuComponents: React.FC = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div className="bg-white text-primary min-h-screen">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-poppins text-accent-red mb-8 text-center">Component Documentation</h1>

                <section id="button" className="mb-12">
                    <h2 className="text-3xl font-poppins text-accent-red mb-6">Button Component</h2>
                    <p className="text-secondary mb-6">
                        The Button component can be customized with different variants and sizes.
                    </p>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <Button label="Primary Button" onClick={handleClick} variant="primary" size="large" />
                    </div>
                    <pre className="bg-gray-200 p-4 rounded mt-4 overflow-x-auto">
                        {`<Button label="Primary Button" onClick={handleClick} variant="primary" size="large" />`}
                    </pre>
                </section>

                <section id="card" className="mb-12">
                    <h2 className="text-3xl font-poppins text-accent-red mb-6">Card Component</h2>
                    <p className="text-secondary mb-6">
                        The Card component is used to display content in a structured format.
                    </p>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <Card title="Card Title" description="This is a description of the card.">
                            <p>Additional content can go here.</p>
                        </Card>
                    </div>
                    <pre className="bg-gray-200 p-4 rounded mt-4 overflow-x-auto">
                        {`<Card title="Card Title" description="This is a description of the card.">
  <p>Additional content can go here.</p>
</Card>`}
                    </pre>
                </section>

                <section id="input" className="mb-12">
                    <h2 className="text-3xl font-poppins text-accent-red mb-6">Input Component</h2>
                    <p className="text-secondary mb-6">
                        The Input component is used to capture user input.
                    </p>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <Input label="Input Label" value="" onChange={() => { }} />
                    </div>
                    <pre className="bg-gray-200 p-4 rounded mt-4 overflow-x-auto">
                        {`<Input label="Input Label" value="" onChange={() => {}} />`}
                    </pre>
                </section>

                <section id="navbar" className="mb-12">
                    <h2 className="text-3xl font-poppins text-accent-red mb-6">Navbar Component</h2>
                    <p className="text-secondary mb-6">
                        The Navbar component provides navigation links for your application.
                    </p>
                    <pre className="bg-gray-200 p-4 rounded mt-4 overflow-x-auto">
                        {`import Navbar from '@/components/skill-exchange/Navbar';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;`}
                    </pre>
                </section>

                <div className="mt-12 text-center">
                    <Link href="/" className="text-accent-turquoise hover:underline">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default DocuComponents;
