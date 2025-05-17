"use client";

import React, { Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileContent from "../../../components/ProfileContent";

const _ProfilePage = (): JSX.Element => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow bg-gray-50 py-6">
                <Suspense fallback={
                    <div className="container mx-auto px-4 flex justify-center py-20">
                        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                }>
                    <ProfileContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
};

export default _ProfilePage;
